import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Hello, I&apos;m Tom Kluskens</h1>
        <p className="text-xl md:text-2xl mb-8">IT Student | Bachelor in Development at HoGent</p>
        <a 
          href="https://www.linkedin.com/in/tom-kluskens-562a8522b/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
          Get in Touch
        </a>
      </div>
    </section>
  );
};

export default Hero;