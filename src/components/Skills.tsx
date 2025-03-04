import React from 'react';
import Image from 'next/image';

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
  const skills: Skill[] = [
    { name: "Java", emoji: "☕" },
    { name: "PHP", emoji: "🐘" },
    { name: "Python", emoji: "🐍" },
    { name: "C++", emoji: "➕➕" },
    { name: "React", emoji: "⚛️" },
    { name: "Next.js", emoji: "📱" },
    { name: "TypeScript", emoji: "🔷" },
    { name: "Tailwind CSS", emoji: "🎨" },
    { name: "SQL", emoji: "📊" },
    { name: "Teamwork", emoji: "🏀" },
    { name: "HTML", emoji: "🌐" },
    { name: "CSS", emoji: "🎨" },
    { name: "Ubuntu", emoji: "🐧" },
    { name: "JavaScript", emoji: "✨" },
    { name: "Office", emoji: "📄" }
  ];

  const certificates: Certificate[] = [
    {
      name: "Cisco Networking Basics",
      imageUrl: "https://images.credly.com/size/110x110/images/5bdd6a39-3e03-4444-9510-ecff80c9ce79/image.png",
      credentialUrl: "https://www.credly.com/badges/d42e36ff-9002-472c-b4b3-ac9f955606c6/public_url"
    },
    {
      name: "Cisco Introduction to Cybersecurity",
      imageUrl: "https://images.credly.com/size/110x110/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png",
      credentialUrl: "https://www.credly.com/badges/5fb82c13-870e-44f3-b519-d95e7f8ce93a/public_url"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Skills & Technologies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-2">{skill.emoji}</div>
              <h3 className="font-medium">{skill.name}</h3>
            </div>
          ))}
        </div>
        
        <h2 className="text-3xl font-bold mt-16 mb-8 text-center">Certifications</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {certificates.map((cert, index) => (
            <a 
              key={index} 
              href={cert.credentialUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
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
    </section>
  );
};

export default Skills;