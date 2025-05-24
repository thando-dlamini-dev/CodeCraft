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
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Heading */}
        <div className='w-full sm:w-11/12 md:w-4/5 lg:w-3/5 mt-10 md:mt-16 lg:mt-20'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-neon-yellow'>Get a Custom App Idea Based on Your Skills</h1>
        </div>

        {/* Subheading */}
        <div className='w-full sm:w-11/12 md:w-4/5 lg:w-3/5 mt-6 md:mt-8'>
          <p className='text-center text-sm md:text-base'>Tell us what you know, what you love, and how long you have. We'll recommend a project, tech stack, and deadline tailored just for you.</p>
        </div>

        {/* Action buttons */}
        <div className='w-full flex justify-center my-6 md:my-8'>
          {!user && 
            <Link
              to="/login"
              className="w-40 hover:scale-105 transition-transform duration-300 ease-in-out rounded-full py-2 text-white bg-black flex items-center justify-center">
              Log In
            </Link>
          }
          {user && 
            <Link
              to="/create-project"
              className="min-w-40 px-3 py-2 text-white bg-black hover:scale-105 transition-transform duration-300 ease-in-out rounded-full border border-black flex items-center justify-between">
              Create App Idea<ArrowRight className="ml-2" size={16} />
            </Link>
          }
        </div>

        {/* Feature cards */}
        <div className='w-full lg:w-1/2 md:w-full mt-8 md:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6'>
          {/* Card 1 */}
          <div className='p-4 md:p-5 border-2 border-neutral-100 bg-element rounded-xl md:rounded-2xl lg:rounded-4xl flex flex-col items-start justify-start text-start'>
            <LightbulbIcon className='my-3 size-8 rounded-sm text-neon-yellow p-1'/>
            <h2 className='text-lg font-semibold text-neutral-700'>Personalized Project Ideas</h2>
            <p className='text-neutral-600 pt-4 text-sm'>Get web app suggestions based on your current skills and experience level.</p>
          </div>

          {/* Card 2 */}
          <div className='p-4 md:p-5 border-2 border-neutral-100 bg-element rounded-xl md:rounded-2xl lg:rounded-4xl flex flex-col items-start justify-start text-start'>
            <CpuIcon className='my-3 size-8 rounded-sm text-neon-yellow p-1'/>
            <h2 className='text-lg font-semibold text-neutral-700'>AI-Recommended Tech Stack</h2>
            <p className='text-neutral-600 pt-4 text-sm'>Receive tech stack and difficulty estimations that match your capabilities.</p>
          </div>

          {/* Card 3 */}
          <div className='p-4 md:p-5 border-2 border-neutral-100 bg-element rounded-xl md:rounded-2xl lg:rounded-4xl flex flex-col items-start justify-start text-start'>
            <CalendarCheck className='my-3 size-8 rounded-sm text-neon-yellow p-1'/>
            <h2 className='text-lg font-semibold text-neutral-700'>Built-In Accountability</h2>
            <p className='text-neutral-600 pt-4 text-sm'>Set deadlines, auto-create GitHub repos, and stay on track with friendly reminders.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;