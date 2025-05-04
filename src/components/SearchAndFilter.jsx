import React, { useState, useEffect } from "react";

function SearchAndFilter({ countries, setFilteredCountries }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [languages, setLanguages] = useState([]);

  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  // Extract all unique languages when countries data changes
  useEffect(() => {
    if (countries.length > 0) {
      const allLanguages = new Set();
      countries.forEach((country) => {
        if (country.languages) {
          Object.values(country.languages).forEach((lang) =>
            allLanguages.add(lang)
          );
        }
      });
      setLanguages(["All", ...Array.from(allLanguages).sort()]);
    }
  }, [countries]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterCountries(term, selectedRegion, selectedLanguage);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    filterCountries(searchTerm, region, selectedLanguage);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    filterCountries(searchTerm, selectedRegion, language);
  };

  const filterCountries = (term, region, language) => {
    let filtered = countries;

    // Filter by search term
    if (term) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(term)
      );
    }

    // Filter by region
    if (region !== "All") {
      filtered = filtered.filter((country) => country.region === region);
    }

    // Filter by language
    if (language !== "All") {
      filtered = filtered.filter(
        (country) =>
          country.languages &&
          Object.values(country.languages).includes(language)
      );
    }

    setFilteredCountries(filtered);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-between mb-12">
      {/* Search Input */}
      <div className="relative flex-1 max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Filters Container */}
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        {/* Region Filter */}
        <div className="relative w-full sm:w-48">
          <select
            value={selectedRegion}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-3 text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region === "All" ? "Filter by Region" : region}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Language Filter */}
        <div className="relative w-full sm:w-48">
          <select
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-3 text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            disabled={languages.length === 0}
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language === "All" ? "Filter by Language" : language}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchAndFilter;
