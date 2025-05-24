// stores/promptStore.js
import { create } from "zustand";
import toast from "react-hot-toast";
import api from "../lib/axios.js";
import useAuthStore from "./authStore.js"; // Import the auth store

const usePromptStore = create((set, get) => ({
  userSelections: {},
  repoData: {},
  loading: false,
  savingProject: false, // New state for tracking save operation
  response: null,
  savedProjects: [],
  loadingSavedProjects: false,
  
  generateAppIdea: async (userSelections) => {
    try {
      set({ loading: true });

      //selectedInterests.join(...)selectedScopeAndTime.join(...)selectedOutcomeGoals.join(...)selectedInspirationSources.join(...)(intermediate value)(intermediate value)(intermediate value) is not a function
      
      // Extract the actual selection arrays from the nested structure
      const requestData = {
        selectedInterests: userSelections.selectedInterests || [],
        selectedScopeAndTime: userSelections.selectedScopeAndTime || [],
        selectedOutcomeGoals: userSelections.selectedOutcomeGoals || [],
        selectedInspirationSources: userSelections.selectedInspirationSources || [],
        selectedTechStackOptions: userSelections.selectedTechStackOptions || []
      };
      
      set({ userSelections: requestData });

      console.log(`User selections: ${JSON.stringify(requestData)}`);
      
      console.log("Sending request data:", requestData);
      
      const result = await api.post("/api/huggingface/generate-idea", userSelections);
      
      // Check if response structure is as expected
      if (result.data && result.data.success) {
        toast.success("App idea generated successfully!");
        set({ loading: false, response: result.data.result });
        return result.data.result;
      } else {
        // Handle unexpected response format
        const message = result.data?.message || "Unexpected response format";
        toast.error(message);
        set({ loading: false });
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error in generateAppIdea:", error);
      
      const errorMessage = error.response?.data?.message || error.message || "Failed to generate app idea";
      toast.error(errorMessage);
      set({ loading: false });
      throw error;
    }
  },

  createRepo: async (userSelections, appIdea) => {
    try {
      set({ loading: true });

      const result = await api.post("/api/huggingface/create-repo", {userSelections, appIdea});
      
      if (result.data && result.data.success) {
        toast.success(result.data.message);
        set({ loading: false, response: result.data.result, repoData: result.data.result });
        return result.data.result;
      } else {
        // Handle unexpected response format
        const message = result.data?.message || "Unexpected response format";
        toast.error(message);
        set({ loading: false });
        throw new Error(message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  },
  
  saveInputsAndResponse: async (inputs, response) => {
    try {
      set({ savingProject: true });
      
      // Get the auth token from auth store
      const authStore = useAuthStore.getState();
      const { token, isAuthenticated } = authStore;
      
      // Log auth state for debugging
      console.log("Auth state:", { isAuthenticated, hasToken: !!token });
      
      // Check if user is authenticated
      if (!isAuthenticated || !token) {
        set({ savingProject: false });
        toast.error("Please log in to save your project");
        return { success: false, message: "Authentication required" };
      }
      
      // Set auth token in headers
      const headers = {
        Authorization: `Bearer ${token}`
      };
      
      // Validate response object
      if (!response || !response.project_name) {
        set({ savingProject: false });
        toast.error("Invalid project data");
        return { success: false, message: "Invalid project data" };
      }
      
      // Log the data being sent to help debug
      console.log("Saving project with data:", {
        inputsProvided: !!inputs,
        responseProvided: !!response,
        projectName: response.project_name,
        authHeaderProvided: !!headers.Authorization
      });
      
      // Make the API call with explicit timeout
      const result = await api.post(
        "/api/huggingface/save-inputs-and-response", 
        { inputs, response },
        { 
          headers,
          timeout: 10000 // 10 second timeout
        }
      );
      
      // Log the result
      console.log("Save project API response:", result.data);
      
      if (result.data && result.data.success) {
        toast.success("Project saved successfully!");
        // Refresh saved projects list
        get().fetchSavedProjects();
        set({ savingProject: false });
        return result.data;
      } else {
        const message = result.data?.message || "Unknown error occurred";
        toast.error(message);
        set({ savingProject: false });
        return { success: false, message };
      }
      
    } catch (error) {
      console.error("Error in saveInputsAndResponse. Full error:", error);
      
      // Better error handling to capture and display the specific error
      let errorMessage = "Failed to save project";
      
      if (error.response) {
        console.log("Error response details:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request was made but no response received
        console.log("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        // Something else caused the error
        errorMessage = error.message || "Unknown error occurred";
      }
      
      toast.error(errorMessage);
      set({ savingProject: false });
      throw error;
    }
  },

  deleteProject: async (projectId) => {
  try {
    const { token, isAuthenticated } = useAuthStore.getState();
    console.log("Deleting project with ID:", projectId);
    
    if(!projectId){
      toast.error("ProjectId not found");
      return { success: false };
    }
    
    if (!isAuthenticated || !token) {
      toast.error("Authentication required");
      return { success: false, message: "Authentication required" };
    }
    
    set({ loadingSavedProjects: true });
    const result = await api.delete(`/api/huggingface/delete-project/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    set({ savedProjects: result.data.projects, loadingSavedProjects: false });
    toast.success("Project deleted successfully!");
    return result.data.projects;
  } catch (error) {
    set({ loadingSavedProjects: false });
    console.error("Error deleting project:", error);
    toast.error(`Failed to delete project ${projectId}`); // Fixed template string
    return [];
    }
  },
  
  fetchSavedProjects: async () => {
    try {
      // Get the auth token from auth store
      const { token, isAuthenticated } = useAuthStore.getState();
      
      // Check if user is authenticated
      if (!isAuthenticated || !token) {
        return { success: false, message: "Authentication required" };
      }
      
      set({ loadingSavedProjects: true });
      
      const result = await api.get("/api/huggingface/my-projects", { 
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (result.data.success) {
        set({ savedProjects: result.data.projects, loadingSavedProjects: false });
        return result.data.projects;
      } else {
        set({ loadingSavedProjects: false });
        return [];
      }
    } catch (error) {
      console.error("Error fetching saved projects:", error);
      set({ loadingSavedProjects: false });
      return [];
    }
  },
}));

export default usePromptStore;