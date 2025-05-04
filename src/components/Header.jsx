import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white rounded-xl border-b border-gray-100 shadow-sm sticky top-0 z-50 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 group"
              aria-label="Home"
            >
              <div className="p-1 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 group-hover:from-blue-600 group-hover:to-indigo-700 transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 font-sans">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  World Explorer
                </span>
              </h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <Link
                  to="/favorites"
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 group"
                  aria-label="Favorites"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1 text-gray-500 group-hover:text-indigo-600 transition-colors"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="hidden sm:inline">Favorites</span>
                </Link>

                <div className="hidden md:flex items-center px-3 py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Welcome,{" "}
                    <span className="font-semibold text-indigo-600">
                      {user.email.split("@")[0]}
                    </span>
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow-md"
                  aria-label="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-lg text-sm font-medium text-black bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
