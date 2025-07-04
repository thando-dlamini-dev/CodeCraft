import React, { useState } from 'react';
import ScrollLink from "../components/ScrollLink.jsx";
import useAuthStore from '../stores/authStore.js';
import useThemeStore from '../stores/themeStore.js';
import { Menu, X } from 'lucide-react'; // Using Lucide icons for menu toggle

const Navbar = () => {  
  
  const { user, logout } = useAuthStore();

  const pages = [
    { name: 'Create', to: '/create-project', isLoggedIn : true},
    { name: 'Projects', to: '/my-projects', isLoggedIn : user},
    { name: 'Repos', to: '/my-repositories', isLoggedIn : user},
    { name: 'About', to: '/about' , isLoggedIn : true},
    { name: 'Blog', to: '/blog' , isLoggedIn : true},
    { name: 'Contact', to: '/contact' , isLoggedIn : true}
  ];

  const { isDarkMode, toggleTheme } = useThemeStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLinks = () => (
    <>
      {pages.map((page, index) => (
        page.isLoggedIn && <ScrollLink 
          key={index} 
          to={page.to} 
          className={`block py-2 lg:py-0 ${isDarkMode ? 'text-white hover:text-neutral-300' : 'text-neutral-900 hover:text-neutral-600'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {page.name}
        </ScrollLink>
      ))}
      {!user && (
        <>
          <ScrollLink 
            to="/login" 
            className={`block py-2 lg:py-0 ${isDarkMode ? 'text-white hover:text-neutral-300' : 'text-neutral-900 hover:text-neutral-600'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </ScrollLink>
          <button 
            className='w-full p-2 px-4 mb-2 font-semibold text-white lg:w-auto bg-neon-yellow rounded-2xl lg:mb-0'
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign Up
          </button>
        </>
      )}
      <div className={`w-[1px] h-12 transition-colors duration-300 ease-in-out bg-neutral-100 ${isDarkMode ? 'bg-neutral-400' : 'bg-neutral-300'}`}></div>
      {user && (
        <>
          <button 
            onClick={() => {
              logout();
              setIsMobileMenuOpen(false);
            }} 
            className='w-full p-2 px-4 mb-2 font-semibold text-white transition-transform duration-300 ease-in-out rounded-full cursor-pointer lg:w-auto hover:scale-105 bg-neon-yellow lg:mb-0'
          >
            Log out
          </button>
          <div className='flex items-center justify-center gap-2 py-2 lg:justify-start lg:py-0'>
            <img 
              src={user.avatar} 
              className='w-8 h-8 border-4 rounded-full border-neutral-900' 
              alt="User Avatar" 
            />
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav 
        className={`
          fixed top-0 left-0 z-50 w-full 
          transition-colors duration-300 ease-in-out 
          ${isDarkMode ? "bg-gray-900 text-white" : "bg-background-light text-neutral-900"}
          hidden lg:flex lg:h-20 lg:justify-evenly lg:items-center
        `}
      >
        <div className='lg:min-w-1/2 lg:h-2/3 lg:flex lg:items-center lg:justify-start'>
          <div className='lg:min-w-2/3 lg:h-full lg:flex lg:items-center lg:justify-center'>
            <ScrollLink to='/'>
              {/* <span className={`text-2xl font-bold`}>CodeCraft</span> */}
              <img src="CodeCraft-logo2.png" className='h-full w-50' alt="" />
            </ScrollLink>
          </div>
        </div>
        <div className='lg:min-w-1/2 lg:h-2/3 lg:flex lg:items-center lg:justify-center'>
          <div className='gap-3 lg:min-w-2/3 lg:h-full lg:flex lg:justify-evenly lg:items-center'>
            <NavLinks />
            <button
              onClick={() => toggleTheme()}
              className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out
                ${isDarkMode ? 'bg-gray-600' : 'bg-neutral-300'}`}
              title="Toggle Dark Mode"
              aria-label="Toggle Dark Mode"
            >
              <span className="sr-only">Toggle Dark Mode</span>
              <div
                className={`absolute w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
              <span 
                className={`absolute left-1 text-xs text-yellow-500 
                  ${isDarkMode ? 'opacity-0' : 'opacity-100'} 
                  transition-opacity duration-300`}
              >
                ☀️
              </span>
              <span 
                className={`absolute right-1 text-xs text-yellow-200 
                  ${isDarkMode ? 'opacity-100' : 'opacity-0'} 
                  transition-opacity duration-300`}
              >
                🌙
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar with Hamburger Menu */}
      <nav 
        className={`
          fixed top-0 left-0 z-50 w-full 
          transition-colors duration-300 ease-in-out 
          ${isDarkMode ? "bg-gray-900 text-white" : "bg-background-light text-neutral-900"}
          lg:hidden h-16 flex items-center justify-between px-4
        `}
      >
        <ScrollLink to='/'>
          <img src="CodeCraft-logo2.png" className='h-full w-30' alt="" />
        </ScrollLink>
        
        <div className='flex items-center gap-4'>
          <button
            onClick={() => toggleTheme()}
            className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out
              ${isDarkMode ? 'bg-gray-600' : 'bg-neutral-300'}`}
            title="Toggle Dark Mode"
            aria-label="Toggle Dark Mode"
          >
            <span className="sr-only">Toggle Dark Mode</span>
            <div
              className={`absolute w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
                isDarkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
            <span 
              className={`absolute left-1 text-xs text-yellow-500 
                ${isDarkMode ? 'opacity-0' : 'opacity-100'} 
                transition-opacity duration-300`}
            >
              ☀️
            </span>
            <span 
              className={`absolute right-1 text-xs text-yellow-200 
                ${isDarkMode ? 'opacity-100' : 'opacity-0'} 
                transition-opacity duration-300`}
            >
              🌙
            </span>
          </button>

          <button 
            onClick={toggleMobileMenu} 
            className="focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div 
        className={`
          fixed top-16 left-0 w-full h-[calc(100vh-4rem)] 
          transition-transform duration-300 ease-in-out 
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          z-40 lg:hidden overflow-y-auto p-4 pt-6
        `}
      >
        <div className='flex flex-col space-y-4'>
          <NavLinks />
        </div>
      </div>
    </>
  );
};

export default Navbar;