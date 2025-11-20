import React from "react";
import Image from "next/image";
import profilePic from "../files/pf.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-850 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-40">
          <div className="md:w-1/2">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-80 h-80 mx-auto overflow-hidden border-4 border-gray-300 dark:border-gray-600">
              <Image
                src={profilePic}
                alt="Tom Kluskens profile picture"
                width={280}
                height={280}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">About Me</h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              Hi👋 My name is Tom Kluskens. A student in my last year in my bachelor Applied Information Technology at
              the University of Applied Sciences and Arts Ghent, and I bring
              hands-on experience in backend development. I&apos;ve built multiple web
              applications, worked with APIs, and delivered projects under tight
              deadlines. Whether it&apos;s Java or C#, I adapt quickly and learn even
              faster.
            </p>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              What truly drives me is not just coding, but the full development
              process. I enjoy presenting ideas clearly and discussing a
              project&apos;s plan of approach directly with the client. Turning
              requirements into concrete, technical solutions is something I feel
              at home with.
            </p>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              Years of playing basketball taught me teamwork, while my internship
              abroad sharpened my problem-solving skills in real, production-level
              environments.
            </p>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              In my free time, you&apos;ll find me experimenting with my homelab
              setup, maintaining my server, or building new webapp
              sideprojects to explore fresh technologies and improve my skills. I
              love diving into both the practical and creative sides of computing.
            </p>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              In short, I bring technical expertise, adaptability, communication
              skills, and a proactive mindset needed to move backend projects
              forward. If you&apos;re looking for a backend developer who delivers
              results and thrives in collaboration, let&apos;s talk!
            </p>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              🌍 Languages: Dutch, English, French
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
