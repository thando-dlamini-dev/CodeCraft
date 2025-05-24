import express from 'express';
import passport from 'passport';
import { githubAuth, githubCallback, getCurrentUser, refreshToken, logoutUser, createRepository, getUserInfo } from '../controllers/auth.controller.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/github', githubAuth);
router.get('/github/callback', passport.authenticate('github', {
  session: false,
  failureRedirect: `${process.env.CLIENT_URL}/login`
}), githubCallback);
router.get('/user', authenticateJWT, getCurrentUser);
router.post('/refresh', authenticateJWT, refreshToken);
router.post('/logout', logoutUser);
router.post('/repos/create', authenticateJWT, createRepository);
router.get('/user/info', authenticateJWT, getUserInfo);

export default router;