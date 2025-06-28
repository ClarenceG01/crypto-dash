import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useThemeContext } from "../context/themeContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { darkTheme, setDarkTheme } = useThemeContext();
  const { user, logout, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const debouncedSearch = useDebounce(searchTerm);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${debouncedSearch}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": `${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        const data = await response.json();
        setSearchResult(data.coins);
      } catch {
        setSearchResult([]);
      }
    };
    if (debouncedSearch) {
      fetchData();
    } else {
      setSearchResult([]);
    }
  }, [debouncedSearch]);

  return (
    <nav className="max-w-screen py-2 px-4 flex flex-col bg-light-foreground text-dark dark:bg-dark-foreground dark:text-light transition-colors duration-300 shadow-md gap-3">
      {/* First Row: Logo, Watchlist, Auth UI, and Theme Toggle */}
      <div className="flex items-center justify-between">
        {/* Left side: Logo and Watchlist */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/">
            <h1 className="text-lg text-gray-900 dark:text-gray-100 font-logo">
              CryptoDash
            </h1>
          </Link>
          <Link to="/watchlist" className="text-sm sm:text-base font-semibold text-primary-600 dark:text-primary-400 hover:underline">
            Watchlist
          </Link>
        </div>

        {/* Right side: Auth UI and Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Auth UI: Show login/signup if not logged in, else show user and logout */}
          {!loading && !user && (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors">Login</Link>
              <Link to="/signup" className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-md bg-gray-300 text-dark hover:bg-gray-400 transition-colors">Sign Up</Link>
            </div>
          )}
          {!loading && user && (
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-200">{user.displayName}</span>
              <button
                onClick={logout}
                className="px-2 py-1 sm:px-3 sm:py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
          
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkTheme(!darkTheme)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {darkTheme ? (
              <MdLightMode
                className="text-gray-900 dark:text-gray-100"
                size={20}
              />
            ) : (
              <MdDarkMode
                className="text-gray-900 dark:text-gray-100"
                size={20}
              />
            )}
          </button>
        </div>
      </div>

      {/* Second Row: Search Bar */}
      <div className="relative w-full">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-dark dark:text-light placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Search trending coins..."
        />

        {loading && (
          <div className="absolute top-12 left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 z-20">
            <p className="text-gray-500 dark:text-gray-300">Loading...</p>
          </div>
        )}
        {searchResult.length > 0 && (
          <div className="absolute top-12 left-0 w-full max-h-64 bg-white dark:bg-dark-foreground shadow-lg rounded-md p-2 z-20 overflow-y-auto">
            <ul className="space-y-1">
              {searchResult.map((coin) => (
                <Link
                  to={`/${coin.id}`}
                  key={coin.id}
                  onClick={() => {
                    setSearchResult([]);
                    setSearchTerm("");
                  }}
                >
                  <li className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors duration-200">
                    <img src={coin.thumb} alt={`${coin.name} image`} className="w-6 h-6" />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-medium text-dark dark:text-light truncate">{coin.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">{coin.symbol}</span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
