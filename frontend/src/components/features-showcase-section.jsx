import React from 'react';
import { Zap, Code, Calendar, Github, Server, Palette } from "lucide-react";
import useThemeStore from '../stores/themeStore';

const FeaturesShowcaseSection = () => {
  const { isDarkMode } = useThemeStore();
  
  const features = [
    {
      icon: <Zap size={24} className="text-neon-yellow" />,
      title: "AI-Powered Recommendations",
      description: "Our intelligent algorithm analyzes your skills and interests to suggest projects perfectly matched to your experience level."
    },
    {
      icon: <Code size={24} className="text-neon-yellow" />,
      title: "Tech Stack Analysis",
      description: "Get tailored tech stack recommendations based on your current skills and what technologies would be most beneficial to learn next."
    },
    {
      icon: <Calendar size={24} className="text-neon-yellow" />,
      title: "Customized Timelines",
      description: "Set realistic deadlines based on your availability and receive a project plan broken down into manageable milestones."
    },
    {
      icon: <Github size={24} className="text-neon-yellow" />,
      title: "GitHub Integration",
      description: "Automatically create a new repository with basic project structure and README to help you get started immediately."
    },
    {
      icon: <Server size={24} className="text-neon-yellow" />,
      title: "Resource Library",
      description: "Access curated tutorials, documentation, and learning resources specific to your project's requirements."
    },
    {
      icon: <Palette size={24} className="text-neon-yellow" />,
      title: "Design Templates",
      description: "Jump-start your project with UI component suggestions and design patterns matched to your project type."
    }
  ];

  return (
    <div className={`w-full transition-colors duration-300 ease-in-out py-12 md:py-16 lg:py-20 ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-background-light text-neutral-900"
    }`}>
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">Powerful Features</h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base">
            Everything you need to go from idea to finished project, tailored to your experience level
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl border-2 transition-transform hover:scale-105 ${
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-50"
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Feature highlight */}
        <div className={`mt-16 p-6 md:p-8 lg:p-10 rounded-2xl border-2 border-neon-yellow ${
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        }`}>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Personalized Learning Path</h3>
              <p className={`text-sm md:text-base mb-4 ${isDarkMode ? "text-gray-300" : "text-neutral-700"}`}>
                Our platform doesn't just recommend projects - it creates a personalized learning journey that progressively builds your skills.
              </p>
              <ul className="space-y-2">
                {[
                  "Projects that build on your existing knowledge",
                  "Introduction to new technologies at the right pace",
                  "Skill progression tracking to measure your growth",
                  "Difficulty adjustment based on your feedback"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-neon-yellow mr-2">✓</span>
                    <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className={`w-full max-w-md rounded-xl overflow-hidden border-2 ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}>
                <div className={`p-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} flex items-center`}>
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className={`p-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
                  <div className="space-y-2">
                    <div className={`h-4 rounded ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} w-3/4`}></div>
                    <div className={`h-4 rounded ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} w-full`}></div>
                    <div className={`h-4 rounded ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} w-5/6`}></div>
                    <div className="mt-4 flex space-x-2">
                      <div className={`h-8 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} w-1/4`}></div>
                      <div className={`h-8 rounded bg-black w-1/4`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesShowcaseSection;