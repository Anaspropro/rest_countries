"use client";

import React from "react";

type FilterProps = {
  region: string;
  setRegion: (region: string) => void;
};

export default function Filter({ region, setRegion }: FilterProps) {
  return (
    <select
      name="region"
      id="region"
      value={region}
      onChange={(e) => setRegion(e.target.value)} // Update the region when a new option is selected
      className="bg-gray-800 text-white p-2 rounded"
    >
      <option value="">Filter by region</option>
      <option value="africa">Africa</option>
      <option value="europe">Europe</option>
      <option value="asia">Asia</option>
      <option value="antarctica">Antarctica</option>
      <option value="americas">Americas</option>
    </select>
  );
}
