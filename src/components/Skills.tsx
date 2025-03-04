import React from 'react';

interface Skill {
  name: string;
  emoji: string;
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
      </div>
    </section>
  );
};

export default Skills;