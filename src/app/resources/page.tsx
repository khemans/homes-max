import React from "react";

const resources = [
  { name: "CoreLogic Property Risk Reports", url: "https://store.corelogic.com/search" },
  { name: "CARFAX Vehicle History Reports", url: "https://www.carfax.com/" },
  // Add more as needed
];

const ResourcesPage = () => (
  <main className="max-w-3xl mx-auto py-12 px-4">
    <h1 className="text-4xl font-bold text-blue-900 mb-6">Resources</h1>
    <ul className="list-disc list-inside text-blue-700">
      {resources.map(resource => (
        <li key={resource.url} className="mb-2">
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="underline text-blue-800 hover:text-blue-600">{resource.name}</a>
        </li>
      ))}
    </ul>
  </main>
);

export default ResourcesPage; 