"use client";

import React, { useEffect, useRef, useState } from "react";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Setup Intersection Observer to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we don't need to observe anymore
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.15, // Trigger when 15% of the section is visible
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const experiences = [
    {
      title: "Student Worker",
      company: "McDonald's",
      period: "2022 - Present | 2 years",
      description:
        "Working as a student employee, developing customer service skills and teamwork in a fast-paced environment.",
    },
    {
      title: "Web Developer Intern",
      company: "Turtle Srl",
      period: "March 2023",
      description:
        "Worked as a web developer intern in Italy, creating dynamic websites with data visualization capabilities.",
    },
    {
      title: "Student Worker",
      company: "Delhaize",
      period: "2021 - 2022 | 1 year",
      description:
        "Worked as a student employee, gaining experience in customer service and retail operations.",
    },
  ];

  return (
    <section id="experience" className="py-20" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h2
          className="text-3xl font-bold mb-12 text-center"
          style={
            isVisible
              ? {
                  opacity: 0,
                  animation: `fadeIn 0.5s ease forwards`,
                }
              : { opacity: 0 }
          }
        >
          Work Experience
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
              style={
                isVisible
                  ? {
                      opacity: 0,
                      animation: `fadeIn 1s ease forwards ${index * 500}ms`,
                    }
                  : { opacity: 0 }
              }
            >
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <span className="text-gray-600 dark:text-gray-300">
                  {exp.company}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {exp.period}
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
