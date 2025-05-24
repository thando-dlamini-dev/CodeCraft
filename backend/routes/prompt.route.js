// routes/prompt.routes.js
import express from 'express';
import passport from 'passport';
import { huggingFace } from '../lib/huggingFace.js';
import { saveProjectIdea, getProjectIdeasByUserId } from '../models/projectIdea.model.js';

const router = express.Router();

// Generate AI app idea (doesn't require auth)
router.post('/generate-idea', async (req, res) => {
  try {
    const userSelections = req.body;
    
    // Validate input
    if (!userSelections) {
      return res.status(400).json({ success: false, message: 'No user selections provided' });
    }
    
    // Call Hugging Face service
    const result = await huggingFace(userSelections);
    
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


export default router;