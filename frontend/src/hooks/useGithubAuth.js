import { useState, useCallback } from 'react';
import useAuthStore from '../stores/authStore';

/**
 * Custom hook to handle GitHub authentication
 * This provides a clean way to access the GitHub token in components
 */
const useGithubAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get GitHub token from localStorage
  const getGithubToken = useCallback(() => {
    return localStorage.getItem('github_token');
  }, []);

  // Check if user has a valid GitHub token
  const hasValidGithubToken = useCallback(() => {
    const token = getGithubToken();
    return !!token;
  }, [getGithubToken]);

  // Helper to handle API errors
  const handleGithubError = useCallback((error) => {
    console.error('GitHub API error:', error);
    
    // Check if token is invalid (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('github_token');
      setError('GitHub authentication expired. Please login again.');
      return true;
    }
    
    // Handle rate limiting
    if (error.response && error.response.status === 403) {
      const resetTime = error.response.headers['x-ratelimit-reset'];
      if (resetTime) {
        const resetDate = new Date(resetTime * 1000);
        setError(`GitHub rate limit exceeded. Try again after ${resetDate.toLocaleTimeString()}`);
      } else {
        setError('GitHub rate limit exceeded. Please try again later.');
      }
      return true;
    }
    
    // Generic error
    setError(error.message || 'Error accessing GitHub API');
    return false;
  }, []);

  return {
    getGithubToken,
    hasValidGithubToken,
    handleGithubError,
    isLoading,
    setIsLoading,
    error,
    setError
  };
};

export default useGithubAuth;