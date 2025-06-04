import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white text-center">
      <div className="container mx-auto px-6">
        <p>© {new Date().getFullYear()} Tom Kluskens. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://github.com/TKluskens"
            className="hover:text-blue-400"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/tom-kluskens-562a8522b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="mailto:kluskenstom2004@gmail.com"
            className="hover:text-blue-400"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
