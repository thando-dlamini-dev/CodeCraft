import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import api from "../lib/axios.js";

// Configure axios to always include credentials
api.defaults.withCredentials = true;

const useAuthStore = create(
  persist(
    (set, get) => {
      return ({
        // Authentication state
        user: null,
        isAuthenticated: false,
        isLoading: true,
        token: null,

        // Initialize authentication state
        initialize: async () => {
          try {
            // Check auth status with server (which reads from cookies)
            const response = await api.get('/api/auth/status');
            
            if (response.data.isAuthenticated) {
              set({
                user: response.data.user,
                token: response.data.token,
                isAuthenticated: true,
                isLoading: false
              });
            } else {
              set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false
              });
            }
          } catch (error) {
            console.error('Auth initialization error:', error);
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false
            });
          }
        },

        // GitHub login method
        loginWithGitHub: () => {
          // Add timestamp to prevent caching of the auth request
          const timestamp = new Date().getTime();
          window.location.href = `/api/auth/github?t=${timestamp}`;
        },

        // Create GitHub repo (optional method)
        createRepo: async (repoName, description = '', isPrivate = false) => {
          try {
            // The GitHub token is now stored in HTTP-only cookie
            // You'll need to create a backend endpoint to handle this
            const response = await api.post('/api/github/create-repo', {
              name: repoName,
              description,
              private: isPrivate,
            });

            return response.data;
          } catch (error) {
            console.error('Failed to create repo:', error);
            throw error;
          }
        },

        // Logout method
        logout: async () => {
          try {
            // Call logout endpoint (will clear cookies)
            await api.post('/api/auth/logout');
          } catch (error) {
            console.error('Logout error:', error);
          }

          // Reset state
          set({
            user: null,
            token: null,
            isAuthenticated: false
          });

          // Display success message
          toast.success("Logged out successfully.");

          // Optional: Force clean GitHub OAuth state
          setTimeout(() => {
            window.location.href = "https://github.com/logout";
          }, 500);
        },

        // Set authentication data after successful login
        setAuthData: (authData) => {
          if (!authData || !authData.token || !authData.user) return;

          set({
            user: authData.user,
            token: authData.token,
            isAuthenticated: true
          }); 
        },

        // Token refresh is now handled by the server via cookies
        // Remove the manual token refresh logic
        setupTokenRefresh: () => {
          // No longer needed - server handles token refresh via cookies
          return () => {};
        }
      });
    },
    {
      name: "auth-storage",
      partialize: (state) => ({
        // Don't persist token anymore since it's in HTTP-only cookies
        // Just persist user data if needed
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);

export default useAuthStore;