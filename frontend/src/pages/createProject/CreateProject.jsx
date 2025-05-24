import React, { useState } from 'react';
import { motion } from "framer-motion";
import ProjectForm from '../../components/ai-project-form';
import ResponseDisplay from '../../components/ResponseDisplay';
import usePromptStore from '../../stores/promptStore';
import useThemeStore from '../../stores/themeStore';

const CreateProject = () => {
  const { generateAppIdea, loading, response, userSelections } = usePromptStore();
  const { isDarkMode } = useThemeStore();

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  const handleGenerate = async (formData) => {
    // Call the generateAppIdea function from promptStore with form data
    return generateAppIdea(formData);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`w-full min-h-screen pt-27 ${isDarkMode ? "bg-gray-900 text-white" : "bg-background-light text-neutral-900"} transition-colors duration-300 ease-in-out`}
    >
      <div className="container mx-auto pt-8 pb-16 px-4">
        {/* Title section */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className={`text-4xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-neutral-800"}`}>
            AI Project Generator
          </h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Answer a few questions to get a tailored project idea with detailed specifications and learning resources.
          </p>
        </div>

        {/* Form section */}
        <div className={`max-w-4xl mx-auto rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-neutral-100"} shadow-lg p-6 sm:p-8 mb-12`}>
          <ProjectForm onGenerate={handleGenerate} />
        </div>

        {/* Results section */}
        {(response || loading) && (
          <div className="mt-12">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block p-4 border-4 border-t-neon-yellow border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-medium">Generating your perfect project idea...</p>
                <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>This may take a moment as we craft a detailed plan.</p>
              </div>
            ) : (
              <div>
                <div className={`max-w-4xl mx-auto mb-8 px-4 py-3 ${isDarkMode ? "bg-gray-800" : "bg-neutral-100"} rounded-lg border-l-4 border-neon-yellow`}>
                  <h2 className="text-xl font-semibold mb-1">Your Project Idea Is Ready</h2>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Here's a complete breakdown of your personalized project, including features, tech stack, and resources.
                  </p>
                </div>
                
                {/* Display AI response using the ResponseDisplay component */}
                <ResponseDisplay userInputs={userSelections} response={response} />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CreateProject;