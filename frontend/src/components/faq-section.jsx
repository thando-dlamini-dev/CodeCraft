import React from 'react';
import { CheckCircle2, HelpCircle, AlertCircle } from "lucide-react";
import useThemeStore from '../stores/themeStore';

const FaqSection = () => {
  const { isDarkMode } = useThemeStore();
  
  const faqs = [
    {
      question: "How does the AI generate project recommendations?",
      answer: "Our algorithm analyzes your input including current skills, experience level, interests, and available time commitment. It then matches these parameters against our database of project templates to recommend projects that will challenge you appropriately without being overwhelming."
    },
    {
      question: "Is this service completely free?",
      answer: "Yes! The core features including personalized project recommendations, tech stack suggestions, and basic GitHub integration are free for all users. We plan to offer premium features in the future, but the essential functionality will always remain free."
    },
    {
      question: "Do I need to know programming already to use this tool?",
      answer: "While our platform works best if you have some basic programming knowledge, we cater to all skill levels - from beginners who know HTML/CSS to experienced developers looking for more advanced projects. Just be honest about your current skills, and we'll match you accordingly."
    },
    {
      question: "Can I request specific types of projects?",
      answer: "Absolutely! Our recommendation form includes an optional field where you can specify particular interests, industries, or project types you'd like to work on. Our AI will factor these preferences into its recommendations."
    },
    {
      question: "What if I don't like the project that's recommended?",
      answer: "No problem at all! You can request alternative recommendations with adjusted parameters, or provide feedback about what you didn't like about the suggestion. Our system learns from your feedback to provide better recommendations in the future."
    },
    {
      question: "How detailed are the project specifications?",
      answer: "Each project recommendation includes a description, suggested features, recommended tech stack, estimated difficulty and time commitment, learning resources, and optional stretch goals. You'll have enough guidance to get started without limiting your creativity."
    }
  ];

  return (
    <div className={`w-full transition-colors duration-300 ease-in-out py-12 md:py-16 lg:py-20 ${
      isDarkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-neutral-900"
    }`}>
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">Frequently Asked Questions</h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base">
            Everything you need to know about our AI project recommendation platform
          </p>
        </div>
        
        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl ${
                  isDarkMode ? "bg-gray-700" : "bg-background-light"
                }`}
              >
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <HelpCircle size={20} className="text-neon-yellow" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                    <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"}`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Contact info */}
          <div className={`mt-10 p-6 rounded-xl border border-neon-yellow ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <AlertCircle size={20} className="text-neon-yellow" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Still have questions?</h3>
                <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-300" : "text-neutral-600"}`}>
                  We're here to help! Reach out to our support team for any questions not covered above.
                </p>
                <a 
                  href="mailto:support@appideator.com" 
                  className="inline-flex items-center text-sm font-medium text-neon-yellow hover:underline"
                >
                  <CheckCircle2 size={16} className="mr-2" />
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;