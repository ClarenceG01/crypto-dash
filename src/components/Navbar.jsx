import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useThemeContext } from "../context/themeContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
const Navbar = () => {
  const { darkTheme, setDarkTheme } = useThemeContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
        console.log(data.coins);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (debouncedSearch) {
      fetchData();
    } else {
      setSearchResult([]);
    }
  }, [debouncedSearch]);

  return (
    <nav className="max-w-screen py-2 px-2 flex items-center justify-between bg-light-foreground text-dark dark:bg-dark-foreground dark:text-light transition-colors duration-300  shadow-md">
      <h1 className="text-lg text-gray-900 dark:text-gray-100">
        Crypto<span>Dash</span>
      </h1>
      <div className="relative w-[150px] md:w-[250px] lg:w-[350px] flex items-center gap-2">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[150px] md:w-[200px] lg:w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 ml-4 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          placeholder="Search trending coins..."
        />

        {loading && (
          <div className="absolute top-12 left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md p-4">
            <p className="text-gray-500 dark:text-gray-300">Loading...</p>
          </div>
        )}
        {searchResult.length > 0 && (
          <div className="w-[300px] md:w-full max-h-screen absolute top-96 md:top-88 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-foreground shadow-lg rounded-md p-4 z-10">
            <ul className="max-h-screen overflow-y-auto">
              {searchResult.map((coin) => (
                <Link
                  to={`/${coin.id}`}
                  key={coin.id}
                  onClick={() => {
                    setSearchResult([]);
                    setSearchTerm("");
                  }}
                >
                  <li
                    key={coin.id}
                    className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-dark border-b border-light-text dark:border-light-foreground cursor-pointer transition-colors duration-500"
                  >
                    <img src={coin.thumb} alt={`${coin.name} image`} />
                    <div className="flex flex-col">
                      <span className=" ">{coin.name}</span>
                      <span className="uppercase text-light-text ">
                        {coin.symbol}
                      </span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => setDarkTheme(!darkTheme)}
          className="ml-4 p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
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
    </nav>
  );
};

export default Navbar;
