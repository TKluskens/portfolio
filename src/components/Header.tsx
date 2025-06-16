"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show navbar when scrolled down more than 100px
      // Hide navbar when back at the top (less than 50px for smooth transition)
      if (scrollPosition > 100) {
        setIsVisible(true);
      } else if (scrollPosition < 50) {
        setIsVisible(false);
      }
    };

    // Check for dark mode
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Initial check
    checkDarkMode();

    // Watch for changes in dark mode
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Render nothing if navbar should be hidden
  if (!isVisible) {
    return null;
  }  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-850 backdrop-blur-sm shadow-sm transition-all duration-500 animate-fade-in">
      <div className="container mx-auto px-6 py-2">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo - Dark theme shows white logo, Light theme shows black logo */}
            <Image
              src={isDarkMode ? "/files/logoWit.png" : "/files/logoZwart.png"}
              alt="Tom Kluskens Logo"
              width={180}
              height={60}
              className="h-12 w-auto transition-opacity duration-300"
              priority
            />
          </div>
            {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <a href="#skills" className="text-gray-700 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500 transition-colors">Skills</a>
            <a href="#projects" className="text-gray-700 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500 transition-colors">Projects</a>
            <a href="#about" className="text-gray-700 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500 transition-colors">About</a>
            <a href="#experience" className="text-gray-700 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500 transition-colors">Experience</a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              {/* Hamburger Icon */}
              <div className={`absolute w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}></div>
              <div className={`absolute w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
              <div className={`absolute w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}></div>
            </div>
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>          <div className="py-4 space-y-3 border-t border-gray-200 dark:border-gray-600 mt-2">
            <a 
              href="#skills" 
              className="block px-4 py-2 text-gray-700 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className="block px-4 py-2 text-gray-700 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#about" 
              className="block px-4 py-2 text-gray-700 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#experience" 
              className="block px-4 py-2 text-gray-700 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Experience
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;