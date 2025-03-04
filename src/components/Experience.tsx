import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Work Experience</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h3 className="text-xl font-bold">Student Worker</h3>
              <span className="text-gray-600 dark:text-gray-300">McDonald's</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">2022 - Present | 2 years</p>
            <p>Working as a student employee, developing customer service skills and teamwork in a fast-paced environment.</p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h3 className="text-xl font-bold">Web Developer Intern</h3>
              <span className="text-gray-600 dark:text-gray-300">Turtle Srl</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">March 2023</p>
            <p>Worked as a web developer intern in Italy, creating dynamic websites with data visualization capabilities.</p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h3 className="text-xl font-bold">Student Worker</h3>
              <span className="text-gray-600 dark:text-gray-300">Delhaize</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">2021 - 2022 | 1 year</p>
            <p>Worked as a student employee, gaining experience in customer service and retail operations.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;