import React, { useState } from 'react';
import { Star, PlusCircle, Loader, CheckCircle } from 'lucide-react';
import useThemeStore from '../stores/themeStore';

const ProjectForm = ({ onGenerate }) => {
  const { isDarkMode } = useThemeStore();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [customOption, setCustomOption] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      bottom: 0,
      behavior: "smooth",
    });
  };
  
  // Form state
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedScopeAndTime, setSelectedScopeAndTime] = useState([]);
  const [selectedOutcomeGoals, setSelectedOutcomeGoals] = useState([]);
  const [selectedInspirationSources, setSelectedInspirationSources] = useState([]);
  const [selectedTechStackOptions, setSelectedTechStackOptions] = useState([]);
  
  const [inputTypes, setInputTypes] = useState({
    interest: {
      question: "Which interests would you like your app idea to be based on?",
      options: [
        { name: "Sports" },
        { name: "Finance" },
        { name: "Education" },
        { name: "Health" },
        { name: "Productivity" },
        { name: "Entertainment" },
        { name: "Social Media" },
        { name: "E-commerce" },
        { name: "Gaming" },
        { name: "AI/ML" },
        { name: "Travel" },
        { name: "Real Estate" },
      ]
    },
    scopeAndTime: {
      question: "What is the ideal time scope for completing this project?",
      options: [
        { name: "Weekend" },
        { name: "1 Week" },
        { name: "2 Weeks" },
        { name: "1 Month" },
        { name: "Long-Term" }
      ]
    },
    outcomeGoals: {
      question: "What kind of outcome are you aiming for?",
      options: [
        { name: "Portfolio project" },
        { name: "Real-world use" },
        { name: "Learning a new technology" },
        { name: "Impress recruiters" },
        { name: "Solve a personal problem" }
      ]
    },
    inspirationType: {
      question: "Would you like your app to be inspired by any particular type of project?",
      options: [
        { name: "Harvard CS50 final projects" },
        { name: "Hackathon winners" },
        { name: "YC startups" },
        { name: "Apps on Product Hunt" },
        { name: "No, I want something original" }
      ]
    },
    techStackOptions: {
      question: "Which technologies or tools do you want to use or learn in this project?",
      options: [
        { name: "React" },
        { name: "Next.js" },
        { name: "Node.js" },
        { name: "Express" },
        { name: "MongoDB" },
        { name: "PostgreSQL" },
        { name: "Firebase" },
        { name: "Tailwind CSS" },
        { name: "TypeScript" },
        { name: "GraphQL" },
        { name: "Supabase" },
        { name: "Docker" },
        { name: "Prisma" },
        { name: "Redis" },
        { name: "Stripe" },
        { name: "Auth0" },
        { name: "Socket.io" },
        { name: "Three.js" },
        { name: "OpenAI API" }
      ]
    }
  });
  
  const steps = [
    { key: 'interest', state: selectedInterests, setState: setSelectedInterests },
    { key: 'scopeAndTime', state: selectedScopeAndTime, setState: setSelectedScopeAndTime },
    { key: 'outcomeGoals', state: selectedOutcomeGoals, setState: setSelectedOutcomeGoals },
    { key: 'inspirationType', state: selectedInspirationSources, setState: setSelectedInspirationSources },
    { key: 'techStackOptions', state: selectedTechStackOptions, setState: setSelectedTechStackOptions }
  ];
  
  const currentInputType = steps[currentStep].key;
  const currentSelections = steps[currentStep].state;
  const setCurrentSelections = steps[currentStep].setState;
  
  const handleOptionToggle = (option) => {
    if (currentSelections.includes(option)) {
      setCurrentSelections(currentSelections.filter(item => item !== option));
    } else {
      setCurrentSelections([...currentSelections, option]);
    }
  };
  
  const moveToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowCustomInput(false);
      setCustomOption('');
    }
  };
  
  const moveToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowCustomInput(false);
      setCustomOption('');
    }
  };
  
  const isLastStep = currentStep === steps.length - 1;

  const handleShowCustomInput = () => {
    setShowCustomInput(true);
  };
  
  const handleAddCustomOption = () => {
    if (customOption.trim() === '') return;
    
    // Add the custom option to the current input type options
    setInputTypes(prev => {
      const currentKey = steps[currentStep].key;
      const updatedOptions = [...prev[currentKey].options, { name: customOption.trim() }];
      
      return {
        ...prev,
        [currentKey]: {
          ...prev[currentKey],
          options: updatedOptions
        }
      };
    });
    
    // Auto-select the newly added option
    setCurrentSelections([...currentSelections, customOption.trim()]);
    
    // Reset custom option input
    setCustomOption('');
    setShowCustomInput(false);
  };
  
  const handleGenerateProject = () => {
    setLoading(true);
    window.scrollTo({
      bottom: 0,
      behavior: "smooth",
    });
    // Call the onGenerate prop with all collected data
    onGenerate({
      selectedInterests,
      selectedScopeAndTime,
      selectedOutcomeGoals,
      selectedInspirationSources,
      selectedTechStackOptions
    }).finally(() => {
      setLoading(false);
    });
  };
  
  return (
    <div className={`w-full max-w-4xl mx-auto transition-all duration-300 ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                index === currentStep 
                  ? 'border-neon-yellow bg-neon-yellow text-gray-900' 
                  : index < currentStep
                    ? `${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-200'} text-gray-500`
                    : `${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-gray-400`
              }`}
              onClick={() => index <= currentStep && setCurrentStep(index)}
            >
              {index < currentStep ? <CheckCircle size={16} /> : index + 1}
            </div>
          ))}
        </div>
        <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 rounded-full">
          <div 
            className="h-1 bg-neon-yellow rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Question and options */}
      <div className={`mb-8 border-l-4 border-neon-yellow pl-4 transition-opacity duration-300`}>
        <h2 className="text-2xl font-bold mb-2">
          {inputTypes[currentInputType].question}
        </h2>
        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          Select all that apply:
        </p>
      </div>
      
      {/* Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {inputTypes[currentInputType].options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionToggle(option.name)}
            className={`
              relative px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 
              ${currentSelections.includes(option.name) 
                ? `bg-neon-yellow text-gray-900 shadow-md` 
                : `${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border-gray-700' : 'bg-neutral-100 text-gray-800 hover:bg-gray-50'} border border-gray-200`
              }
            `}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center border ${
                currentSelections.includes(option.name) 
                  ? 'border-gray-900 bg-gray-900' 
                  : isDarkMode ? 'border-gray-500' : 'border-gray-400'
              }`}>
                {currentSelections.includes(option.name) && (
                  <div className="w-2 h-2 rounded-full bg-neon-yellow"></div>
                )}
              </div>
              <span className="font-medium">{option.name}</span>
            </div>
          </div>
        ))}
        
        {/* Custom option input or button */}
        {showCustomInput ? (
          <div className={`col-span-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <input
              type='text'
              value={customOption}
              onChange={(e) => setCustomOption(e.target.value)}
              placeholder="Enter custom option"
              className={`flex-grow px-4 py-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCustomOption()}
            />
            <button
              onClick={handleAddCustomOption}
              className="px-4 py-3 rounded-lg bg-neon-yellow text-gray-900 font-medium"
            >
              Add
            </button>
          </div>
        ) : (
          <div 
            onClick={handleShowCustomInput} 
            className={`px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 border border-dashed flex items-center justify-center ${
              isDarkMode ? 'border-gray-600 text-gray-400 hover:border-gray-500' : 'border-gray-300 text-gray-500 hover:border-gray-400'
            }`}
          >
            <PlusCircle size={16} className="mr-2" />
            <span>Add custom</span>
          </div>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={moveToPreviousStep}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-full transition-all duration-200 ${
            currentStep === 0
              ? 'opacity-50 cursor-not-allowed'
              : isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          } ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Previous
        </button>
        
        {isLastStep ? (
          <button
            onClick={handleGenerateProject}
            disabled={loading}
            className={`px-8 py-3 rounded-full bg-neon-yellow text-gray-900 font-semibold flex items-center gap-2 transition-all duration-300 ${
              loading ? 'opacity-70 cursor-wait' : 'hover:shadow-lg'
            }`}
          >
            {loading ? (
              <><Loader size={18} className="animate-spin" /> Generating...</>
            ) : (
              <><Star size={18} /> Generate Project Idea</>
            )}
          </button>
        ) : (
          <button
            onClick={moveToNextStep}
            className="px-6 py-2 rounded-full bg-neon-yellow text-gray-900 font-semibold transition-all duration-200 hover:shadow-md"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;