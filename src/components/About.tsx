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
              Imagine trying to build a dynamic website with a team that barely
              speaks your language, sounds like a challenge, right? Well, I did
              exactly that during my internship in Italy, where I developed a
              site that visualized complex data for clients, overcoming language
              barriers and technical barriers alike.
            </p>            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              I am Tom Kluskens, a student in Applied Information Technology at
              University of Applied Sciences and Arts Ghent, and I bring
              experience in backend development. I&apos;ve built multiple web
              applications, worked with APIs, and delivered projects under tight
              deadlines. Whether it&apos;s JavaScript or Python, I adapt fast
              and learn even faster.
            </p>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              Beyond coding, I know how to collaborate and communicate—whether
              in a fast-paced team or across cultural differences. Years of
              playing basketball taught me teamwork, while my internship abroad
              sharpened my problem-solving skills in real projects.
            </p>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              My passion for technology extends beyond development—I&apos;ve
              configured and maintain my own Ubuntu media server at home, and I
              enjoy reading comics in my free time. I love exploring both the
              practical and creative sides of computing.
            </p>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              In short, I bring the technical skills, adaptability, and teamwork
              needed to drive backend projects forward. If you&apos;re looking
              for a backend developer who delivers results and integrates
              seamlessly into your team, let&apos;s talk!
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
