"use client";

import React from "react";

const Hero = () => {
  return (    <section
      id="home"
      className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300"
    >
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300"></div>      {/* Main Content */}
      <div className="relative z-0 min-h-screen">
        
        {/* Mobile Layout - Centered Vertical Stack */}
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 space-y-8 sm:hidden">
          {/* Name Title - Top */}
          <h1 className="text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent animate-fade-in-up transition-colors duration-300">
            TOM<br />KLUSKENS
          </h1>
          
          {/* IT Student Text */}
          <p className="text-m text-gray-600 dark:text-gray-300 font-light tracking-wide animate-fade-in-up-delay transition-colors duration-300 leading-tight max-w-xs">
            IT Student / Bachelor in Development at HoGent
          </p>
            {/* Get in Touch Button */}
          <a
            href="https://www.linkedin.com/in/tom-kluskens-562a8522b/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-gray-800 dark:border-white rounded-full text-gray-800 dark:text-white font-medium hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group animate-fade-in-up-delay-2 text-sm"
          >
            Contact
          </a>
         
        </div>

        {/* Desktop Layout - Positioned Elements (sm and up) */}
        <div className="hidden sm:block p-6 md:p-12">
          {/* IT Student/Bachelor - Links Boven */}
          <div className="absolute top-6 left-6 md:top-12 md:left-12">
            <p className="text-base md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-light tracking-wide animate-fade-in-up-delay transition-colors duration-300">
              IT Student / Bachelor in Development at HoGent
            </p>
          </div>

          {/* Get in Touch Button - Rechts Boven */}
          <div className="absolute top-6 right-6 md:top-12 md:right-12">
            <a
              href="https://www.linkedin.com/in/tom-kluskens-562a8522b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-gray-800 dark:border-white rounded-full text-gray-800 dark:text-white font-medium hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group animate-fade-in-up-delay-2"
            >
              Get in touch
              <svg 
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Large Name Title - Links Onder */}
          <div className="absolute bottom-14 left-6 md:bottom-10 md:left-12">
            <h1 className="text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent animate-fade-in-up transition-colors duration-300">
              TOM<br />KLUSKENS
            </h1>
          </div>

          {/* Scroll Indicator - Desktop Only */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-fade-in-up-delay-2">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-6 h-10 border-2 border-gray-600 dark:border-gray-400 rounded-full flex justify-center transition-colors duration-300">
                <div className="w-1 h-3 bg-gray-600 dark:bg-gray-400 rounded-full mt-2 animate-bounce transition-colors duration-300"></div>
              </div>
              <svg 
                className="w-6 h-6 text-gray-600 dark:text-gray-400 animate-bounce transition-colors duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
