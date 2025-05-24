import React from 'react';
import { Zap, Cpu, FileCode, Target } from "lucide-react";
import useThemeStore from '../stores/themeStore';

const StepsSection = () => {
  const { isDarkMode } = useThemeStore();
  
  const steps = [
    {
      number: 1,
      icon: <Zap size={24} className="text-neon-yellow" />,
      title: "Share Your Profile",
      description: "Tell us about your skills, interests, and the amount of time you can dedicate to building."
    },
    {
      number: 2,
      icon: <Cpu size={24} className="text-neon-yellow" />,
      title: "Get AI Recommendations",
      description: "Our AI analyzes your profile and generates project ideas tailored to your experience level."
    },
    {
      number: 3,
      icon: <FileCode size={24} className="text-neon-yellow" />,
      title: "Choose Your Tech Stack",
      description: "Select from recommended frameworks and libraries that match your current skills."
    },
    {
      number: 4,
      icon: <Target size={24} className="text-neon-yellow" />,
      title: "Build With Support",
      description: "Access resources, track your progress, and receive gentle reminders to keep you on schedule."
    }
  ];

  return (
    <div className={`w-full transition-colors duration-300 ease-in-out py-12 md:py-16 lg:py-20 ${
      isDarkMode ? "bg-gray-800 text-white" : "bg-background-light text-neutral-900"
    }`}>
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">How It Works</h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base">
            Our platform makes it easy to find your next coding project in just a few steps
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative p-6 rounded-xl md:rounded-2xl lg:rounded-3xl border-2 ${
                isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-neutral-100"
              }`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}>
                  {step.icon}
                </div>
                <span className="text-sm font-medium text-neon-yellow">Step {step.number}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepsSection;