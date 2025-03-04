import React from 'react';
import Image from 'next/image';
import profilePic from '../files/pf.jpg';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-64 h-64 mx-auto overflow-hidden">
              <Image 
                src={profilePic}
                alt="Tom Kluskens profile picture" 
                width={256}
                height={256}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
          <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
            <p className="text-lg mb-4">
              Hi, I'm Tom Kluskens, an IT student with a passion for software development and IT management. 
              I have experience with Java, PHP, Python, C++, JavaScript, TypeScript, React, SQL, and more.
            </p>
            <p className="text-lg mb-4">
              During my internship in Cesenatico, Italy, I worked as a web developer creating dynamic websites with data visualization.
              I thrive in team-oriented environments and value continuous learning.
            </p>
            <p className="text-lg mb-4">
              My 5 years of basketball have strengthened my discipline and teamwork. Always open to new opportunities—let's connect!
            </p>
            <p className="text-lg font-medium">
              🌍 Languages: Dutch, English, French
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;