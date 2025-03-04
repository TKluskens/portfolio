import React from 'react';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const projects = [
    {
      title: "School Library System",
      description: "A school library system built with HTML, PHP, and MySQL that automatically generates QR codes with unique ISBN numbers of books.",
      tags: [
        { name: "HTML", colorClass: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
        { name: "PHP", colorClass: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
        { name: "MySQL", colorClass: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" }
      ],
      demoLink: "#",
      sourceLink: "#",
      imageUrl: "/files/Project_Bib.jpg"
    },
    {
      title: "Turtle SRL Dashboard",
      description: "A dashboard that converts customer data into charts using JavaScript. This was my internship project in Cesenatico, Italy.",
      tags: [
        { name: "HTML", colorClass: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
        { name: "JavaScript", colorClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
        { name: "CSS", colorClass: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" }
      ],
      demoLink: "#",
      sourceLink: "#",
      imageUrl: "/files/Project_Italie.png"
    },
    {
      title: "Delaware Dashboard",
      description: "A dashboard created in my second year at HoGent for Delaware. In a team of 5, we built a dashboard to view machines per site with KPIs. This project was built with React and Node.js.",
      tags: [
        { name: "React", colorClass: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200" },
        { name: "Node.js", colorClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
        { name: "Tailwind", colorClass: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" }
      ],
      demoLink: "#",
      sourceLink: "#",
      imageUrl: "/files/Project_Dellaware.png"
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
        
        <div className="flex flex-col md:flex-row gap-16 mb-8 justify-center w-full">
          {/* First two cards side by side */}
          <ProjectCard
            title={projects[0].title}
            description={projects[0].description}
            tags={projects[0].tags}
            demoLink={projects[0].demoLink}
            sourceLink={projects[0].sourceLink}
            imageUrl={projects[0].imageUrl}
          />
          <ProjectCard
            title={projects[1].title}
            description={projects[1].description}
            tags={projects[1].tags}
            demoLink={projects[1].demoLink}
            sourceLink={projects[1].sourceLink}
            imageUrl={projects[1].imageUrl}
          />
        </div>
        
        {/* Third card centered */}
        <div className="flex justify-center">
          <ProjectCard
            title={projects[2].title}
            description={projects[2].description}
            tags={projects[2].tags}
            demoLink={projects[2].demoLink}
            sourceLink={projects[2].sourceLink}
            imageUrl={projects[2].imageUrl}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;