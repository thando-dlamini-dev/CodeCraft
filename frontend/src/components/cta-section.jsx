import React from 'react';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from '../stores/authStore';
import useThemeStore from '../stores/themeStore';

const CtaSection = () => {
  const { user } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  
  return (
    <div className={`w-full transition-colors duration-300 ease-in-out py-16 md:py-20 ${
      isDarkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-neutral-900"
    }`}>
      <div className="container mx-auto px-4">
        <div className={`rounded-3xl p-8 md:p-12 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } border-2 border-neon-yellow shadow-lg`}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
              Ready to Build Your Next Web App?
            </h2>
            <p className={`text-sm md:text-base mb-8 ${
              isDarkMode ? "text-gray-300" : "text-neutral-600"
            }`}>
              Get personalized project recommendations based on your skills, interests, and availability.
              No more decision paralysis or abandoned projects.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {!user ? (
                <>
                  <Link 
                    to="/signup" 
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-black text-white hover:scale-105 transition-transform duration-300 ease-in-out font-medium"
                  >
                    Sign Up Free
                  </Link>
                  <Link 
                    to="/login" 
                    className={`w-full sm:w-auto px-6 py-3 rounded-full ${
                      isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-neutral-800"
                    } hover:scale-105 transition-transform duration-300 ease-in-out font-medium`}
                  >
                    Log In
                  </Link>
                </>
              ) : (
                <Link 
                  to="/create-project" 
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-black text-white flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out font-medium"
                >
                  Create Your Project <ArrowRight size={16} />
                </Link>
              )}
            </div>
            
            <p className={`mt-6 text-xs ${isDarkMode ? "text-gray-400" : "text-neutral-500"}`}>
              No credit card needed. Start building in minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;