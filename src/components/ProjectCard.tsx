"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Tag {
  name: string;
  colorClass: string;
}

interface SourceLink {
  label: string;
  url: string;
}

interface DocLink {
  label: string;
  path: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: Tag[];
  demoLink?: string;
  sourceLink?: string; // backward compat if any entry still uses string
  sourceLinks?: SourceLink[];
  docLinks?: DocLink[];
  imageUrl?: string;
  status?: string;
}

const ProjectCard = ({
  title,
  description,
  tags,
  imageUrl,
  sourceLink,
  sourceLinks,
  docLinks,
  status,
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-[#2a2a2a] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-full mb-8">
      {/* Image - Always Visible */}
      {imageUrl && (
        <div className="w-full aspect-video relative bg-gray-100 dark:bg-[#2a2a2a]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 600px, 600px"
            className="object-contain w-full h-full"
          />
        </div>
      )}

      {/* Clickable Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 sm:p-6 transition-colors duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white">
              {title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 sm:px-3 py-1 ${tag.colorClass} text-xs sm:text-sm rounded-full`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <svg
              className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
      >
        <div>
          {/* Content */}
          <div className="p-4 sm:p-6">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
              {description}
            </p>

            {/* Source Code Links */}
            {(sourceLinks || sourceLink) && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Source Code
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sourceLinks?.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline dark:text-orange-400 text-xs sm:text-sm"
                    >
                      {link.label}
                    </a>
                  ))}
                  {sourceLink && !sourceLinks && (
                    <a
                      href={sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline dark:text-orange-400 text-xs sm:text-sm"
                    >
                      {title}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Documentation Links */}
            {docLinks && docLinks.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Documentation
                </h4>
                <div className="flex flex-wrap gap-2">
                  {docLinks.map((doc) => (
                    <a
                      key={doc.path}
                      href={doc.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg"
                    >
                      {doc.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {status && (
              <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                {status}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;