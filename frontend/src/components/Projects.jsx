import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe2Icon, GlobeIcon } from "lucide-react";

const Projects = ({activeTheme}) => {

  const projects = [
    {
        name: "Archweb",
        description: "An e-commerce platform for architecture services such as Interior & Exterior Design, Floor Plans, and 3D Renderings.",
        techStack: [
            {
                name: "React",
                svg: "/logo svgs/react.svg",
                desc: "Used for its component-based structure and efficient rendering with Virtual DOM, making the UI interactive and performant."
            },
            {
                name: "Node.js",
                svg: "/logo svgs/nodejs-2.svg",
                desc: "Chosen for its event-driven, non-blocking architecture, allowing efficient handling of concurrent requests."
            },
            {
                name: "MongoDB",
                svg: "/logo svgs/mongodb.svg",
                desc: "A NoSQL database ideal for flexible, schema-less storage of user data, services, and orders."
            },
            {
                name: "Express",
                svg: "/logo svgs/express-109.svg",
                desc: "Used to create RESTful APIs efficiently, handling routing and middleware."
            },
            {
                name: "SASS",
                svg: "/public/logo svgs/sass-1.svg",
                desc: "Chosen for its advanced styling features, including variables and mixins, improving maintainability."
            },
        ],
        category: "E-Commerce",
        features: [
            { featureName: "Payment Integration", tool: "Payfast Payment", reason: "Supports local South African transactions securely." },
            { featureName: "Authentication", tool: "JSON Web Token (JWT)", reason: "Provides stateless authentication, making it scalable and secure." },
            { featureName: "CRUD operations", tool: "Axios & MongoDB", reason: "Axios ensures efficient API requests, and MongoDB allows flexible data storage." },
            { featureName: "Email integration", tool: "MailTrap", reason: "Allows testing email functionality without sending real emails to users." },
            { featureName: "JSON Web Token", tool: "MailTrap", reason: "Allows testing email functionality without sending real emails to users." },
            { featureName: "Global State Management", tool: "MailTrap", reason: "Allows testing email functionality without sending real emails to users." }
        ],
        liveDemo: "https://archweb.co.za",
        githubRepo: "https://github.com/yourusername/archweb",
        thumbnail: "/projectScreenshots/archweb-highres.webp",
        releaseDate: "2024-12-01"
    },
    {
        name: "Pug & Co",
        description: "An online bakery website for Pug & Co, allowing customers to browse and order baked goods with an interactive UI.",
        techStack: [
            {
                name: "Tailwind CSS",
                svg: "/logo svgs/tailwind-css.svg",
                desc: "Used for its utility-first styling approach, enabling rapid UI development with minimal CSS."
            },
            {
                name: "JWT",
                svg: "/logo svgs/jwt.svg",
                desc: "Used for secure authentication and authorization of users."
            },
            {
                name: "MySQL",
                svg: "/logo svgs/mysql-3.svg",
                desc: "Chosen for its structured relational database model, ensuring reliable transactions and queries."
            },
        ],
        category: "E-Commerce",
        features: [
            { featureName: "Payment Integration", tool: "Payfast Payment", reason: "Provides local payment processing for South African customers." },
            { featureName: "Authentication", tool: "Firebase Auth", reason: "Ensures secure and easy authentication with Google and email logins." },
            { featureName: "CMS for products", tool: "Sanity.io", reason: "Headless CMS that allows easy management of bakery products without code changes." },
            { featureName: "Order Management", tool: "Firestore", reason: "NoSQL database for real-time updates on orders and inventory." }
        ],
        liveDemo: "https://pugandco.co.za",
        githubRepo: "https://github.com/yourusername/pugandco",
        thumbnail: "/projectScreenshots/pug&co-highres.webp",
        releaseDate: "2025-02-10"
    },
    {
        name: "Hotel Management System",
        description: "A web-based hotel management system for booking, check-ins, and customer management.",
        techStack: [
            {
                name: "Tailwind CSS",
                svg: "/logo svgs/tailwind-css.svg",
                desc: "Ensures fast and consistent styling for the dashboard interface."
            },
            {
                name: "JWT",
                svg: "/logo svgs/jwt.svg",
                desc: "Used for secure authentication and session management."
            },
            {
                name: "MySQL",
                svg: "/logo svgs/mysql-3.svg",
                desc: "Chosen for its structured and scalable database for managing hotel bookings and users."
            },
        ],
        category: "SaaS",
        features: [
            { featureName: "Booking System", tool: "React Calendar", reason: "Provides a smooth and interactive calendar UI for booking rooms." },
            { featureName: "Authentication", tool: "Django Auth", reason: "Offers a secure authentication system built into Django." },
            { featureName: "CRUD operations", tool: "Django ORM", reason: "Allows efficient querying and management of hotel records with Python." },
            { featureName: "Admin Dashboard", tool: "React Admin", reason: "Provides a pre-built admin interface for managing hotel operations." }
        ],
        liveDemo: "https://hotelmanagementsystem.com",
        githubRepo: "https://github.com/yourusername/hotel-management",
        thumbnail: "/projectScreenshots/hotel-management-highres.webp",
        releaseDate: "2024-11-15"
    },
    {
        name: "Ticket Manager",
        description: "A ticketing system for handling customer support and issue tracking.",
        techStack: [
            {
                name: "Vue.js",
                svg: "/logo svgs/vue.svg",
                desc: "Selected for its reactivity and easy-to-learn framework for UI components."
            },
            {
                name: "Firebase",
                svg: "/logo svgs/firebase.svg",
                desc: "Used for real-time database and authentication."
            },
            {
                name: "Node.js",
                svg: "/logo svgs/nodejs-2.svg",
                desc: "Handles backend API requests efficiently."
            },
        ],
        category: "SaaS",
        features: [
            { featureName: "Live Ticket Updates", tool: "WebSockets", reason: "Ensures real-time updates on ticket status." },
            { featureName: "Authentication", tool: "Firebase Auth", reason: "Provides seamless authentication across different devices." },
            { featureName: "Email Notifications", tool: "SendGrid", reason: "Automates email alerts for new ticket updates." },
            { featureName: "Role-Based Access", tool: "Firebase Rules", reason: "Restricts access based on user roles to improve security." }
        ],
        liveDemo: "https://ticketmanager.com",
        githubRepo: "https://github.com/yourusername/ticket-manager",
        thumbnail: "/projectScreenshots/ticket-manager-highres.webp",
        releaseDate: "2024-10-20"
    },
    {
        name: "Finance Calculator",
        description: "A web app that provides financial insights, loan calculations, and investment projections.",
        techStack: [
            {
                name: "React",
                svg: "/logo svgs/react.svg",
                desc: "Enables a dynamic and fast UI for financial calculations."
            },
            {
                name: "TypeScript",
                svg: "/logo svgs/typescript.svg",
                desc: "Ensures type safety and prevents runtime errors in calculations."
            },
            {
                name: "Chart.js",
                svg: "/logo svgs/chartjs.svg",
                desc: "Used for data visualization, making financial trends easier to understand."
            },
        ],
        category: "Finance Tool",
        features: [
            { featureName: "Loan Calculator", tool: "Custom Formula", reason: "Provides accurate and flexible loan repayment calculations." },
            { featureName: "Data Visualization", tool: "Chart.js", reason: "Offers interactive charts to display financial insights." },
            { featureName: "Real-Time Currency Exchange", tool: "Exchange API", reason: "Fetches live currency exchange rates for accurate projections." },
            { featureName: "User Authentication", tool: "Firebase Auth", reason: "Enables secure user logins for personalized financial tracking." }
        ],
        liveDemo: "https://financecalculator.com",
        githubRepo: "https://github.com/yourusername/finance-calculator",
        thumbnail: "/public/projectScreenshots/finance-calculator-highres.webp",
        releaseDate: "2025-01-05"
    }
];

const skills = [
    {
      "name": "React.js",
      "logo_video_url": "https://yourcdn.com/videos/react-logo.mp4",
      "description": "A JavaScript library for building fast and interactive user interfaces.",
      "purpose": "Used for developing component-based web applications with reusable UI elements.",
      "use_cases": [
        "Single Page Applications (SPAs)",
        "Progressive Web Apps (PWAs)",
        "Enterprise Web Applications",
        "Interactive Dashboards"
      ],
      "history": {
        "created_by": "Facebook (Meta)",
        "release_year": 2013,
        "notable_versions": [
          { "version": "16.8", "feature": "Hooks introduced (2019)" },
          { "version": "17.0", "feature": "Improved rendering (2020)" },
          { "version": "18.0", "feature": "Concurrent Rendering (2022)" }
        ]
      },
      "key_features": [
        "Virtual DOM for fast updates",
        "Component-based architecture",
        "Server-side rendering with Next.js",
        "Rich ecosystem with Redux, Zustand"
      ],
      "your_experience": "Used React.js in multiple projects including e-commerce, portfolio, and WebRadar. Experience with Next.js and state management libraries.",
      "related_technologies": ["JavaScript", "Next.js", "Redux", "Tailwind CSS"]
    },
    {
      "name": "SCSS/SASS",
      "logo_video_url": "https://yourcdn.com/videos/scss-logo.mp4",
      "description": "A CSS preprocessor that adds variables, nesting, and mixins for more maintainable stylesheets.",
      "purpose": "Enhances CSS with powerful features to improve styling efficiency and reusability.",
      "use_cases": [
        "Reusable and scalable CSS architecture",
        "Theming for web applications",
        "Optimized styling for large-scale projects",
        "Faster development with variables and mixins"
      ],
      "history": {
        "created_by": "Hampton Catlin",
        "release_year": 2006,
        "notable_versions": [
          { "version": "3.0", "feature": "SASS to SCSS syntax (2010)" },
          { "version": "3.3", "feature": "Source maps support (2014)" }
        ]
      },
      "key_features": [
        "Variables for consistent styling",
        "Nesting for cleaner code",
        "Mixins for reusable styles",
        "Partials for modular CSS"
      ],
      "your_experience": "Used SCSS in multiple projects for modular styling and theming, including e-commerce and portfolio websites.",
      "related_technologies": ["CSS3", "Tailwind CSS", "Bootstrap"]
    },
    {
      "name": "MongoDB",
      "logo_video_url": "https://yourcdn.com/videos/mongodb-logo.mp4",
      "description": "A NoSQL database designed for scalability and flexibility.",
      "purpose": "Stores and manages large amounts of data in a flexible, JSON-like format.",
      "use_cases": [
        "E-commerce platforms",
        "Real-time applications",
        "Content management systems",
        "Big data storage"
      ],
      "history": {
        "created_by": "MongoDB Inc.",
        "release_year": 2009,
        "notable_versions": [
          { "version": "3.6", "feature": "Change streams (2017)" },
          { "version": "4.0", "feature": "Multi-document transactions (2018)" },
          { "version": "5.0", "feature": "Time-series collections (2021)" }
        ]
      },
      "key_features": [
        "Document-based storage",
        "Schema flexibility",
        "Horizontal scaling",
        "Aggregation framework"
      ],
      "your_experience": "Used MongoDB for database management in MERN stack projects, including e-commerce and WebRadar.",
      "related_technologies": ["Mongoose", "Node.js", "Express.js"]
    }
  ]

  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [currentFeature, setCurrentFeature] = useState(projects[0].features[0]);
  const [currentTech, setCurrentTech] = useState(projects[0].techStack[0]);
  const [currentIndex, setCurrentIndex] = useState(1); 

  const setCurrentProjectData = (project, index, feature, tech) => {
    setCurrentIndex(index + 1);
    setCurrentProject(project);
    setCurrentFeature(feature);
    setCurrentTech(tech);
  }

  return (
    <div className={`min-h-screen w-full flex justify-evenly items-center ${activeTheme.background}`}>
              <motion.div initial={{opacity:0, x: -100}} whileInView={{opacity:1, x:0}} transition={{duration:0.8, ease: "easeInOut", type:"spring", type:"spring"}} className={`w-1/4 relative min-h-full pt-20 ${activeTheme.accentLight} shadow-md rounded-2xl flex justify-between items-center flex-col`}>
              <h1 className="absolute top-5 text-neutral-200 font-bold text-3xl">PROJECTS</h1>
              <div className={`h-screen w-full ${activeTheme.elements} shadow-md rounded-2xl flex justify-between items-center flex-col`}>
              {projects.map((project, index) => (
                <motion.div initial={{opacity:0, x: -100}} whileInView={{opacity:1, x:0}} transition={{duration:0.3, ease: "easeInOut", type:"spring"}} key={index} className={`h-1/5 w-19/20 my-3 text-neutral-700  flex justify-center transition-all rounded-2xl ease-in-out font-bold duration-700 hover:duration-300 hover:shadow-md hover:shadow-neutral-400 cursor-pointer  ${project.name === currentProject?.name ? `h-8/10 pt-10 shadow-gray-400 shadow-lg border:none ${activeTheme.activeText} flex-col justify-evenly items-center bg-neutral-300` : "border-1 border-gray-300  hover:border-none h-5/20 justify-center items-center"}`} onClick={() => setCurrentProjectData(project, index, project?.features[0], project?.techStack[0])}>
                  {project.name}
                  <img src={project.thumbnail} className={`w-full h-9/10 top-0 p-3 rounded-3xl transition-all ease-in-out duration-75"  ${currentProject.name === project.name ? "opacity-100" : "opacity-0 hidden"}`} />
                </motion.div>
              ))}
              </div>
              </motion.div>
              <div className={`w-3/4 min-h-full ${activeTheme.elements} shadow-md rounded-xl flex justify-center`}>
              <div className="overflow-hidden w-full p-3 mx-1 max-h-1/1 shadow-2xl rounded-2xl bg-sci-fi-theme flex flex-col justify-between items-center">
                <div className="w-full min-h-40 flex flex-col justify-between items-center">
                <div className="w-full p-3 h-15 rounded-xl shadow-md shadow-neutral-400 bg-sci-fi-theme flex justify-between items-center">
                <div className="size-6 rounded-full border-3 border-neutral-700 flex justify-center items-center">
                  <span className=" transition-all text-neutral-700 font-bold">{currentIndex}</span>
                </div>
                <span className={`transition-all ${activeTheme.activeText} font-bold`}>{currentProject.name}</span>
                <span className="text-neutral-700 font-bold">{currentProject.releaseDate}</span>
              </div>
              <div className="w-full p-3 min-h-15 rounded-xl mt-10 shadow-neutral-400 bg-sci-fi-theme flex justify-between items-center">
                <p className="text-neutral-700 pt-5">{currentProject.description}</p>
              </div>
              <motion.div initial={{opacity:0, y: -100}} whileInView={{opacity:1, y:0}} transition={{duration:0.6, ease: "easeInOut", type:"spring"}} className="w-full gap-5 min-h-15 rounded-xl mt-10  bg-sci-fi-theme flex justify-evenly items-center">
                <Link to={currentProject.liveDemo} className="w-1/2 hover:scale-105 transition-all duration-300 ease-in-out h-15 flex justify-evenly items-center shadow-neutral-400 shadow-md rounded-2xl"><span className={`${activeTheme.activeText}`}>Project Link</span><GlobeIcon className="text-black"/></Link>
                <Link to={currentProject.githubRepo} className="w-1/2 hover:scale-105 transition-all duration-300 ease-in-out h-15 flex justify-evenly items-center shadow-neutral-400 shadow-md rounded-2xl"><span className={`${activeTheme.activeText}`}>Github Repo</span><img  src="../../../public/iconmonstr-github-1.svg" alt="" /></Link>
              </motion.div>
    
                </div>
              <div className={`w-full min-h-30 mt-5 flex flex-col justify-between ${activeTheme.elements}  border-0 border-gray-100 items-center rounded-2xl`}>
              <h2 className="text-lg font-bold text-gray-800">Key Features:</h2>
              <div className="w-full h-25 grid grid-cols-4 gap-8 p-4">
                {currentProject.features?.map((feature, index) => (<div onClick={() => setCurrentFeature(feature)} key={index} className={`h-full w-1/5 transition-colors duration-300 ease-in-out ${activeTheme.text} cursor-pointer ${currentFeature.featureName === feature.featureName ? activeTheme.activeText : "text-gray-800"}`}><h2>{feature.featureName}</h2></div>))}
              </div>
              </div>
              
              <div className={`rounded-xl shadow-md w-full min-h-20 mt-5 pt-10 flex flex-col justify-between ${activeTheme.elements}  border-0 border-gray-100 items-center rounded-2xl`}>
              <h2 className="text-lg font-bold text-gray-800">Tech Stack:</h2>
              <div className="w-full h-60 flex justify-evenly items-center">
                {currentProject.techStack?.map((tech, index) => (<div onClick={() => setCurrentTech(tech)} key={index} className={`min-h-50 mt-10 p-5 w-1/5 transition-colors duration-300 ease-in-out ${activeTheme.text} cursor-pointer flex flex-col justify-evenly items-center relative ${currentTech.name === tech.name ? activeTheme.activeText : "text-gray-800"}`}> <img className="w-full rounded-full h-auto hover:scale-120 opacity-65 hover:opacity-100 transition-all ease-in-out duration-300" src={tech.svg} alt="" /><h2 className="absolute bottom-5">{tech.name}</h2></div>))}
              </div>
              
              </div>
              </div>
              
              <motion.div initial={{opacity:0, y: -100}} whileInView={{opacity:1, y:0}} transition={{duration:0.8, ease: "easeInOut", type:"spring"}} className="relative w-full min-h-15 m-3 p-3 h-[97%] rounded-xl shadow-md shadow-neutral-400 bg-sci-fi-theme flex justify-center items-center">
                <div className="absolute top-2 w-7/8 h-8 flex items-center justify-center">
                  <h1 className={`text-2xl font-bold ${activeTheme.activeText}`}>{currentFeature.featureName}</h1>
                </div>
              </motion.div>
              </div>
            </div>
  )
}

export default Projects
