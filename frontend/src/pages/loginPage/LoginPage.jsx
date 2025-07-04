import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import useAuthStore from "../../stores/authStore.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  const { loginWithGitHub } = useAuthStore();

  return (
    <>
    <motion.div 
    variants={pageVariants} 
    initial="initial" 
    animate="animate" 
    exit="exit" 
    transition={{ duration: 0.2, ease: "easeInOut" }} className='lg:pt-20 lg:w-screen lg:h-screen lg:flex lg:items-center lg:justify-center bg-background-light'>
      <div className='w-1/3 h-4/5 lg:flex-col lg:flex lg:items-center lg:justify-start gap-4'>
      <h1 className='text-2xl font-semibold text-neutral-700'>Sign in to your account</h1>
      <div className='w-1/2 h-5 flex items-center justify-evenly'>
      <p className='text-neutral-700'>Don't have an account?</p>
      <p className='text-neon-yellow cursor-pointer'>Sign up</p>
      </div>
      <button 
        onClick={() => loginWithGitHub()}
        className='hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out w-2/3 mt-4 border-solid border-1 border-neutral-400 h-9 rounded-md flex items-center justify-center relative'
      >
        <span className='text-neutral-700'>Sign in with Github</span>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" className='w-6 h-6 absolute left-2' alt="" />
      </button>
      <div className='w-2/3 my-4 h-[1px] bg-neutral-300'></div>
      <input 
        type="email" 
        name="email" id='email' 
        placeholder='Email' 
        className='w-2/3 px-3 border-solid border-1 text-neutral-700 border-neutral-400 h-11 rounded-md' 
      >
      </input>
      <input 
        type="password" 
        name="password" 
        id='password' 
        placeholder='Password' 
        className='w-2/3 mt-4 px-3 border-solid border-1 text-neutral-700 border-neutral-400 h-11 rounded-md' 
      >
      </input>
      <div className='w-2/3 mt-[-4px] h-5 flex items-center justify-end'><Link to="/forgot-pass"><span className='text-xs text-neutral-700 hover:text-neon-yellow transition-colors duration-300 ease-in-out'>Forgot password?</span></Link></div>
      <button className='w-2/3 mt-4 px-3 text-neutral-900 font-semibold bg-neon-yellow h-11 rounded-md hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'>Sign In</button>
      </div>
    </motion.div>
    </>
  )
}

export default LoginPage;
