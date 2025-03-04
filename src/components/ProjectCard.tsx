"use client";

import React from 'react';

interface Tag {
  name: string;
  colorClass: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: Tag[];
  demoLink?: string;
  sourceLink?: string;
  imageUrl?: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  tags, 
  demoLink, 
  sourceLink,
  imageUrl
}: ProjectCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden w-full md:w-[500px] lg:w-[600px] mb-8">
      <div className="h-80 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span>Project Image</span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className={`px-3 py-1 ${tag.colorClass} text-sm rounded-full`}
            >
              {tag.name}
            </span>
          ))}
        </div>
        {/* <div className="flex space-x-2">
          {demoLink && (
            <a href={demoLink} className="text-blue-600 hover:underline dark:text-blue-400">
              View Demo
            </a>
          )}
          {sourceLink && (
            <a href={sourceLink} className="text-blue-600 hover:underline dark:text-blue-400">
              Source Code
            </a>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default ProjectCard;