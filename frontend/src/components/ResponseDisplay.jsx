import React, { useEffect, useRef } from 'react'
import useThemeStore from '../stores/themeStore'
import usePromptStore from '../stores/promptStore';
import useAuthStore from "../stores/authStore";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import mermaid from 'mermaid';

const ResponseDisplay = ({userInputs, response}) => {
  
    const flowchartRef = useRef(null);
    const { isDarkMode } = useThemeStore();
    const { saveInputsAndResponse, createRepo, loading } = usePromptStore();
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate(); // Initialize useNavigate

    // Initialize Mermaid with theme settings
    useEffect(() => {
      if (response && response.app_flow_diagram) {
        mermaid.initialize({
          startOnLoad: true,
          theme: isDarkMode ? 'dark' : 'default',
          securityLevel: 'loose',
          flowchart: {
            htmlLabels: true,
            curve: 'linear',
          },
        });
        
        // Render the flowchart
        renderFlowchart();
      }
    }, [response, isDarkMode]);

    // In your React component
const handleCreateRepo = async () => {
  try {
    const response = await fetch('/api/huggingface/create-repo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.getState().token}`
      },
      body: JSON.stringify({
        userSelections,
        appIdea: response
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      toast.success(
        <a href={result.repoUrl} target="_blank" rel="noopener">
          Repository created! Click to view
        </a>
      );
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    toast.error('Failed to create repository');
  }
};

    // Function to render the Mermaid flowchart
    const renderFlowchart = async () => {
      if (flowchartRef.current && response?.app_flow_diagram) {
        try {
          // Clear previous content
          flowchartRef.current.innerHTML = '';
          
          // Create a unique ID for the diagram
          const id = `flowchart-${Date.now()}`;
          
          // Render the new diagram
          const { svg } = await mermaid.render(id, response.app_flow_diagram);
          flowchartRef.current.innerHTML = svg;
        } catch (error) {
          console.error("Error rendering flowchart:", error);
          flowchartRef.current.innerHTML = `<div class="p-4 bg-red-100 text-red-700 rounded-md">Error rendering flowchart: ${error.message}</div>`;
        }
      }
    };

    const handleSaveProject = async () => {
      if (!isAuthenticated) {
        // If not authenticated, prompt to login
        toast.error("Please log in to save your project");
        
        // Optional: Store project data in localStorage to retrieve after login
        localStorage.setItem('pending_project', JSON.stringify({
          inputs: userInputs,
          response: response
        }));
        
        // Redirect to login page
        navigate('/login');
        return;
      }
      
      try {
        // If authenticated, proceed with saving
        await saveInputsAndResponse(userInputs, response);
      } catch (error) {
        console.error("Error saving project:", error);
      }
    };

    // if(loading){
    //   return(
    //     <div className="text-center py-16">
    //       <div className="inline-block p-4 border-4 border-t-neon-yellow border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
    //       <p className="mt-4 text-lg font-medium">Generating your perfect project idea...</p>
    //       <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>This may take a moment as we craft a detailed plan.</p>
    //     </div>
    //   )
    // }

  return (
    <>
    {loading && (
      <div className='w-screen h-screen flex items-center justify-center'>
      <div className="text-center py-16">
          <div className="inline-block p-4 border-4 border-t-neon-yellow border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium">Generating your perfect project idea...</p>
          <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>This may take a moment as we craft a detailed plan.</p>
        </div>
      </div>
    )}
    {response && !loading ? (
  <div className={`w-full min-h-screen ${isDarkMode ? "bg-gray-900" :"bg-neutral-100" } transition-all duration-300 ease-in-out py-10 px-4 sm:px-6 md:px-8`}>
    <div className="max-w-4xl mx-auto">
      {/* Title Section */}
      <div className="mb-8 border-l-4 border-neon-yellow pl-4">
        <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-neutral-900"} `}>{response.project_name}</h1>
        <p className={`text-lg ${isDarkMode ? "text-gray-300":"text-neutral-700"} mt-2`}>{response.summary}</p>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Description Card */}
          <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6`}>
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="w-2 h-6 bg-neon-yellow mr-3"></span>
              Description
            </h2>
            <p className={`text-gray-700 dark:text-gray-300`}>{response.description}</p>
          </div>
          
          {/* Tech Stack Card */}
          <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6`}>
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="w-2 h-6 bg-neon-yellow mr-3"></span>
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {response.tech_stack.map((tech, index) => (
                <span key={index} className={`px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm`}>
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm text-gray-500 dark:text-gray-400`}>Main Language</p>
                <p className="font-medium">{response.main_language}</p>
              </div>
              <div>
                <p className={`text-sm text-gray-500 dark:text-gray-400`}>Difficulty</p>
                <span className={`px-2 py-1 rounded text-xs ${
                  response.difficulty === "Beginner" 
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                    : response.difficulty === "Intermediate"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}>
                  {response.difficulty}
                </span>
              </div>
            </div>
          </div>
          
          {/* Deployment Options */}
          <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6`}>
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="w-2 h-6 bg-neon-yellow mr-3"></span>
              Deployment Options
            </h2>
            <div className="space-y-3">
              {response.deployment_options.map((option, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{option.service_name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{option.pricing_tier}</p>
                  </div>
                  <a 
                    href={option.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Service →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Project Details Card */}
          <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6`}>
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="w-2 h-6 bg-neon-yellow mr-3"></span>
              Project Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Timeline</p>
                <p className="font-medium">{response.estimated_deadline}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Why This Project</p>
                <p className="text-gray-700 dark:text-gray-300">{response.why_this_project}</p>
              </div>
            </div>
          </div>
          
          {/* Features Card */}
          <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6`}>
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="w-2 h-6 bg-neon-yellow mr-3"></span>
              Required Features
            </h2>
            <div className="space-y-4">
              {response.required_features.map((feature, index) => (
                <div key={index} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{feature.name}</h3>
                    <span className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded">
                      {feature.implementation_tool}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
                  <a 
                    href={feature.documentation_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
                  >
                    View Documentation →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* App Flow Diagram Section */}
      {response.app_flow_diagram && (
        <div className="mt-6">
          <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6`}>
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="w-2 h-6 bg-neon-yellow mr-3"></span>
              App Flow Diagram
            </h2>
            <div 
              ref={flowchartRef} 
              className="mermaid-diagram mt-4 overflow-x-auto"
              style={{ minHeight: '300px' }}
            >
              {/* Mermaid diagram will be rendered here */}
            </div>
          </div>
        </div>
      )}
      
      {/* Bottom Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learning Resources */}
        <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6`}>
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <span className="w-2 h-6 bg-neon-yellow mr-3"></span>
            Learning Resources
          </h2>
          <div className="space-y-3">
            {response.learning_resources.map((resource, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{resource.topic}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{resource.resource_type}</p>
                </div>
                <a 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Resource →
                </a>
              </div>
            ))}
          </div>
        </div>
        
        {/* Challenges & Next Steps */}
        <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6`}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="w-2 h-6 bg-neon-yellow mr-3"></span>
              Potential Challenges
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {response.potential_challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="w-2 h-6 bg-neon-yellow mr-3"></span>
              Next Steps
            </h2>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {response.next_steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button 
          className="px-6 py-2 hover:scale:105 duration-300 ease-in-out bg-neon-yellow text-gray-900 font-medium rounded-md hover:bg-opacity-90 transition-all"
          onClick={() => handleSaveProject()}
        >
          Save Project
        </button>
        <button 
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-neutral-800 dark:text-neutral-700 font-medium rounded-md bg-neutral-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          onClick={() => handleCreateRepo()}
        >
          Create Github Repo
        </button>
      </div>
    </div>
  </div>
) : (
  <div className="w-full h-0 transition-all duration-500 ease-in-out overflow-hidden"></div>
)}
    </>
  )
}

export default ResponseDisplay