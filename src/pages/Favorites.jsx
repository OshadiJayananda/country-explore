// pages/Favorites.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "../components/CountryCard";
import { PacmanLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites, user } = useAuth();
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteCountries = async () => {
      if (!favorites.length) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha?codes=${favorites.join(",")}`
        );
        setFavoriteCountries(response.data);
      } catch (error) {
        console.error("Error fetching favorite countries:", error);
        setError("Failed to load favorite countries. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteCountries();
  }, [favorites]);

  if (!user) {
    return (
      <div className="min-h-screen w-screen bg-gray-50 p-6">
        <Header />
        <main className="max-w-7xl mx-auto text-center py-16">
          <div className="bg-white p-8 rounded-xl shadow-sm max-w-md mx-auto">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <h3 className="mt-3 text-lg font-medium text-gray-800">
              Authentication Required
            </h3>
            <p className="mt-2 text-gray-500">
              You need to be logged in to view your favorite countries.
            </p>
            <div className="mt-6 space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 p-6">
      <Header />
      <main className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">
          Your Favorite Countries
        </h3>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <PacmanLoader color="#3B82F6" size={30} />
            <p className="mt-4 text-gray-600">Loading favorites...</p>
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
        ) : favoriteCountries.length === 0 ? (
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
              No favorite countries yet
            </h3>
            <p className="mt-1 text-gray-500 max-w-md mx-auto">
              Click the heart icon on country cards to add them to your
              favorites
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Countries
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favoriteCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Favorites;
