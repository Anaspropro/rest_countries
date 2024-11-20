"use client"
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import Filter from "./component/fetch";

type Country = {
  name: {
    common: string;
    official: string;
  };
  population: number;
  capital: string[];
  region: string;
  flags: {
    svg: string;
  };
  cca3: string;
};

async function fetchData(url: string) {
  const response = await fetch(url);
  return await response.json();
}

export default function Home({
  searchParams,
}: {
  searchParams: { region?: string; search?: string };
}) {
  const [region, setRegion] = useState(searchParams.region || ""); // State for region filter
  const [search, setSearch] = useState(searchParams.search || ""); // State for search query
  const [countries, setCountries] = useState<Country[]>([]); // State for fetched countries
  const [loading, setLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      let url = "https://restcountries.com/v3.1/all";

      if (search) {
        url = `https://restcountries.com/v3.1/name/${search}`;
      } else if (region) {
        url = `https://restcountries.com/v3.1/region/${region}`;
      }

      const data: Country[] = await fetchData(url);
      setCountries(data);
      setLoading(false);
    };

    fetchCountries();
  }, [region, search]); // Re-fetch data when region or search changes

  return (
    <div className="px-8 py-16 md:p-28">
      {/* Search and Filter Section */}
      <div className="flex mb-8 justify-between items-center">
        {/* Search Form */}
        <form
          action="/"
          method="GET"
          autoComplete="off"
          className="bg-[#2b3945] flex items-center w-96"
        >
          <button type="submit" className="text-xl px-2 text-white">
            <FaSearch />
          </button>
          <input
            type="search"
            name="search"
            placeholder="Search country by name"
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)} // Update search state
            className="p-3 w-full bg-[#2b3945] outline-none text-xl"
          />
        </form>

        {/* Region Filter */}
        <Filter region={region} setRegion={setRegion} />
      </div>

      {/* Countries Display */}
      <section className="grid md:grid-cols-3 gap-14">
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : countries.length > 0 ? (
          countries.map((country) => (
            <Link href={`/${country.cca3}`} key={country.cca3}>
              <div>
                <article className="rounded-lg shadow-black shadow overflow-hidden">
                  <Image
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    width={100}
                    height={100}
                    className="h-52 w-full object-cover"
                    priority
                  />
                  <div className="p-5">
                    <h1 className="text-2xl font-semibold my-4">
                      {country.name.common}
                    </h1>
                    <ul className="flex flex-col justify-start items-start gap-2 text-sm">
                      <li>Population: {country.population.toLocaleString()}</li>
                      <li>Region: {country.region}</li>
                      <li>Capital: {country.capital?.[0] || "N/A"}</li>
                    </ul>
                  </div>
                </article>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-xl">No countries found. Please adjust your filters.</p>
        )}
      </section>
    </div>
  );
}
