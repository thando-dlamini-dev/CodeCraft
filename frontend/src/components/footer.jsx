import React from 'react';
import { Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useThemeStore from '../stores/themeStore';

const Footer = () => {
  const { isDarkMode } = useThemeStore();
  
  return (
    <footer className={`w-full transition-colors duration-300 ease-in-out py-10 md:py-12 ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-neutral-900"
    }`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-semibold mb-4"><img src="../../public/CodeCraft-logo2.png" className='w-50 h-full' alt="" /></h3>
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"} mb-4`}>
              Personalized project recommendations for developers of all skill levels. 
              Build something that matters.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="hover:text-neon-yellow transition-colors duration-200">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-neon-yellow transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="hover:text-neon-yellow transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/guide" className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"} hover:text-neon-yellow transition-colors duration-200`}>
                  Getting Started Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"} hover:text-neon-yellow transition-colors duration-200`}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"} hover:text-neon-yellow transition-colors duration-200`}>
                  Developer Blog
                </Link>
              </li>
              <li>
                <Link to="/showcase" className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"} hover:text-neon-yellow transition-colors duration-200`}>
                  Project Showcase
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"} hover:text-neon-yellow transition-colors duration-200`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"} hover:text-neon-yellow transition-colors duration-200`}>
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"} hover:text-neon-yellow transition-colors duration-200`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"} hover:text-neon-yellow transition-colors duration-200`}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-neutral-600"} mb-4`}>
              Subscribe to our newsletter for the latest features and updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className={`flex-grow px-3 py-2 text-sm rounded-l-md ${
                  isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-neutral-900 border-gray-200"
                } border focus:outline-none focus:ring-1 focus:ring-neon-yellow`}
              />
              <button 
                className="bg-black text-white px-3 py-2 rounded-r-md hover:bg-neon-yellow transition-colors duration-200"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center">
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-neutral-500"}`}>
            © {new Date().getFullYear()} CodeCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;