import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">Tom Kluskens</div>
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Home</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">About</a>
            <a href="#projects" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Projects</a>
            <a href="#skills" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Skills</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;