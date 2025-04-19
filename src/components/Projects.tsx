"use client";

import React, { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const htmlTag = {
    name: "HTML",
    colorClass:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  };
  const phpTag = {
    name: "PHP",
    colorClass:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };
  const mysqlTag = {
    name: "MySQL",
    colorClass:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  };
  const jsTag = {
    name: "JavaScript",
    colorClass:
      "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200",
  };
  const cssTag = {
    name: "CSS",
    colorClass: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  };
  const reactTag = {
    name: "React",
    colorClass: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  };
  const nodeTag = {
    name: "Node.js",
    colorClass:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  };
  const tailwindTag = {
    name: "Tailwind",
    colorClass: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  };
  const javaTag = {
    name: "Java",
    colorClass: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  const springTag = {
    name: "Spring",
    colorClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  };
  const thymeleafTag = {
    name: "Thymeleaf",
    colorClass: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  };

  const projects = [
    {
      title: "School Library System",
      description:
        "A school library system built with HTML, PHP, and MySQL that automatically generates QR codes with unique ISBN numbers of books.",
      tags: [htmlTag, phpTag, cssTag, mysqlTag],
      sourceLink: "https://github.com/TKluskens/SchoolBib",
      imageUrl: "/files/Project_Bib.jpg",
    },
    {
      title: "Turtle SRL Dashboard",
      description:
        "A dashboard that converts customer data into charts using JavaScript. This was my internship project in Cesenatico, Italy.",
      tags: [htmlTag, jsTag, cssTag],
      sourceLink: "https://github.com/TKluskens/Dashboard-Turtle",
      imageUrl: "/files/Project_Italie.png",
    },
    {
      title: "Recipe Relay",
      description:
        "A social platform for students to upload, share, like and comment on recipes plus add friends, built with Node.js, React and Tailwind CSS.",
      tags: [reactTag, nodeTag, tailwindTag, mysqlTag],
      sourceLink: "https://github.com/TKluskens/RecipeRelay",
      imageUrl: "/files/Project_Recept.png",
    },
    {
      title: "ConfySpring",
      description:
        "ConfySpring is a Spring Boot application designed to manage conference events, speakers, locations, and user registrations. This application was developed as part of the Enterprise Web Development (EWD) examination assignment at Hogeschool Gent.",
      tags: [javaTag, springTag, thymeleafTag, mysqlTag],
      imageUrl: "/files/ConfySpring.png",
      status: "In Progress",
    },
    {
      title: "Delaware Dashboard",
      description:
        "A dashboard created in my second year at HoGent for Delaware. In a team of 5, we built a dashboard to view machines per site with KPIs. This project was built with React and Node.js.",
      tags: [reactTag, nodeTag, tailwindTag, mysqlTag],
      imageUrl: "/files/Project_Dellaware.png",
      status: "In Progress",
    },
  ];

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

  return (
    <section id="projects" className="py-20" ref={sectionRef}>
      <div className="container mx-auto px-6 flex flex-col items-center">
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
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {projects.map((project, index) => (
            <div
              key={index}
              style={
                isVisible
                  ? {
                      opacity: 0,
                      animation: `fadeIn 1s ease forwards ${index * 500}ms`,
                    }
                  : { opacity: 0 }
              }
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageUrl={project.imageUrl}
                sourceLink={project.sourceLink}
                status={project.status}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
