// routes/prompt.routes.js
import Router from 'express';
import passport from 'passport';
import { generateAppIdea, createRepo } from '../lib/huggingFace.js';
import { saveProjectIdea, getProjectIdeasByUserId } from '../models/projectIdea.model.js';
import { deleteProjectIdea } from '../models/projectIdea.model.js';

const router = Router();

// Generate AI app idea (doesn't require auth)
router.post('/generate-idea', async (req, res) => {
  try {
    const userSelections = req.body;
    
    // Validate input
    if (!userSelections) {
      return res.status(400).json({ success: false, message: 'No user selections provided' });
    }

    if(userSelections.selectedInterests.length < 3){
            return res.status(400).json({
                success: false,
                message: "Please select at least 3 interests"
            })
        }
        if(userSelections.selectedScopeAndTime.length !== 1){
            return res.status(400).json({
                success: false,
                message: "Please select single time scope"
            });
        }
        if(userSelections.selectedOutcomeGoals.length < 2){
            return res.status(400).json({
                success: false,
                message: "Please select at least 2 outcome goals"
            });
        }
        if(userSelections.selectedInspirationSources.length < 2){
            return res.status(400).json({
                success: false,
                message: "Please select at least 2 inspiration sources"
            });
        }
        if(userSelections.selectedTechStackOptions.length < 4){
            return res.status(400).json({
                success: false,
                message: "Please select at least 4 tech stack options"
            });
        }
    
    // Call Hugging Face service
    const result = await generateAppIdea(userSelections);
    
    res.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Error in generate-idea endpoint:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate app idea'
    });
  }
});

router.post('/create-repo', 
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { userSelections, appIdea } = req.body;
      
      // Get GitHub token from authenticated user
      const githubToken = req.user.accessToken;
      
      if (!githubToken) {
        return res.status(403).json({ 
          success: false, 
          message: 'GitHub authentication required' 
        });
      }

      // Create files content (simplified example)
      const files = {
        'README.md': `# ${appIdea.project_name}\n\n${appIdea.description}`,
        'index.js': 'console.log("Hello World!");'
      };

      // 1. First create the repo
      const repoResponse = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: appIdea.project_name.toLowerCase().replace(/\s+/g, '-'),
          description: appIdea.description.substring(0, 100),
          private: false
        })
      });

      if (!repoResponse.ok) throw new Error('Failed to create repository');
      const repo = await repoResponse.json();

      // 2. Add files (optional - GitHub can initialize with auto_init: true)
      // ...

      res.json({
        success: true,
        repoUrl: repo.html_url
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);

// Save project idea (requires authentication)
router.post(
  '/save-inputs-and-response',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { inputs, response } = req.body;
      const userId = req.user.id;
      
      if (!response) {
        return res.status(400).json({ success: false, message: 'No project data provided' });
      }
      
      // Save project idea to database with user ID
      const savedProject = await saveProjectIdea(userId, response, inputs);
      
      res.json({
        success: true,
        message: 'Project idea saved successfully',
        projectId: savedProject.id
      });
    } catch (error) {
      console.error('Error saving project idea:', error);
      // Fixed error handling - avoid nested properties that might not exist
      const errorMessage = error.message || 'Failed to save project idea';
      res.status(500).json({
        success: false,
        message: errorMessage
      });
    }
  }
);

// Get all project ideas for current user
router.get(
  '/my-projects',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const projects = await getProjectIdeasByUserId(userId);
      
      res.json({
        success: true,
        projects
      });
    } catch (error) {
      console.error('Error getting user projects:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get projects'
      });
    }
  }
);

router.delete(
  '/delete-project/:projectId',  
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const userId = req.user.id;
    try {
      const projectId = req.params.projectId;
      
      // Check if projectId exists before trying to delete
      if(!projectId){
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      
      const result = await deleteProjectIdea(userId, projectId);
      
      if (!result.success) {
        return res.status(404).json({ success: false, message: result.message });
      }
      
      const projects = await getProjectIdeasByUserId(userId);
      res.json({ success: true, message: 'Project deleted successfully', projects });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ success: false, message: 'Failed to delete project' });
    }
  }
);

export default router;