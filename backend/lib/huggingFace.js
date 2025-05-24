import { InferenceClient } from "@huggingface/inference";
import { Octokit } from "@octokit/rest";

/**
 * Reusable function to handle HuggingFace API calls and JSON response processing
 * @param {Object} messages - Array of messages to send to the LLM
 * @returns {Object} Parsed JSON response
 */
const huggingFaceInstance = async (messages) => {
  try {
    const client = new InferenceClient(process.env.HF_API_KEY);
    
    console.log("Sending request to HuggingFace");

    const chatCompletion = await client.chatCompletion({
      provider: "nebius",
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages,
      max_tokens: 1500,
      temperature: 0.2, // Lower temperature for more deterministic, structured output
    });

    // Get the raw response text
    const responseText = chatCompletion.choices[0].message.content;
    console.log("Raw LLM response received");
    
    // Extract and parse JSON from the response
    return extractJsonFromResponse(responseText);
  } catch (error) {
    console.error("Error in huggingFaceInstance:", error);
    
    // Retry once with a simpler prompt if we get an API error
    try {
      if (error.message.includes("provider") || error.message.includes("API")) {
        console.log("Retrying with fallback model...");
        
        // Simplify the messages to just the core request
        const simplifiedMessages = messages.map(msg => {
          if (msg.role === "user") {
            return {
              role: "user",
              content: `Create a simple JSON response for: ${msg.content.split('\n')[0]}`
            };
          }
          return msg;
        });
        
        const client = new InferenceClient(process.env.HF_API_KEY);
        const retryCompletion = await client.chatCompletion({
          model: process.env.HF_FALLBACK_MODEL,
          messages: simplifiedMessages,
          max_tokens: 1000,
          temperature: 0.1,
        });
        
        return extractJsonFromResponse(retryCompletion.choices[0].message.content);
      }
    } catch (retryError) {
      console.error("Retry attempt also failed:", retryError);
    }
    
    throw error;
  }
};

/**
 * Helper function to extract and parse JSON from LLM responses
 * @param {string} responseText - Raw text response from LLM
 * @returns {Object} Parsed JSON object
 */
const extractJsonFromResponse = (responseText) => {
  try {
    // 1. Remove any markdown code block formatting
    let cleanedText = responseText.replace(/```json|```/g, '');
    
    // 2. Try to find JSON-like content in the response
    const jsonMatch = cleanedText.match(/({[\s\S]*})/);
    let jsonString = jsonMatch ? jsonMatch[0] : cleanedText;
    
    // 3. Replace backticks around field values if present
    jsonString = jsonString.replace(/"app_flow_diagram":\s*`([\s\S]*?)`/g, 
                                   (match, p1) => `"app_flow_diagram": "${p1.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`);
    
    // 4. Parse the cleaned JSON
    const jsonData = JSON.parse(jsonString);
    console.log("Successfully extracted JSON");
    return jsonData;
  } catch (parseError) {
    console.error("JSON parsing error:", parseError.message, "\nText:", responseText.substring(0, 200) + "...");
    
    // Try a more forgiving approach with regex pattern matching for key fields
    try {
      console.log("Attempting fallback JSON extraction...");
      
      // Look for key-value patterns that might be in the response
      const nameMatch = responseText.match(/"(?:project_name|repoName)"?\s*:\s*"([^"]+)"/);
      const descMatch = responseText.match(/"(?:description)"?\s*:\s*"([^"]+)"/);
      
      if (nameMatch) {
        console.log("Found name pattern match:", nameMatch[1]);
        
        // Construct a minimal valid response object
        return {
          repoName: nameMatch[1].toLowerCase().replace(/\s+/g, '-'),
          description: descMatch ? descMatch[1] : "Generated project",
          isPrivate: false,
          files: {
            'README.md': `# ${nameMatch[1]}\n\n${descMatch ? descMatch[1] : 'A generated project'}\n`,
            'index.js': `console.log('Project ${nameMatch[1]} initialized');`,
            'package.json': JSON.stringify({
              name: nameMatch[1].toLowerCase().replace(/\s+/g, '-'),
              version: '1.0.0',
              description: descMatch ? descMatch[1] : 'A generated project',
              main: 'index.js',
              scripts: {
                test: 'echo "Error: no test specified" && exit 1',
                start: 'node index.js'
              },
              keywords: [],
              author: '',
              license: 'MIT'
            }, null, 2)
          }
        };
      }
    } catch (fallbackError) {
      console.error("Fallback extraction failed:", fallbackError);
    }
    
    throw new Error(`Failed to parse JSON response: ${parseError.message}`);
  }
};

