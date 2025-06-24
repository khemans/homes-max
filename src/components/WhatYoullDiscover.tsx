import React from "react";

const features = [
  {
    icon: "📄",
    title: "Permit Pages",
    description:
      "Step-by-step guidance on how to find building permits and code enforcement records for any property.",
  },
  {
    icon: "🔑",
    title: "Property Rights Chapter",
    description:
      "Simple explanations of mineral, water, air, and easement rights&mdash;plus how to look them up in your deed.",
  },
  {
    icon: "💬",
    title: "Sensitive Stories & Disclosures",
    description:
      "Understand disclosure laws and how to ask about sensitive property history in a respectful, informed way.",
  },
];

const WhatYoullDiscover: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-10">
        What You'll Discover
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center bg-blue-50 rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-blue-700 text-base">
              {feature.description.replace("'", "&apos;")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatYoullDiscover; 