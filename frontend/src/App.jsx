import React, { useEffect, useMemo } from 'react';
import { AnimatePresence } from "framer-motion";
import { redirect, Route, Routes, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import LandingPage from './pages/landingPage/LandingPage.jsx';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './stores/authStore.js';
import LoginSuccess from './components/LoginSuccess.jsx';
import FileEditor from './components/FileEditor.jsx';
import CreateProject from './pages/createProject/CreateProject.jsx';
import Footer from './components/footer.jsx';
import MyProjectsPage from './pages/myProjects/MyProjectsPage.jsx';

const App = () => {
  const location = useLocation();
  
  // Use shallow comparison to prevent infinite loops with object selectors
  const initialize = useAuthStore(state => state.initialize);
  const setupTokenRefresh = useAuthStore(state => state.setupTokenRefresh);
  const isLoading = useAuthStore(state => state.isLoading);

  const { user } = useAuthStore();

  useEffect(() => {
    initialize();
    
    // Setup token refresh mechanism
    const cleanupRefresh = setupTokenRefresh();
    
    // Cleanup on unmount
    return () => {
      if (cleanupRefresh) cleanupRefresh();
    };
  }, [initialize, setupTokenRefresh]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className='min-h-screen text-white relative overflow-hidden'>
      <div className='relative'>
        <Navbar />
        
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/login/success" element={<LoginSuccess />} />
            <Route path="/file-editor" element={<FileEditor />} />
            <Route path="/my-projects" element={<MyProjectsPage />} />
            <Route path="/my-projects" 
                element={
                  <ProtectedRoute>
                    <MyProjectsPage />
                  </ProtectedRoute>
                } 
            />
            <Route path="/my-repositories" 
                element={
                  <ProtectedRoute>
                    <MyProjectsPage />
                  </ProtectedRoute>
                } 
            />
            <Route path="/create-project" element={user ? <CreateProject /> : <LoginPage/>} />
          </Routes>
        </AnimatePresence>

        <Footer/>
      </div>
      <Toaster />
    </div>
  );
};

export default App;