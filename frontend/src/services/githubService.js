import axios from 'axios';

// Base GitHub API URL
const GITHUB_API_BASE = 'https://api.github.com';

// Create an API instance with authentication headers
const createGitHubClient = (accessToken) => {
  return axios.create({
    baseURL: GITHUB_API_BASE,
    headers: {
      'Authorization': `token ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
};

// Service for GitHub operations
const githubService = {
  // Get the authenticated user's details
  getUserDetails: async (accessToken) => {
    try {
      const api = createGitHubClient(accessToken);
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user details:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get user's public repositories
  getUserRepositories: async (accessToken, page = 1, perPage = 30) => {
    try {
      const api = createGitHubClient(accessToken);
      const response = await api.get(`/user/repos`, {
        params: {
          sort: 'updated',
          direction: 'desc',
          per_page: perPage,
          page: page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch repositories:', error.response?.data || error.message);
      throw error;
    }
  },

  // Create a new repository
  createRepository: async (accessToken, repoData) => {
    try {
      const api = createGitHubClient(accessToken);
      const response = await api.post('/user/repos', {
        name: repoData.name,
        description: repoData.description || '',
        private: repoData.private || false,
        auto_init: repoData.autoInit || true, // Initialize with README
        gitignore_template: repoData.gitignoreTemplate || '',
        license_template: repoData.licenseTemplate || ''
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create repository:', error.response?.data || error.message);
      throw error;
    }
  },

  // Create or update a file in a repository
  createOrUpdateFile: async (accessToken, repoOwner, repoName, path, content, message, branch = 'main') => {
    try {
      const api = createGitHubClient(accessToken);
      
      // Check if file exists first
      let sha;
      try {
        const fileResponse = await api.get(`/repos/${repoOwner}/${repoName}/contents/${path}?ref=${branch}`);
        sha = fileResponse.data.sha;
      } catch (error) {
        // File doesn't exist, which is fine for creation
      }

      // Convert content to Base64
      const contentBase64 = btoa(unescape(encodeURIComponent(content)));
      
      const response = await api.put(`/repos/${repoOwner}/${repoName}/contents/${path}`, {
        message: message,
        content: contentBase64,
        branch: branch,
        sha: sha // Include sha if updating, omit if creating
      });
      
      return response.data;
    } catch (error) {
      console.error('Failed to create/update file:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get repository contents (files and directories)
  getRepositoryContents: async (accessToken, repoOwner, repoName, path = '', ref = 'main') => {
    try {
      const api = createGitHubClient(accessToken);
      const response = await api.get(`/repos/${repoOwner}/${repoName}/contents/${path}`, {
        params: { ref }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get repository contents:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get file content from repository
  getFileContent: async (accessToken, repoOwner, repoName, path, ref = 'main') => {
    try {
      const api = createGitHubClient(accessToken);
      const response = await api.get(`/repos/${repoOwner}/${repoName}/contents/${path}`, {
        params: { ref }
      });
      
      // GitHub API returns file content as base64
      if (response.data.content) {
        const content = decodeURIComponent(escape(atob(response.data.content)));
        return {
          ...response.data,
          decodedContent: content
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('Failed to get file content:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default githubService;