/**
 * Actually creates a GitHub repository using the GitHub API
 * @param {Object} repoConfig - Repository configuration
 * @param {string} githubToken - User's GitHub access token
 * @returns {Object} GitHub repository creation response
 */
const createGitHubRepository = async (repoConfig, githubToken) => {
  try {
    console.log("Creating GitHub repository...");
    
    // Initialize Octokit with user's token
    const octokit = new Octokit({
      auth: githubToken,
    });

    // Create the repository
    const { data: repo } = await octokit.rest.repos.createForAuthenticatedUser({
      name: repoConfig.repoName,
      description: repoConfig.description,
      private: repoConfig.isPrivate || false,
      auto_init: false, // We'll add files manually
    });

    console.log("Repository created:", repo.name);

    // Add files to the repository
    const filePromises = Object.entries(repoConfig.files).map(async ([path, content]) => {
      try {
        await octokit.rest.repos.createOrUpdateFileContents({
          owner: repo.owner.login,
          repo: repo.name,
          path: path,
          message: `Add ${path}`,
          content: Buffer.from(content).toString('base64'),
        });
        console.log(`Added file: ${path}`);
      } catch (fileError) {
        console.error(`Error adding file ${path}:`, fileError.message);
        // Continue with other files even if one fails
      }
    });

    // Wait for all files to be created
    await Promise.allSettled(filePromises);

    return {
      success: true,
      repository: {
        name: repo.name,
        url: repo.html_url,
        clone_url: repo.clone_url,
        ssh_url: repo.ssh_url,
        description: repo.description,
        private: repo.private,
        created_at: repo.created_at,
      },
      filesAdded: Object.keys(repoConfig.files).length,
    };

  } catch (error) {
    console.error("Error creating GitHub repository:", error);
    
    // Provide more specific error messages
    if (error.status === 401) {
      throw new Error("Invalid GitHub token. Please check your authentication.");
    } else if (error.status === 422) {
      throw new Error("Repository name already exists or is invalid.");
    } else if (error.status === 403) {
      throw new Error("Insufficient permissions. Please check your GitHub token scopes.");
    }
    
    throw new Error(`GitHub API Error: ${error.message}`);
  }
};

/**
 * Creates a GitHub repository configuration and actually creates it on GitHub
 * @param {Object} userSelections - User preferences
 * @param {string} appIdea - App idea description
 * @param {string} githubToken - User's GitHub access token
 * @returns {Object} Repository creation result
 */
export const createRepo = async (userSelections, appIdea, githubToken = null) => {
  // Extract the app details from the response object if appIdea is an object
  let appName, appDescription, techStack;
  
  if (typeof appIdea === 'object') {
    appName = appIdea.project_name || 'New Project';
    appDescription = appIdea.description || 'A new project created with the app.';
    techStack = Array.isArray(appIdea.tech_stack) ? appIdea.tech_stack : [];
  } else {
    appName = appIdea || 'New Project';
    appDescription = 'A new project created with the app.';
    techStack = [];
  }

  const messages = [
    {
      role: "system",
      content: `You are a GitHub repo creator AI that returns ONLY valid JSON. Never include explanatory text before or after the JSON. Your responses must be parseable JSON objects with no markdown formatting or backticks.`
    },
    {
      role: "user",
      content: `Based on the user's preferences and app idea below, create a GitHub repository configuration that can be directly used with GitHub's API.

App Name: ${appName}
App Description: ${appDescription}
Tech Stack: ${techStack.join(', ')}
User Selections: ${JSON.stringify(userSelections)}

Return ONLY a valid JSON object in this exact format:
{
  "repoName": "project-name", 
  "description": "A clear description of the repository",
  "isPrivate": false,
  "files": {
    "README.md": "# Project Name\\n\\nProject description and setup instructions",
    "index.js": "// Main entry point code",
    "package.json": "{\\"name\\": \\"project-name\\", \\"version\\": \\"1.0.0\\"}"
  }
}

- The repoName should be kebab-case (lowercase with hyphens)
- The description should be concise but informative (max 100 characters)
- Use appropriate file extensions and directory structure for the tech stack
- Include starter files appropriate for the specified tech stack
- At minimum, include README.md, a main entry file, and appropriate configuration files 
- ALL file content must be properly escaped for valid JSON`
    },
  ];
  
  try {
    // Generate the repository configuration using AI
    const repoConfig = await huggingFaceInstance(messages);
    console.log("Repository configuration generated:", repoConfig);
    
    // If no GitHub token is provided, return just the configuration
    if (!githubToken) {
      console.log("No GitHub token provided - returning configuration only");
      return {
        success: true,
        message: "Repository configuration generated successfully",
        config: repoConfig,
        note: "To create the actual repository, please provide a GitHub access token"
      };
    }
    
    // Create the actual GitHub repository
    const githubResult = await createGitHubRepository(repoConfig, githubToken);
    
    return {
      success: true,
      message: "GitHub repository created successfully!",
      config: repoConfig,
      github: githubResult,
    };
    
  } catch (error) {
    console.error("Error in createRepo:", error);
    
    // Create a fallback basic repo config using the extracted app details
    const repoName = appName.toLowerCase().replace(/\s+/g, '-');
    
    const fallbackConfig = {
      repoName,
      description: appDescription.substring(0, 100),
      isPrivate: false,
      files: {
        'README.md': `# ${appName}\n\n${appDescription}\n\n## Getting Started\n\nFollow these instructions to get the project up and running.\n`,
        'index.js': `console.log('Hello ${appName}!');`,
        'package.json': JSON.stringify({
          name: repoName,
          version: '1.0.0',
          description: appDescription.substring(0, 100),
          main: 'index.js',
          scripts: {
            test: 'echo "Error: no test specified" && exit 1',
            start: 'node index.js'
          },
          keywords: techStack.map(tech => tech.toLowerCase()),
          author: '',
          license: 'MIT'
        }, null, 2)
      }
    };
    
    // If we have a GitHub token, try to create the repo with fallback config
    if (githubToken) {
      try {
        const githubResult = await createGitHubRepository(fallbackConfig, githubToken);
        return {
          success: true,
          message: "Repository created with fallback configuration",
          config: fallbackConfig,
          github: githubResult,
        };
      } catch (githubError) {
        throw new Error(`Failed to create repository: ${githubError.message}`);
      }
    }
    
    throw error;
  }
};

