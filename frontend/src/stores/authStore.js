import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import api from "../lib/axios.js";

// Separate function for token refresh to avoid recreation in store
const refreshToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    const decoded = jwtDecode(token);
    // Refresh if token expires in less than 15 minutes
    if (decoded.exp * 1000 - Date.now() < 900000) {
      const response = await api.post('/api/auth/refresh', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Authentication state
      user: null,
      isAuthenticated: false,
      isLoading: true,
      token: null,
      
      // Initialize authentication state
      initialize: async () => {
        try {
          const token = localStorage.getItem('token');
          
          if (!token) {
            set({ isLoading: false });
            return;
          }
          
          const decoded = jwtDecode(token);
          console.log(decoded)
          
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            await refreshToken();
            // Re-check after refresh attempt
            const newToken = localStorage.getItem('token');
            if (!newToken) throw new Error('Token refresh failed');
            
            const newDecoded = jwtDecode(newToken);
            set({
              user: {
                id: newDecoded.id,
                username: newDecoded.username,
                avatar: newDecoded.avatar
              },
              token: newToken,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            set({
              user: {
                id: decoded.id,
                username: decoded.username,
                avatar: decoded.avatar
              },
              token,
              isAuthenticated: true,
              isLoading: false
            });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('token');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      },
      
      // Fetch current user details
      fetchCurrentUser: async () => {
        try {
          const { token } = get();
          if (!token) return;
          
          set({ isLoading: true });
          
          const response = await api.get("/api/auth/user", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.data) {
            set({ 
              user: response.data,
              isLoading: false 
            });
          } else {
            // Handle failed user fetch
            set({ 
              user: null,
              isAuthenticated: false,
              token: null,
              isLoading: false 
            });
          }
        } catch (error) {
          console.error("Error fetching current user:", error);
          // Clear auth state on error
          set({ 
            user: null, 
            isAuthenticated: false, 
            token: null,
            isLoading: false 
          });
        }
      },
      
      // GitHub login method
      loginWithGitHub: () => {
        // Clear any existing tokens and state before login
        localStorage.removeItem('token');
        
        // Add timestamp to prevent caching of the auth request
        const timestamp = new Date().getTime();
        
        window.location.href = `http://localhost:5500/api/auth/github?t=${timestamp}`;
      },

      // Create GitHub repo (optional method)
      createRepo: async (repoName, description = '', isPrivate = false) => {
        const token = localStorage.getItem('githubToken'); // Stored during GitHub login
      
        const response = await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: repoName,
            description,
            private: isPrivate,
          }),
        });
      
        if (!response.ok) throw new Error('Failed to create repo');
        return await response.json();
      },
      
      // Logout method
      logout: async () => {
        try {
          // Call logout endpoint
          const token = localStorage.getItem('token');
          if (token) {
            await api.post('/api/auth/logout', {}, {
              headers: { Authorization: `Bearer ${token}` }
            }).catch(err => console.log('Logout API error (non-critical):', err));
          }
        } catch (error) {
          console.error('Logout error:', error);
        }
        
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('githubToken');
        
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
        
        localStorage.setItem('token', authData.token);
        set({
          user: authData.user,
          token: authData.token,
          isAuthenticated: true
        });
      },
      
      // Setup auto token refresh
      setupTokenRefresh: () => {
        // Initial check
        refreshToken();
        // Check every 10 minutes
        const interval = setInterval(refreshToken, 600000);
        return () => clearInterval(interval);
      }
    }),
    {
      name: "auth-storage", // Name for localStorage key
      partialize: (state) => ({ token: state.token }), // Only persist token to localStorage
    }
  )
);

export default useAuthStore;