import { Link } from "react-router-dom";
import AllTrending from "../components/AllTrending";
import { IoIosArrowBack } from "react-icons/io";

const TrendingCoin = () => {
  return (
    <div className="bg-light-foreground dark:bg-dark min-h-screen p-3 md:px-18 md:py-6 flex flex-col ">
      
        <Link
          to="/"
          className="mb-4 flex items-center gap-2 text-gray-900 dark:text-light"
        >
          <IoIosArrowBack className="h-6 w-6" />
		  Back to Home
        </Link>
   
      <AllTrending />
    </div>
  );
};

export default TrendingCoin;
