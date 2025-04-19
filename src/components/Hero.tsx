"use client";

import React, { useEffect, useState } from "react";

const Hero = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Sequentially show elements with delay
  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 500);
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 1200);
    const buttonTimer = setTimeout(() => setShowButton(true), 1900);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);
  const gradientStyle = {
    background: "linear-gradient(-45deg, #4f46e5, #7c3aed)",
    backgroundSize: "400% 400%",
    animation: "gradient 10s ease infinite",
  };

  const fadeInStyle = {
    opacity: 0,
    transform: "translateY(20px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  };

  const activeStyle = {
    opacity: 1,
    transform: "translateY(0)",
  };

  return (
    <section
      id="home"
      className="py-20 text-white min-h-[90vh] flex items-center"
      style={gradientStyle}
    >
      <div className="container mx-auto px-6 text-center">
        <h1
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{
            ...fadeInStyle,
            ...(showTitle ? activeStyle : {}),
          }}
        >
          Hello, I&apos;m Tom Kluskens
        </h1>
        <p
          className="text-xl md:text-2xl mb-8"
          style={{
            ...fadeInStyle,
            ...(showSubtitle ? activeStyle : {}),
          }}
        >
          IT Student | Bachelor in Development at HoGent
        </p>
        <a
          href="https://www.linkedin.com/in/tom-kluskens-562a8522b/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
          style={{
            ...fadeInStyle,
            ...(showButton ? activeStyle : {}),
          }}
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
};

export default Hero;
