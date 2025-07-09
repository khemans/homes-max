"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface SavedProperty {
  address: string;
  city: string;
  state: string;
  zip: string;
  mlsId?: string;
}

const MyPropertiesPage = () => {
  const [saved, setSaved] = useState<SavedProperty[]>([]);

  useEffect(() => {
    const props = JSON.parse(localStorage.getItem("savedProperties") || "[]");
    setSaved(props);
  }, []);

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">My Properties</h1>
      {saved.length === 0 ? (
        <>
          <p className="text-lg text-blue-800 mb-4">This is where your saved properties will appear.</p>
          <div className="bg-blue-100 rounded-xl p-6 text-blue-700">No saved properties yet. Start searching to add properties to your list!</div>
        </>
      ) : (
        <div className="space-y-6">
          {saved.map((p, idx) => (
            <Link
              key={idx}
              href={`/property?query=${encodeURIComponent(p.address)}`}
              className="block bg-blue-100 rounded-xl p-6 text-blue-900 shadow hover:bg-blue-200 transition-colors cursor-pointer"
            >
              <div className="font-semibold text-lg mb-1">{p.address}</div>
              <div className="text-blue-800">{p.city}, {p.state} {p.zip}</div>
              {p.mlsId && <div className="text-blue-600 text-xs">MLS ID: {p.mlsId}</div>}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default MyPropertiesPage; 