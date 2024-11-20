import Image from "next/image";
import Link from "next/link";
import Filter from "./component/fetch";
import { FaSearch } from "react-icons/fa";

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

async function fetchData(url: string): Promise<Country[]> {
  const response = await fetch(url);
  return await response.json();
}

export default async function Home(
  props: {
    searchParams: Promise<{ region?: string; search?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const { region = "", search = "" } = searchParams;

  let url = "https://restcountries.com/v3.1/all";
  if (search) {
    url = `https://restcountries.com/v3.1/name/${search}`;
  } else if (region) {
    url = `https://restcountries.com/v3.1/region/${region}`;
  }

  const countries = await fetchData(url); // Fetch data on the server

  return (
    <div className="px-8 py-16 md:p-28">
      {/* Search and Filter Section */}
      <div className="flex mb-8 justify-between items-center">
        {/* Search Form */}
        <form action="/" method="GET" className="bg-[#2b3945] flex items-center w-96">
          <button type="submit" className="text-xl px-2 text-white">
            <FaSearch />
          </button>
          <input
            type="search"
            name="search"
            placeholder="Search country by name"
            defaultValue={search}
            className="p-3 w-full bg-[#2b3945] outline-none text-xl"
          />
        </form>

        {/* Region Filter */}
        <Filter currentRegion={region} />
      </div>

      {/* Countries Display */}
      <section className="grid md:grid-cols-3 gap-14">
        {countries.length > 0 ? (
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
                    <h1 className="text-2xl font-semibold my-4">{country.name.common}</h1>
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