/**
 * Generates an app idea based on user selections
 * @param {Object} userSelections - User preferences
 * @returns {Object} App idea details
 */
export const generateAppIdea = async (userSelections) => {
  // Extract selection arrays safely
  const {
    selectedInterests = [],
    selectedScopeAndTime = [],
    selectedOutcomeGoals = [],
    selectedInspirationSources = [],
    selectedTechStackOptions = []
  } = userSelections;
  
  // Validate that selections are arrays
  const safeInterests = Array.isArray(selectedInterests) ? selectedInterests : [];
  const safeScopeAndTime = Array.isArray(selectedScopeAndTime) ? selectedScopeAndTime : [];
  const safeOutcomeGoals = Array.isArray(selectedOutcomeGoals) ? selectedOutcomeGoals : [];
  const safeInspirationSources = Array.isArray(selectedInspirationSources) ? selectedInspirationSources : [];
  const safeTechStackOptions = Array.isArray(selectedTechStackOptions) ? selectedTechStackOptions : [];
  
  console.log("Processing selections for app idea:", {
    interests: safeInterests,
    scope: safeScopeAndTime,
    goals: safeOutcomeGoals,
    inspiration: safeInspirationSources,
    tech: safeTechStackOptions
  });
  
  const messages = [
        {
          role: "system",
          content: `You are an app idea recommender AI that returns ONLY valid JSON. Never include explanatory text before or after the JSON. Your responses must be parseable JSON objects with no markdown formatting or backticks.`
        },
        {
          role: "user",
          content: `Based on the user's preferences below, create a suitable web app project idea.

1. The app should relate to the following interests: ${selectedInterests.join(', ')}.
2. It should be suitable to build within: ${selectedScopeAndTime.join(', ')}.
3. The main outcome goals are: ${selectedOutcomeGoals.join(', ')}.
4. The user would like the app to be inspired by: ${selectedInspirationSources.join(', ')}.
5. Preferred technologies or tools to use in the project: ${selectedTechStackOptions.length > 0 ? selectedTechStackOptions.join(', ') : 'No specific tech stack preferences'}.

Respond ONLY with a valid JSON object in exactly this format:
{
  "project_name": "Name of the project",
  "summary": "One-line summary of the project",
  "description": "Short description of the project (max 100 words)",
  "tech_stack": ["Tech1", "Tech2", "Tech3"],
  "main_language": "Primary programming language",
  "estimated_deadline": "Timeframe to complete the project",
  "difficulty": "Beginner" | "Intermediate" | "Advanced",
  "why_this_project": "Brief explanation of why this project fits the user's preferences",
  "required_features": [
    {
      "name": "Feature name",
      "description": "Brief description of what this feature does",
      "implementation_tool": "Tool name",
      "documentation_link": "URL to documentation"
    }
  ],
  "learning_resources": [
    {
      "topic": "Topic name",
      "resource_type": "Tutorial/Course/Documentation", 
      "link": "URL to resource"
    }
  ],
  "deployment_options": [
    {
      "service_name": "Name of service",
      "pricing_tier": "Free/Paid/Freemium",
      "link": "URL to service"
    }
  ],
  "potential_challenges": [
    "Challenge 1",
    "Challenge 2"
  ],
  "next_steps": [
    "Step 1",
    "Step 2"
  ],
  "app_flow_diagram": "flowchart TD\\n    A[User Interface] -->|1. Initial Action| B[Component/API]\\n    B -->|2. Process| C[Next Step]\\n    C -->|3. Result| D[Final State]"
}

- For the "app_flow_diagram" field, include a mermaid.js flowchart showing the app's workflow. Make sure the string is properly escaped with double backslashes before each newline (\\n).
- DO NOT use backticks around the diagram string or any fields.
- Make sure all JSON strings are properly escaped.
- For each feature, include actual implementation tools with accurate documentation links.
- Include 4-6 required features that make sense for the app idea.
- Adapt the flowchart to specifically match the features of your recommended app.`
        },
      ];
  
  try {
    // Make the API call and return the parsed response
    const result = await huggingFaceInstance(messages);
    return result;
  } catch (error) {
    console.error("Error generating app idea:", error);
    
    // Create a fallback response
    return {
      project_name: "Web Portfolio App",
      summary: "A personal portfolio website to showcase your projects",
      description: "A responsive web application that showcases your projects, skills, and experience. Perfect for developers looking to establish an online presence.",
      tech_stack: safeTechStackOptions.length > 0 ? safeTechStackOptions : ["JavaScript", "React", "Node.js"],
      main_language: "JavaScript",
      estimated_deadline: safeScopeAndTime.length > 0 ? safeScopeAndTime[0] : "2-4 weeks",
      difficulty: "Intermediate",
      why_this_project: "This project allows you to showcase your work while learning essential web development skills.",
      required_features: [
        {
          name: "Responsive Design",
          description: "Make the website look good on all devices",
          implementation_tool: "CSS/Flexbox/Grid",
          documentation_link: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout"
        },
        {
          name: "Project Gallery",
          description: "Display your projects with filtering options",
          implementation_tool: "React Components",
          documentation_link: "https://react.dev/learn"
        },
        {
          name: "Contact Form",
          description: "Allow visitors to reach out to you",
          implementation_tool: "Form handling with backend API",
          documentation_link: "https://developer.mozilla.org/en-US/docs/Learn/Forms"
        }
      ],
      learning_resources: [
        {
          topic: "React",
          resource_type: "Documentation",
          link: "https://react.dev/"
        },
        {
          topic: "CSS Grid",
          resource_type: "Tutorial",
          link: "https://css-tricks.com/snippets/css/complete-guide-grid/"
        }
      ],
      deployment_options: [
        {
          service_name: "Vercel",
          pricing_tier: "Free",
          link: "https://vercel.com"
        },
        {
          service_name: "Netlify",
          pricing_tier: "Free",
          link: "https://netlify.com"
        }
      ],
      potential_challenges: [
        "Creating a responsive design that works on all devices",
        "Implementing smooth animations without hurting performance"
      ],
      next_steps: [
        "Set up your development environment",
        "Create a wireframe design",
        "Set up basic project structure",
        "Develop the core components"
      ],
      app_flow_diagram: "flowchart TD\n    A[Home Page] -->|Navigate| B[Project Gallery]\n    A -->|Navigate| C[About Me]\n    A -->|Navigate| D[Contact Form]\n    B -->|Filter| B\n    D -->|Submit| E[Form Processing]\n    E -->|Success| F[Thank You Page]",
      starter_files: {
        "index.js": "// Main entry point for the portfolio application\n\nimport React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);",
        "README.md": "# Personal Portfolio Website\n\nA responsive website to showcase your projects and skills.\n\n## Installation\n\n```bash\nnpm install\n```\n\n## Usage\n\n```bash\nnpm start\n```",
        "package.json": "{\n  \"name\": \"personal-portfolio\",\n  \"version\": \"1.0.0\",\n  \"description\": \"A personal portfolio website\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test\",\n    \"eject\": \"react-scripts eject\"\n  },\n  \"dependencies\": {\n    \"react\": \"^18.2.0\",\n    \"react-dom\": \"^18.2.0\",\n    \"react-router-dom\": \"^6.4.0\",\n    \"react-scripts\": \"5.0.1\"\n  },\n  \"browserslist\": {\n    \"production\": [\n      \">0.2%\",\n      \"not dead\",\n      \"not op_mini all\"\n    ],\n    \"development\": [\n      \"last 1 chrome version\",\n      \"last 1 firefox version\",\n      \"last 1 safari version\"\n    ]\n  }\n}"
      }
    };
  }
};