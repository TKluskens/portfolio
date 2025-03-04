import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          <div className="text-xl font-bold">Tom Kluskens</div>
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="hover:text-blue-600 dark:hover:text-blue-400">Home</a>
            <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400">About</a>
            <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400">Projects</a>
            <a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400">Skills</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;