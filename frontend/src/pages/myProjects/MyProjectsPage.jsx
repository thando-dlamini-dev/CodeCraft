import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponseDisplay from '../../components/ResponseDisplay';
import useAuthStore from '../../stores/authStore';
import usePromptStore from '../../stores/promptStore';
import toast from 'react-hot-toast';
import { ArrowUpRight, ArrowUpRightFromSquare, Trash2Icon } from 'lucide-react';
import useThemeStore from '../../stores/themeStore';

const MyProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { isAuthenticated } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const { fetchSavedProjects, savedProjects, loadingSavedProjects, deleteProject } = usePromptStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Fetch projects
    const loadProjects = async () => {
      await fetchSavedProjects();
    };
6
    loadProjects();
  }, [isAuthenticated, fetchSavedProjects, navigate]);

  // Handle project selection
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? "bg-gray-900 text-white" : "bg-background-light text-neutral-900"} transition-all duration-300 ease-in-out`}>
      <div className="container mx-auto py-8 px-4">
        <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-neutral-900" } mb-8`}>My Projects</h1>
        
        {loadingSavedProjects ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-yellow"></div>
          </div>
        ) : savedProjects.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-6">
            <p className="text-yellow-800">You don't have any saved projects yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {/* Project Selection Panel */}
            {!selectedProject && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProjects.map((project) => (
                  <div 
                    key={project.id}
                    className={`${isDarkMode ? "bg-gray-800" : "bg-white"} hover:scale-102 transition-all duration-170 ease-in-out  rounded-lg shadow-sm p-6 hover:shadow-md`}
                    
                  >
                    {console.log(project)}
                    <div className='w-full h-15 flex justify-between mb-4'>
                      <div className='w-8/10 h-full'>
                      <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-neutral-800"}`}>
                      {project.project_name}
                      </h2>
                      </div>
                      <div className='w-2/10 h-full flex justify-between items-start'>
                        <ArrowUpRightFromSquare onClick={() => handleProjectSelect(project)} className='text-green-400 hover:scale-120 transition-all duration-150 ease-in-out cursor-pointer'/>
                        <Trash2Icon onClick={() => deleteProject(project.id)} className='text-red-400 hover:scale-120 transition-all duration-150 ease-in-out cursor-pointer'/>
                      </div>
                    </div>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-sm mb-4 line-clamp-2`}>
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tech_stack.slice(0, 3).map((tech, index) => (
                        <span key={index} className={`px-2 py-1 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} rounded-md text-xs`}>
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack.length > 3 && (
                        <span className={`px-2 py-1 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} rounded-md text-xs`}>
                          +{project.tech_stack.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        project.difficulty === "Beginner" 
                          ? `${isDarkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"}` 
                          : project.difficulty === "Intermediate"
                          ? `${isDarkMode ? "bg-yellow-900 text-yellow-200" : "bg-yellow-100 text-yellow-800"}`
                          : `${isDarkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800"}`
                      }`}>
                        {project.difficulty}
                      </span>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {new Date(project.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Selected Project Display */}
            {selectedProject && (
              <div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className={`mb-6 flex items-center ${isDarkMode ? "text-blue-400" : "text-blue-600"} hover:underline`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Projects
                </button>
                
                <ResponseDisplay 
                  userInputs={selectedProject.user_selections} 
                  response={selectedProject} 
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;