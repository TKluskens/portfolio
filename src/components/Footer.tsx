import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-4 bg-white dark:bg-gray-850 text-gray-600 dark:text-gray-100 text-center transition-colors duration-300">
      <div className="container mx-auto px-6">
        <p className="text-gray-700 dark:text-gray-300">© {new Date().getFullYear()} Tom Kluskens. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://github.com/TKluskens"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/tom-kluskens-562a8522b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="mailto:kluskenstom2004@gmail.com"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
