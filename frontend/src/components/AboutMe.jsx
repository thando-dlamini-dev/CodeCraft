import React, { useEffect, useState } from 'react';
import { useThemeStore } from "../stores/useThemeStore.js";
import { AnimatePresence, motion } from "framer-motion"
import * as LucideIcons from "lucide-react";
import { BriefcaseBusiness, Code2Icon, CogIcon, LineChartIcon, MailCheckIcon, MailPlusIcon, MoreHorizontalIcon, Settings2Icon } from 'lucide-react';

const AboutMe = () => {

  const {activeTheme} = useThemeStore();

  useEffect(() => {
    const interval = setInterval(() => setReAnimate(true), 100);
    return () => clearInterval(interval);
  },[])

  let IconComponent = null;

  const tabs = [
    {
      name: "Experience",
      id: "experience",
      icon: "briefcase",
      divCount: 2,
      description: "Work history and projects completed",
      key_responsibilities: [
        {
          text: "Designed and implemented scalable front-end architectures integrated with Azure-based backends.",
          icon: "LayoutPanelTop"
        },
        {
          text: "Collaborated with UX/UI designers to create intuitive and visually appealing UIs.",
          icon: "Palette"
        },
        {
          text: "Optimized performance for fast load times and smooth user experiences.",
          icon: "LineChart"
        },
        {
          text: "Integrated RESTful APIs, WebSockets, and GraphQL for seamless data communication.",
          icon: "Share"
        },
        {
          text: "Leveraged Azure services including App Services, Functions, API Management, and DevOps pipelines.",
          icon: "CloudCog"
        },
        {
          text: "Ensured responsive, accessible, and cross-browser compatible interfaces.",
          icon: "MonitorSmartphone"
        },
        {
          text: "Wrote clean, reusable code using best practices and modern design patterns.",
          icon: "Code2"
        },
        {
          text: "Performed debugging, code reviews, and performance tuning for production-level codebases.",
          icon: "Bug"
        },
        {
          text: "Stayed current with Angular, Azure, and front-end technologies.",
          icon: "Radar"
        },
        {
          text: "Collaborated with back-end and cloud engineers (or simulated team workflows solo) to deliver full-stack applications.",
          icon: "Users"
        }
      ]
      ,
      experiences: [
        {
          role: "Full-Stack Developer",
          company: "Freelance",
          duration: "2023 - Present",
          description: "Developed and deployed MERN stack applications, integrated with Azure cloud services for backend and cloud deployment. Focused on building responsive, high-performance web applications.",
          key_projects: [
            {
              name: "ArchWeb",
              description: "An architectural services e-commerce website with real-time price estimation and payment integration.",
              technologies: ["React.js", "Node.js", "MongoDB", "Cloudinary", "PayFast", "Azure"],
            },
            {
              name: "WebRadar",
              description: "An automation tool for finding businesses without websites and generating outreach emails.",
              technologies: ["Next.js", "MongoDB", "OpenAI API", "Mailtrap", "Azure"],
            },
          ],
        },
      ],
    },    
    {
      name: "Skills",
      id: "skills",
      icon: "code",
      divCount: 3,
      description: "Technical and soft skills acquired",
      skills:[
        {
          name: "React.js",
          category: "Frontend",
          img: "https://yourcdn.com/videos/react-logo.mp4",
          description: "A JavaScript library for building fast and interactive user interfaces.",
          purpose: "Used for developing component-based web applications with reusable UI elements.",
          svg: "/public/logo svgs/react.svg",
          use_cases: [
            "Single Page Applications (SPAs)",
            "Progressive Web Apps (PWAs)",
            "Enterprise Web Applications",
            "Interactive Dashboards",
          ],
          history: {
            created_by: "Facebook (Meta)",
            release_year: 2013,
            notable_versions: [
              { version: "16.8", feature: "Hooks introduced (2019)" },
              { version: "17.0", feature: "Improved rendering (2020)" },
              { version: "18.0", feature: "Concurrent Rendering (2022)" },
            ],
          },
          key_features: [
            "Virtual DOM for fast updates",
            "Component-based architecture",
            "Server-side rendering with Next.js",
            "Rich ecosystem with Redux, Zustand",
          ],
          your_experience: "Used React.js in multiple projects including e-commerce, portfolio, and WebRadar. Experience with Next.js and state management libraries.",
          related_technologies: ["JavaScript", "Next.js", "Redux", "Tailwind CSS"],
        },
        {
          name: "JavaScript",
          category: "Programming Language",
          img: "https://yourcdn.com/videos/javascript-logo.mp4",
          description: "A versatile programming language used for web development.",
          purpose: "Enables interactive and dynamic web applications.",
          svg: "/public/logo svgs/javascript-2.svg",
          use_cases: [
            "Web development",
            "Mobile app development",
            "Backend services with Node.js",
            "Game development",
          ],
          history: {
            created_by: "Brendan Eich",
            release_year: 1995,
            notable_versions: [
              { version: "ES6", feature: "Arrow functions, classes, modules (2015)" },
              { version: "ES2020", feature: "Optional chaining, BigInt" },
            ],
          },
          key_features: [
            "Event-driven programming",
            "Asynchronous capabilities with Promises and Async/Await",
            "Prototypal inheritance",
            "Runs in the browser and on servers (Node.js)",
          ],
          your_experience: "Used JavaScript in frontend and backend projects, including SPAs and REST APIs.",
          related_technologies: ["React.js", "Node.js", "TypeScript"],
        },
        {
          name: "Node.js",
          category: "Backend",
          img: "https://yourcdn.com/videos/nodejs-logo.mp4",
          description: "A runtime environment for executing JavaScript code outside the browser.",
          purpose: "Allows building scalable network applications using JavaScript.",
          svg: "/public/logo svgs/nodejs-2.svg",
          use_cases: [
            "RESTful APIs",
            "Real-time applications (chat, gaming)",
            "Microservices architecture",
            "Server-side rendering",
          ],
          history: {
            created_by: "Ryan Dahl",
            release_year: 2009,
            notable_versions: [
              { version: "14.x", feature: "Async local storage (2020)" },
              { version: "16.x", feature: "Apple Silicon support (2021)" },
            ],
          },
          key_features: [
            "Event-driven architecture",
            "Non-blocking I/O model",
            "NPM ecosystem",
            "Fast execution with V8 engine",
          ],
          your_experience: "Used Node.js for backend development in MERN stack projects.",
          related_technologies: ["Express.js", "MongoDB", "MySQL"],
        },
        {
          name: "Express.js",
          category: "Backend",
          img: "https://yourcdn.com/videos/express-logo.mp4",
          description: "A fast, minimalist web framework for Node.js.",
          purpose: "Simplifies backend development by providing middleware and routing.",
          svg: "/public/logo svgs/express-109.svg",
          use_cases: [
            "Building RESTful APIs",
            "Handling HTTP requests and responses",
            "Server-side rendering",
            "Middleware-driven applications",
          ],
          key_features: [
            "Lightweight and fast",
            "Middleware support",
            "Flexible routing",
            "Integration with databases",
          ],
          your_experience: "Used Express.js for API development in e-commerce and automation projects.",
          related_technologies: ["Node.js", "MongoDB", "MySQL"],
        },
        {
          name: "MongoDB",
          category: "Database",
          img: "https://yourcdn.com/videos/mongodb-logo.mp4",
          description: "A NoSQL database designed for scalability and flexibility.",
          purpose: "Stores and manages large amounts of data in a flexible, JSON-like format.",
          svg: "/public/logo svgs/mongodb.svg",
          use_cases: [
            "E-commerce platforms",
            "Real-time applications",
            "Content management systems",
            "Big data storage",
          ],
          key_features: [
            "Document-based storage",
            "Schema flexibility",
            "Horizontal scaling",
            "Aggregation framework",
          ],
          your_experience: "Used MongoDB in MERN stack projects for handling user data and transactions.",
          related_technologies: ["Mongoose", "Node.js", "Express.js"],
        },
        {
          name: "MySQL",
          category: "Database",
          img: "https://yourcdn.com/videos/mysql-logo.mp4",
          description: "A popular relational database management system (RDBMS).",
          purpose: "Stores structured data using SQL queries for manipulation and retrieval.",
          svg: "/public/logo svgs/mysql-3.svg",
          use_cases: [
            "E-commerce databases",
            "Financial applications",
            "Enterprise applications",
            "CMS platforms",
          ],
          key_features: [
            "Structured query language (SQL)",
            "ACID compliance",
            "Stored procedures and triggers",
            "Scalability for large applications",
          ],
          your_experience: "Used MySQL for structured data storage in several projects.",
          related_technologies: ["PHP", "Node.js", "GraphQL"],
        },
        {
          name: "CSS",
          category: "Styling",
          img: "https://yourcdn.com/videos/css-logo.mp4",
          description: "A stylesheet language used for describing the presentation of web pages.",
          purpose: "Defines layout, colors, fonts, and animations for websites.",
          svg: "/public/logo svgs/css-3.svg",
          use_cases: ["Web design", "Theming", "Animations", "Responsive design"],
          key_features: [
            "Selectors and specificity",
            "Flexbox and Grid",
            "CSS animations",
            "Responsive design techniques",
          ],
          your_experience: "Used CSS extensively for styling web applications and responsive designs.",
          related_technologies: ["SCSS", "Tailwind CSS", "Bootstrap"],
        },
        {
          name: "SCSS/SASS",
          category: "Styling",
          img: "https://yourcdn.com/videos/scss-logo.mp4",
          description: "A CSS preprocessor that adds variables, nesting, and mixins for more maintainable stylesheets.",
          purpose: "Enhances CSS with powerful features to improve styling efficiency and reusability.",
          svg: "/public/logo svgs/sass-1.svg",
          use_cases: [
            "Reusable and scalable CSS architecture",
            "Theming for web applications",
            "Optimized styling for large-scale projects",
            "Faster development with variables and mixins",
          ],
          key_features: [
            "Variables for consistent styling",
            "Nesting for cleaner code",
            "Mixins for reusable styles",
            "Partials for modular CSS",
          ],
          your_experience: "Used SCSS in multiple projects for modular styling and theming.",
          related_technologies: ["CSS3", "Tailwind CSS", "Bootstrap"],
        },
        {
          name: "Tailwind CSS",
          category: "Styling",
          img: "https://yourcdn.com/videos/tailwind-logo.mp4",
          description: "A utility-first CSS framework for rapid UI development.",
          purpose: "Enables fast styling without writing custom CSS.",
          svg: "/public/logo svgs/tailwind-css.svg",
          use_cases: ["Modern web applications", "Design systems", "Rapid prototyping"],
          key_features: [
            "Utility-first approach",
            "Responsive design utilities",
            "Custom themes and configurations",
            "Performance-optimized styles",
          ],
          your_experience: "Used Tailwind in multiple projects for fast UI development.",
          related_technologies: ["React.js", "Next.js", "SCSS"],
        },
      ]
      
    },
    {
      name: "Services",
      id: "services",
      icon: "settings",
      divCount: 2,
      description: "Professional services offered",
      services: [
        {
          name: "Architectural Rendering",
          price_per_sq_meter: 150,
          description: "High-quality 3D renders for interior and exterior spaces.",
          options: ["Day/Night rendering", "360-degree views", "Multiple angles"],
        },
        {
          name: "Web Development",
          price_per_project: 5000,
          description: "Custom websites built using modern web technologies.",
          options: ["E-commerce", "Portfolio", "Business sites", "Admin dashboards"],
        },
      ],
    },
    {
      name: "Contact",
      id: "contact",
      icon: "mail",
      divCount: 3,
      description: "Let's get in touch or start a project together",
      contact_details: {
        email: "thando@example.com",
        phone: "+27 123 456 7890",
        location: "Johannesburg, South Africa",
        availability: "Open to freelance and remote full-time roles",
      },
      social_links: [
        {
          platform: "LinkedIn",
          url: "https://linkedin.com/in/thando-dlamini",
        },
        {
          platform: "GitHub",
          url: "https://github.com/thando-dev",
        },
        {
          platform: "Email",
          url: "mailto:thando@example.com",
        },
      ],
      form_fields: [
        {
          label: "Name",
          type: "text",
          name: "name",
          required: true,
        },
        {
          label: "Email",
          type: "email",
          name: "email",
          required: true,
        },
        {
          label: "Message",
          type: "textarea",
          name: "message",
          required: true,
        },
      ],
    }
    
  ];  

  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [reAnimate, setReAnimate] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(tabs[1].skills[0]);
  
  const [active, setActive] = useState(tabs[0]?.name);
  const setData = (tab, skill) => {
    setActive(tab.name);
    setCurrentTab(tab);
    setReAnimate(false);
    setSelectedSkill(skill);
  }

  const setSkillData = (skill) => {
    setSelectedSkill(skill);    
  }

  return (
    <div className={`w-full px-5 rounded-2xl min-h-screen py-20 my-20 flex flex-col items-center  justify-between ${activeTheme.accentLight}`}>
      <motion.div initial={{opacity:0, y: 100}} whileInView={{opacity:1, y:0}} transition={{duration:1.3, ease: "easeInOut", type:"spring"}} className={`lg:w-1/2 md:w-5/6 w-full sm:w-full h-13 ${activeTheme.elements} shadow-md shadow-neutral-500 rounded-full m-5 flex justify-between px-2 items-center`}>
      {tabs.map((tab, index) =><div key={index} onClick={() => setData(tab, tab.skills ? tab.skills[0] : null)} className={`${active === tab.name ? `${activeTheme.accentDark} shadow-md shadow-neutral-600 text-white` : `${activeTheme.activeText} ${activeTheme.hoverBorder} shadow-md shadow-neutral-100` } cursor-pointer min-w-1/5 px-2 transition-all duration-300 ease-in-out hover:shadow-md shadow-neutral-400 h-9 rounded-full flex items-center justify-center `}>
        {tab.name}
      </div>)}
      </motion.div>
      <div className={` min-h-8/10 lg:flex mb-5 flex-col lg:flex-row rounded-2xl flex w-full items-center ${currentTab.id === "experience" || currentTab.id === "services" ? "justify-center" : "justify-between"}`}>
      
      {/* First Div */}

      {reAnimate && <motion.div initial={{opacity:0, x: -50}} animate={{opacity:1, x:0}} transition={{duration:0.5, ease: "easeInOut", type:"spring"}} className={`z-10 lg:w-1/2 md:w-4/5 w-full min-h-full p-10 relative m-5 rounded-2xl shadow-lg shadow-neutral-600 flex-col justify-between items-center ${activeTheme.elements}`} >
      <div className='w-full h-2/10 flex justify-between items-center'>
      <h1 className={`${activeTheme.activeText} text-3xl font-bold`}>{currentTab.name}</h1>
      <div className={`w-15 h-15 bg-black rounded-2xl ${activeTheme.activeText} ${activeTheme.elements } shadow-md flex justify-center items-center`}>
        {currentTab.icon === "briefcase" && <BriefcaseBusiness />}
        {currentTab.icon === "code" && <Code2Icon/>}
        {currentTab.icon === "settings" && <CogIcon />}
        {currentTab.icon === "mail" && <MailPlusIcon />}
      </div>
      </div>
      {currentTab.id === "experience" &&
        <div className={`w-full  min-h-full flex flex-col justify-start gap-5 items-start ${activeTheme.activeText} `}>
          <p className={`text-xl font-bold ${activeTheme.activeText}`}>{currentTab.description}:</p>
          <div className='w-full h-full flex justify-between items-center'>
          {currentTab.experiences.map((experience, index) => (
            <div key={index} className='w-1/2 min-h-30 flex justify-start gap-3 items-start flex-col'>
              <h2 className='text-xl font-bold'>Role:</h2>
              <p className={`text-neutral-600 text-md ${activeTheme.activeText}`}>{experience.role}</p>
              <h2 className='text-xl font-bold'>Experience:</h2>
              <p className={`text-neutral-600 text-md`}>{experience.description}</p>
              <h2 className='text-xl font-bold'>Duration:</h2>
              <p className={`text-neutral-600 text-md`}>{experience.duration}</p>
            </div>
          ))}
          </div>
          <h2 className='text-xl font-bold my-10'>Key Responsibilities:</h2>
          <div className='w-full min-h-50 grid grid-cols-2 gap-5'>
            {currentTab.key_responsibilities.map((responsibility, index) => {
              const IconComponent = LucideIcons[responsibility.icon] || LucideIcons["CircleAlert"]; // fallback
              return(<motion.div initial={{opacity:0, y: 100}} whileInView={{opacity:1, y:0}} transition={{duration:0.8, ease: "easeInOut", type:"spring"}} key={index} className={`w-full shadow-lg min-h-20 p-5 rounded-2xl flex justify-evenly items-center ${activeTheme.accentLight}`}>
                <h2 className='text-md text-neutral-300'>{responsibility.text}</h2>
                <IconComponent className='w-15 h-15 text-white'/>
              </motion.div>)
             })}
          </div>
        </div>
      }
      {currentTab.id === "skills" && 
        <div className={`lg:w-full w-1/1 lg:p-10 ${activeTheme.activeText} grid grid-cols-4 gap-8 p-4`}>
          {currentTab.skills.map((skill, index) => <div onClick={() => setSkillData(skill)} key={index} className={`w-20 h-25 lg:w-25 lg:h-30 hover:scale-120 cursor-pointer  transition-all duration-400 ease-in-out rounded-2xl  shadow-lg flex justify-evenly items-center flex-col ${activeTheme.border} border-solid border-1 text-gray-50`}>
            <img src={skill.svg} className='w-7/10 h-7/10' alt=""/>
            <span className={`text-xs lg:text-sm font-semibold ${activeTheme.activeText}`}>{skill.name}</span>
            </div>)}
        </div>
      }
      {currentTab.id === "services" && 
        <div className={`w-full h-full p-10 ${activeTheme.activeText} flex justify-center items-center`}>
          
        </div>
      }
      {currentTab.id === "contact" && 
        <div className={`w-full h-full p-10 ${activeTheme.activeText} grid grid-cols-4 gap-8 p-4`}>
          
        </div>
      }
      </motion.div>}
      {(currentTab.id !== "experience" && currentTab.id !== "services") && <div className='z-10 hidden lg:flex  w-1/2 h-full gap-5 m-5 rounded-2xl flex-col justify-between items-center'>
      
      {/* Second Div */}

      {(reAnimate && (currentTab.divCount === 3)) && <motion.div initial={{opacity:0, y: -30}} animate={{opacity:1, y:0}} transition={{duration:0.7, ease: "easeInOut", type:"spring"}} className={`w-full h-2/10 rounded-2xl shadow-md shadow-neutral-600 flex justify-center items-center ${activeTheme.elements}`}>
      <h1 className={`text-xl font-bold ${activeTheme.activeText}`}>{currentTab.id === "skills" && selectedSkill === null ? "Select a skill" : selectedSkill?.name}</h1>
      </motion.div>}

      {/* Third Div */}
      
      {(reAnimate) &&
      currentTab.id === "skills" && <motion.div initial={{opacity:0, x: 40}} animate={{opacity:1, x:0}} transition={{duration:0.9, ease: "easeInOut", type:"spring"}} className={`w-full h-full flex-col rounded-2xl shadow-md shadow-neutral-600 flex justify-evenly items-start pl-10 ${activeTheme.elements}`}>
      {() => setSelectedSkill(currentTab.skills[0])}
      <h2 className={`text-xl font-bold ${activeTheme.activeText}`}>Description</h2>
      <p className={`text-neutral-600 text-md`}>{selectedSkill?.description}</p>
      <h2 className={`text-xl font-bold ${activeTheme.activeText}`}>Purpose</h2>
      <p className={`text-neutral-600 text-md`}>{selectedSkill?.purpose}</p>
      <h2 className={`text-xl font-bold ${activeTheme.activeText}`}>Use cases</h2>
      <div className='w-full h-5 flex justify-start gap-5 items-center'>
        {selectedSkill?.use_cases.map((usecase, index) => (
          <p key={index} className={`text-md font-bolder text-neutral-600`}>{usecase}</p>
          ))}
      </div>
      <div className='w-full h-20 flex flex-col justify-center items-start'>
      {/* {selectedSkill?.history?.notable_versions.length > 0 && <h2 className={`text-xl font-bold text-neutral-600`}>History</h2>}
      <div className='w-full h-5 flex justify-start gap-5 items-center'>
          {selectedSkill?.history?.notable_versions.map((version, index) => (
            <div key={index} className='w-8/10 h-5 gap-2 flex flex-col justify-evenly items-center'>
              <p className={`text-md font-bolder text-neutral-600`}>{version.feature}</p>
              <p className={`text-md font-bolder ${activeTheme.activeText}`}>version: {version.version}</p>
            </div>
          ))}
      </div> */}
      </div>
      </motion.div>
      }
      
      {(reAnimate) &&
      currentTab.id === "contact" && <motion.div initial={{opacity:0, x: 40}} animate={{opacity:1, x:0}} transition={{duration:0.9, ease: "easeInOut", type:"spring"}} className={`w-full h-full flex-col rounded-2xl shadow-md shadow-neutral-600 flex justify-evenly items-start pl-10 ${activeTheme.elements}`}>
      
      </motion.div>
      }
      </div>}
      </div>
    </div>
  )
}

export default AboutMe
