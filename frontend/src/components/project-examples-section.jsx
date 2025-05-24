import React from 'react';
import { Puzzle, Target, Briefcase, Code } from "lucide-react";
import useThemeStore from '../stores/themeStore';

const ProjectExamplesSection = () => {
  const { isDarkMode } = useThemeStore();
  
  const projectExamples = [
    {
      title: "Habit Tracker App",
      difficulty: "Beginner",
      timeEstimate: "2-3 weeks",
      description: "A simple app to track daily habits with progress visualization.",
      skills: ["HTML/CSS", "JavaScript", "React", "Local Storage"],
      icon: <Target size={24} className="text-neon-yellow" />
    },
    {
      title: "Recipe Manager",
      difficulty: "Intermediate",
      timeEstimate: "4-6 weeks",
      description: "A full-stack application to store, search and organize cooking recipes.",
      skills: ["React", "Node.js", "Express", "MongoDB", "Authentication"],
      icon: <Briefcase size={24} className="text-neon-yellow" />
    },
    {
      title: "Collaborative Markdown Editor",
      difficulty: "Advanced",
      timeEstimate: "8-10 weeks",
      description: "Real-time collaborative document editing with markdown support.",
      skills: ["React", "WebSockets", "Redux", "Node.js", "Database Design"],
      icon: <Code size={24} className="text-neon-yellow" />
    }
  ];

  return (
    <div className={`w-full transition-colors duration-300 ease-in-out py-12 md:py-16 lg:py-20 ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-background-light text-neutral-900"
    }`}>
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">Project Examples</h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base">
            Here are some sample projects our AI might recommend based on different skill levels
          </p>
        </div>
        
        {/* Project examples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectExamples.map((project, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl border-2 ${
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}>
                  {project.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
                  project.difficulty === "Beginner" 
                    ? "bg-green-100 text-green-800" 
                    : project.difficulty === "Intermediate"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {project.difficulty}
                </span>
                <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-neutral-500"}`}>
                  {project.timeEstimate}
                </span>
              </div>
              
              <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-300" : "text-neutral-700"}`}>
                {project.description}
              </p>
              
              <div>
                <p className={`text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-neutral-500"}`}>
                  Recommended Skills:
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-neutral-700"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className={`h-2 w-full rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                  <div 
                    className="h-full rounded-full bg-neon-yellow" 
                    style={{ 
                      width: project.difficulty === "Beginner" 
                        ? "30%" 
                        : project.difficulty === "Intermediate"
                        ? "60%"
                        : "90%" 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-neutral-500"}`}>Complexity</span>
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-neutral-500"}`}>
                    {project.difficulty === "Beginner" 
                      ? "Low" 
                      : project.difficulty === "Intermediate"
                      ? "Medium"
                      : "High"
                    }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call-to-action banner */}
        <div className="mt-12 text-center">
          <div className={`inline-flex items-center p-2 rounded-full ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          }`}>
            <Puzzle size={20} className="text-neon-yellow mr-2" />
            <span className="text-sm">Want to see more examples? <a href="#" className="text-neon-yellow font-medium">Explore our project gallery</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectExamplesSection;