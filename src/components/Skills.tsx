"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Skill {
  name: string;
  emoji: string;
}

interface Certificate {
  name: string;
  imageUrl: string;
  credentialUrl: string;
}

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skills: Skill[] = [
    { name: "Java", emoji: "☕" },
    { name: "Python", emoji: "🐍" },
    { name: "PHP", emoji: "🐘" },
    { name: "SQL", emoji: "📊" },
    { name: "JavaScript", emoji: "✨" },
    { name: "TypeScript", emoji: "🔷" },
    { name: "HTML", emoji: "🌐" },
    { name: "CSS", emoji: "🎨" },
    { name: "Tailwind CSS", emoji: "🎨" },
    { name: "React", emoji: "⚛️" },
    { name: "Next.js", emoji: "📱" },
    { name: "Spring", emoji: "🍃" },
  ];

  const certificates: Certificate[] = [
    {
      name: "Cisco Networking Basics",
      imageUrl:
        "https://images.credly.com/size/110x110/images/5bdd6a39-3e03-4444-9510-ecff80c9ce79/image.png",
      credentialUrl:
        "https://www.credly.com/badges/d42e36ff-9002-472c-b4b3-ac9f955606c6/public_url",
    },
    {
      name: "Cisco Introduction to Cybersecurity",
      imageUrl:
        "https://images.credly.com/size/110x110/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png",
      credentialUrl:
        "https://www.credly.com/badges/5fb82c13-870e-44f3-b519-d95e7f8ce93a/public_url",
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

  // Bereken de vertraging voor certificaten op basis van het aantal skills
  const skillsAnimationDuration = skills.length * 150; // 150ms per skill
  const certificatesSectionDelay = skillsAnimationDuration + 500; // 500ms extra buffer

  return (    <section
      id="skills"
      className="py-20 bg-gray-100 dark:bg-gray-850 transition-colors duration-300"
      ref={sectionRef}
    >
      <div className="container mx-auto px-6">
        <h2
          className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
          style={
            isVisible
              ? {
                  opacity: 0,
                  animation: `fadeIn 0.5s ease forwards`,
                }
              : { opacity: 0 }
          }
        >
          Skills & Technologies
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}              className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              style={
                isVisible
                  ? {
                      opacity: 0,
                      animation: `fadeIn 0.5s ease forwards ${index * 150}ms`,
                    }
                  : { opacity: 0 }
              }
            >
              <div className="text-4xl mb-2">{skill.emoji}</div>
              <h3 className="font-medium text-gray-900 dark:text-white">{skill.name}</h3>
            </div>
          ))}
        </div>

        {/* Certificaten sectie die pas verschijnt nadat alle skills zichtbaar zijn */}
        <div
          style={
            isVisible
              ? {
                  opacity: 0,
                  animation: `fadeIn 0.5s ease forwards ${certificatesSectionDelay}ms`,
                }
              : { opacity: 0 }
          }
        >          <h2 className="text-3xl font-bold mt-16 mb-8 text-center text-gray-900 dark:text-white">
            Certifications
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {certificates.map((cert, index) => (
              <a
                key={index}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                style={
                  isVisible
                    ? {
                        opacity: 0,
                        animation: `fadeIn 0.5s ease forwards ${
                          certificatesSectionDelay + 300 + index * 300
                        }ms`,
                      }
                    : { opacity: 0 }
                }
              >
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm text-center max-w-[170px]">
                  <Image
                    src={cert.imageUrl}
                    alt={cert.name}
                    width={150}
                    height={150}
                    className="mx-auto mb-3"
                  />
                  <h3 className="font-medium text-sm">{cert.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
