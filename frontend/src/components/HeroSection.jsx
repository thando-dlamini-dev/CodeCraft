import React from 'react';
import { ArrowRight, CalendarCheck, CpuIcon, LightbulbIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from '../stores/authStore';
import useThemeStore from '../stores/themeStore';

const HeroSection = () => {
  const { user } = useAuthStore();
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`w-full transition-colors duration-300 ease-in-out py-8 md:py-12 lg:py-16 ${isDarkMode ? "bg-gray-900 text-white" : "bg-background-light text-neutral-900"}`}>
      <div className="container flex flex-col items-center px-4 mx-auto">
        {/* Heading */}
        <div className='w-full mt-10 sm:w-11/12 md:w-4/5 lg:w-3/5 md:mt-16 lg:mt-20'>
          <h1 className='text-3xl font-semibold text-center sm:text-4xl md:text-5xl text-neon-yellow'>Get a Custom App Idea Based on Your Skills</h1>
        </div>

        {/* Subheading */}
        <div className='w-full mt-6 sm:w-11/12 md:w-4/5 lg:w-3/5 md:mt-8'>
          <p className='text-sm text-center md:text-base'>Tell us what you know, what you love, and how long you have. We'll recommend a project, tech stack, and deadline tailored just for you.</p>
        </div>

        {/* Action buttons */}
        <div className='flex justify-center w-full my-6 md:my-8'>
          {!user && 
            <Link
              to="/login"
              className="flex items-center justify-center w-40 py-2 text-white transition-transform duration-300 ease-in-out bg-black rounded-full hover:scale-105">
              Log In
            </Link>
          }
          {user && 
            <Link
              to="/create-project"
              className="flex items-center justify-between px-3 py-2 text-white transition-transform duration-300 ease-in-out bg-black border border-black rounded-full min-w-40 hover:scale-105">
              Create App Idea<ArrowRight className="ml-2" size={16} />
            </Link>
          }
        </div>

        {/* Feature cards */}
        <div className='grid w-full grid-cols-1 gap-6 mt-8 lg:w-1/2 md:w-full md:mt-12 lg:mt-16 md:grid-cols-3 md:gap-4 lg:gap-6'>
          {/* Card 1 */}
          <div className={`p-4 md:p-5 border-2 border-neutral-100 bg-element rounded-xl md:rounded-2xl lg:rounded-4xl flex flex-col items-start justify-start text-start ${isDarkMode ? "bg-gray-800 border-neutral-500 text-white" : "bg-element text-neutral-700"}`}>
            <LightbulbIcon className='p-1 my-3 rounded-sm size-8 text-neon-yellow'/>
            <h2 className='text-lg font-semibold '>Personalized Project Ideas</h2>
            <p className='pt-4 text-sm '>Get web app suggestions based on your current skills and experience level.</p>
          </div>

          {/* Card 2 */}
          <div className={`p-4 md:p-5 border-2 border-neutral-100 bg-element rounded-xl md:rounded-2xl lg:rounded-4xl flex flex-col items-start justify-start text-start ${isDarkMode ? "bg-gray-800 border-neutral-500 text-white" : "bg-element text-neutral-700"}`}>
            <CpuIcon className='p-1 my-3 rounded-sm size-8 text-neon-yellow'/>
            <h2 className='text-lg font-semibold '>AI-Recommended Tech Stack</h2>
            <p className='pt-4 text-sm '>Receive tech stack and difficulty estimations that match your capabilities.</p>
          </div>

          {/* Card 3 */}
          <div className={`p-4 md:p-5 border-2 border-neutral-100 bg-element rounded-xl md:rounded-2xl lg:rounded-4xl flex flex-col items-start justify-start text-start ${isDarkMode ? "bg-gray-800 border-neutral-500 text-white" : "bg-element text-neutral-700"}`}>
            <CalendarCheck className='p-1 my-3 rounded-sm size-8 text-neon-yellow'/>
            <h2 className='text-lg font-semibold '>Built-In Accountability</h2>
            <p className='pt-4 text-sm '>Set deadlines, auto-create GitHub repos, and stay on track with friendly reminders.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;