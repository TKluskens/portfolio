"use client";

import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }
  }, []);

  const applyTheme = (newTheme: 'dark' | 'light') => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(newTheme);
    root.style.colorScheme = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-110 group"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6 overflow-hidden">
        <div
          className={`absolute inset-0 transform transition-transform duration-500 ${
            theme === 'dark' ? 'translate-y-0' : '-translate-y-8'
          }`}
        >
          {/* Sun icon for when in dark mode (to switch to light) */}
          <svg
            className="w-6 h-6 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div
          className={`absolute inset-0 transform transition-transform duration-500 ${
            theme === 'light' ? 'translate-y-0' : 'translate-y-8'
          }`}
        >
          {/* Moon icon for when in light mode (to switch to dark) */}
          <svg
            className="w-6 h-6 text-slate-700 group-hover:text-slate-600 transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 716.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
