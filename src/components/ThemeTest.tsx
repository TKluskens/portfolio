"use client";

import React from 'react';

const ThemeTest: React.FC = () => {
  return (
    <div className="fixed top-4 left-4 z-50 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Theme Test</h3>
      <div className="text-gray-600 dark:text-gray-300">This text should change color</div>
      <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
        <span className="text-gray-800 dark:text-gray-200">Background should change</span>
      </div>
      <button className="mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded text-sm">
        Test Button
      </button>
    </div>
  );
};

export default ThemeTest;
