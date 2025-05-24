import React from 'react';
import { Star, Users, Gift } from "lucide-react";
import useThemeStore from '../stores/themeStore';

const TestimonialsSection = () => {
  const { isDarkMode } = useThemeStore();
  
  const testimonials = [
    {
      quote: "This platform helped me find a project that actually pushed my skills forward. I built a real app that I'm proud to showcase in interviews.",
      author: "Sarah Chen",
      role: "Front-End Developer",
      avatar: "/api/placeholder/40/40"
    },
    {
      quote: "I was stuck in tutorial hell for months. The personalized recommendations gave me exactly what I needed - a challenging but achievable project.",
      author: "Marcus Johnson",
      role: "Full Stack Developer",
      avatar: "/api/placeholder/40/40"
    },
    {
      quote: "The AI suggestions were spot-on for my skill level. I learned new technologies while building something I actually care about.",
      author: "Aisha Patel",
      role: "React Developer",
      avatar: "/api/placeholder/40/40"
    }
  ];

  const stats = [
    {
      icon: <Star className="text-neon-yellow" size={24} />,
      value: "2,400+",
      label: "Projects Created"
    },
    {
      icon: <Users className="text-neon-yellow" size={24} />,
      value: "1,200+",
      label: "Active Developers"
    },
    {
      icon: <Gift className="text-neon-yellow" size={24} />,
      value: "85%",
      label: "Completion Rate"
    }
  ];

  return (
    <div className={`w-full transition-colors duration-300 ease-in-out py-12 md:py-16 lg:py-20 ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-white text-neutral-900"
    }`}>
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">Loved By Developers</h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base">
            Join thousands of developers who have kickstarted their portfolio with our project recommendations
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                {stat.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">{stat.value}</h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-neutral-500"}`}>{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-neon-yellow" fill="#FFFF00" />
                  ))}
                </div>
              </div>
              <p className={`text-sm mb-6 ${isDarkMode ? "text-gray-300" : "text-neutral-700"}`}>"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-medium text-sm">{testimonial.author}</h4>
                  <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-neutral-500"}`}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;