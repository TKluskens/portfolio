"use client";

import React from "react";
import Image from "next/image";

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
  status?: string;
}

const ProjectCard = ({
  title,
  description,
  tags,
  imageUrl,
  sourceLink,
  status,
}: ProjectCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full md:w-[500px] lg:w-[600px] mb-8 flex flex-col h-[600px]">
      <div className="h-80 bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={320}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 dark:text-gray-400">Project Image</span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 overflow-y-auto flex-grow">
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
        <div className="flex space-x-2 mt-auto">
          {sourceLink && (
            <a
              href={sourceLink}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Source Code
            </a>
          )}
          {status && (
            <span className="text-gray-600 dark:text-gray-300">{status}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
