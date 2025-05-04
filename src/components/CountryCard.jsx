// components/CountryCard.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CountryCard({ country }) {
  const { isFavorite, addFavorite, removeFavorite, user } = useAuth();
  const isFav = isFavorite(country.cca3);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;

    if (isFav) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country.cca3);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img
          src={country.flags.svg || country.flags.png}
          alt={`${country.name.common} flag`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {user && (
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${
                isFav ? "text-red-500 fill-current" : "text-gray-400"
              }`}
              viewBox="0 0 20 20"
              fill={isFav ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-xl mb-3 text-gray-800 font-sans">
          {country.name.common}
        </h3>

        <div className="space-y-2 text-gray-600">
          <p className="flex items-start">
            <span className="inline-block w-24 font-medium text-gray-700">
              Population:
            </span>
            <span>{country.population.toLocaleString()}</span>
          </p>
          <p className="flex items-start">
            <span className="inline-block w-24 font-medium text-gray-700">
              Region:
            </span>
            <span>{country.region}</span>
          </p>
          <p className="flex items-start">
            <span className="inline-block w-24 font-medium text-gray-700">
              Capital:
            </span>
            <span>{country.capital?.[0] || "N/A"}</span>
          </p>
        </div>

        <Link
          to={`/country/${country.cca3}`}
          className="mt-6 inline-flex items-center justify-center w-full px-5 py-2.5 bg-blue-100 hover:bg-blue-200 text-black font-bold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          View Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default CountryCard;
