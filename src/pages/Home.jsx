import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryCard from "../components/CountryCard";
import SearchAndFilter from "../components/SearchAndFilter";
import { PacmanLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import Header from "../components/Header";

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Failed to load countries. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchCountries();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gray-50 p-6">
      <Header />
      <main className="max-w-7xl mx-auto">
        <SearchAndFilter
          countries={countries}
          setFilteredCountries={setFilteredCountries}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <PacmanLoader color="#3B82F6" size={30} />
            <p className="mt-4 text-gray-600">Loading countries...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-start">
              <svg
                className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-3 text-lg font-medium text-gray-800">
              No countries found
            </h3>
            <p className="mt-1 text-gray-500 max-w-md mx-auto">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
