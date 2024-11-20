"use client";

import { useEffect, useState } from "react";

type Filter ={
  name: {
    common: string
  },
  cca3: string
}

export default function Filter() {
  const [region, setRegion] = useState(""); // State to store the selected region
  const [filters, setFilters] = useState([]); // State to store fetched filters

  useEffect(() => {
    if (!region) return; // Prevent fetching if no region is selected

    const fetchFilter = async () => {
      const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      const filters = await response.json();
      setFilters(filters); // Update filters with fetched data
    };

    fetchFilter();
  }, [region]);

  return (
    <select
      name="region"
      id="region"
      onChange={(e) => setRegion(e.target.value)} // Update region on change
    >
      <option value="">Filter by region</option>
      {filters.map((filter: Filter) => (
        <option key={filter.cca3} value={filter.name.common}>
          {filter.name.common}
        </option>
      ))}
    </select>
  );
}
