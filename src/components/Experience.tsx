"use client";

import React, { useEffect, useRef, useState } from "react";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Setup Intersection Observer to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we don't need to observe anymore
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.15, // Trigger when 15% of the section is visible
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const experiences = [
    {
      title: "Student Worker",
      company: "McDonald's",
      period: "2022 - Present",
      duration: "2 years",
      description:
        "Working as a student employee, developing customer service skills and teamwork in a fast-paced environment.",
      year: "2022",
      isOngoing: true,
    },
    {
      title: "Web Developer Intern",
      company: "Turtle Srl",
      period: "March 2023",
      duration: "1 month",
      description:
        "Worked as a web developer intern in Italy, creating dynamic websites with data visualization capabilities.",
      year: "2023",
      isOngoing: false,
    },
    {
      title: "Student Worker",
      company: "Delhaize",
      period: "2021 - 2022",
      duration: "1 year",
      description:
        "Worked as a student employee, gaining experience in customer service and retail operations.",
      year: "2021",
      isOngoing: false,
    },
  ].sort((a, b) => parseInt(a.year) - parseInt(b.year)); // Sort by year, oldest first (chronological)
  
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h2
          className="text-3xl font-bold mb-16 text-center text-gray-900 dark:text-white"
          style={
            isVisible
              ? {
                  opacity: 0,
                  animation: `fadeIn 0.5s ease forwards`,
                }
              : { opacity: 0 }
          }
        >
          Work Experience
        </h2>
        
        {/* Timeline Container */}
        <div className="max-w-6xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center relative ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                style={
                  isVisible
                    ? {
                        opacity: 0,
                        animation: `fadeIn 1s ease forwards ${index * 300}ms`,
                      }
                    : { opacity: 0 }
                }
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-4 border-blue-500 rounded-full z-10 hidden md:block">
                  {exp.isOngoing && (
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                {/* Year Badge */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold hidden md:block">
                  {exp.year}
                </div>
                
                {/* Experience Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
                    {/* Mobile Year Badge */}
                    <div className="md:hidden bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-4">
                      {exp.year}
                    </div>
                    
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                          {exp.company}
                        </span>
                        {exp.isOngoing && (
                          <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Period and Duration */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                        {exp.period}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        • {exp.duration}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p> 
                  </div>
                </div>
                
                {/* Spacer for the other side */}
                <div className="hidden md:block w-5/12"></div>              </div>
            ))}
          </div>
          
          {/* Timeline End Dot */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full hidden md:block"></div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
