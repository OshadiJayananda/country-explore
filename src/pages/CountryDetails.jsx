// pages/CountryDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PacmanLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

function CountryDetails() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const { user, isFavorite, addFavorite, removeFavorite } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        setCountry(response.data[0]);

        // Fetch border countries if they exist
        if (response.data[0].borders) {
          const bordersResponse = await axios.get(
            `https://restcountries.com/v3.1/alpha?codes=${response.data[0].borders.join(
              ","
            )}`
          );
          setBorderCountries(bordersResponse.data);
        }
      } catch (error) {
        console.error("Error fetching country:", error);
        setError("Failed to load country details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryCode]);

  const handleFavorite = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isFavorite(countryCode)) {
      removeFavorite(countryCode);
    } else {
      addFavorite(countryCode);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen bg-gray-50 p-6">
        <Header />
        <main className="max-w-7xl mx-auto flex flex-col items-center justify-center h-64">
          <PacmanLoader color="#3B82F6" size={30} />
          <p className="mt-4 text-gray-600">Loading country details...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen bg-gray-50 p-6">
        <Header />
        <main className="max-w-7xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
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
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 p-6">
      <Header />
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Countries
          </Link>
        </div>

        {country && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <img
                  src={country.flags.svg || country.flags.png}
                  alt={`${country.name.common} flag`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={handleFavorite}
                    className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-sm"
                    aria-label={
                      isFavorite(country.cca3)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 ${
                        isFavorite(country.cca3)
                          ? "text-red-500 fill-current"
                          : "text-gray-400"
                      }`}
                      viewBox="0 0 20 20"
                      fill={isFavorite(country.cca3) ? "currentColor" : "none"}
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
                </div>
              </div>

              <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                  {country.name.common}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Native Name:</span>{" "}
                      {Object.values(country.name.nativeName)[0].common}
                    </p>
                    <p>
                      <span className="font-semibold">Population:</span>{" "}
                      {country.population.toLocaleString()}
                    </p>
                    <p>
                      <span className="font-semibold">Region:</span>{" "}
                      {country.region}
                    </p>
                    <p>
                      <span className="font-semibold">Sub Region:</span>{" "}
                      {country.subregion}
                    </p>
                    <p>
                      <span className="font-semibold">Capital:</span>{" "}
                      {country.capital?.[0] || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Top Level Domain:</span>{" "}
                      {country.tld?.[0] || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Currencies:</span>{" "}
                      {Object.values(country.currencies)
                        .map((c) => c.name)
                        .join(", ")}
                    </p>
                    <p>
                      <span className="font-semibold">Languages:</span>{" "}
                      {Object.values(country.languages).join(", ")}
                    </p>
                  </div>
                </div>

                {borderCountries.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">
                      Border Countries:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {borderCountries.map((border) => (
                        <Link
                          key={border.cca3}
                          to={`/country/${border.cca3}`}
                          className="px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
                        >
                          {border.name.common}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CountryDetails;
