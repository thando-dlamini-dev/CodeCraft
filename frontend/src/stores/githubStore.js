import { create } from 'zustand';
import githubService from '../services/githubService.js';
import toast from 'react-hot-toast';

const useGithubStore = create((set, get) => ({
  // State
  repositories: [],
  isLoading: false,
  error: null,
  currentRepo: null,
  repoContents: [],
  currentFile: null,
  
  // Reset store state
  resetState: () => {
    set({
      repositories: [],
      isLoading: false,
      error: null,
      currentRepo: null,
      repoContents: [],
      currentFile: null,
    });
  },

  // Fetch user's repositories
  fetchUserRepositories: async (accessToken, page = 1) => {
    set({ isLoading: true, error: null });
    
    try {
      const repositories = await githubService.getUserRepositories(accessToken, page);
      set({ 
        repositories, 
        isLoading: false 
      });
      return repositories;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch repositories', 
        isLoading: false 
      });
      toast.error('Failed to fetch repositories');
      throw error;
    }
  },

  // Create a new repository
  createRepository: async (accessToken, repoData) => {
    set({ isLoading: true, error: null });
    
    try {
      const newRepo = await githubService.createRepository(accessToken, repoData);
      set((state) => ({ 
        repositories: [newRepo, ...state.repositories],
        currentRepo: newRepo,
        isLoading: false
      }));
      toast.success(`Repository ${newRepo.name} created successfully`);
      return newRepo;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to create repository', 
        isLoading: false 
      });
      toast.error('Failed to create repository');
      throw error;
    }
  },

  // Set current repository
  setCurrentRepository: (repo) => {
    set({ currentRepo: repo });
  },

  // Fetch repository contents
  fetchRepositoryContents: async (accessToken, repoOwner, repoName, path = '') => {
    set({ isLoading: true, error: null });
    
    try {
      const contents = await githubService.getRepositoryContents(accessToken, repoOwner, repoName, path);
      set({ repoContents: contents, isLoading: false });
      return contents;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch repository contents', 
        isLoading: false 
      });
      toast.error('Failed to fetch repository contents');
      throw error;
    }
  },

  // Fetch file content
  fetchFileContent: async (accessToken, repoOwner, repoName, path) => {
    set({ isLoading: true, error: null });
    
    try {
      const fileData = await githubService.getFileContent(accessToken, repoOwner, repoName, path);
      set({ currentFile: fileData, isLoading: false });
      return fileData;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch file content', 
        isLoading: false 
      });
      toast.error('Failed to fetch file content');
      throw error;
    }
  },

  // Create or update file
  createOrUpdateFile: async (accessToken, repoOwner, repoName, path, content, message) => {
    set({ isLoading: true, error: null });
    
    try {
      const result = await githubService.createOrUpdateFile(
        accessToken, 
        repoOwner, 
        repoName, 
        path, 
        content, 
        message
      );
      
      set({ isLoading: false });
      
      // Refresh contents if in the same directory
      const pathParts = path.split('/');
      pathParts.pop(); // Remove filename
      const directory = pathParts.join('/');
      
      await get().fetchRepositoryContents(accessToken, repoOwner, repoName, directory);
      
      toast.success(`File ${path} saved successfully`);
      return result;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to save file', 
        isLoading: false 
      });
      toast.error('Failed to save file');
      throw error;
    }
  }
}));

export default useGithubStore;