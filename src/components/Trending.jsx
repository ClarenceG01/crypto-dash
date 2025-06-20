import { Link } from "react-router-dom";
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";

const Trending = ({coins}) => {
  return (
    <div className="flex flex-col pt-2 px-4  w-full dark:bg-dark-foreground bg-light-foreground rounded-md shadow-sm">
      <h1 className="text-xl font-bold text-gray-900 dark:text-light mb-3 text-center">
        Trending Coins
      </h1>
      <table className="table table-xs md:table-sm w-full md:w-full border border-base-content/5 bg-light-foreground text-dark dark:bg-dark-foreground mx-auto">
        <tbody>
          {coins.slice(0, 5).map((coin) => (
            <tr
              key={coin.item.id}
              className=" border-b border-gray-200 dark:border-gray-700 dark:text-light hover:bg-light dark:hover:bg-gray-800 transition-colors"
            >
              <td className="font-semibold">
                {coin.item.symbol.toUpperCase()}USDT
              </td>
              <td>
                <img
                  src={coin.item.small}
                  alt={coin.item.name}
                  className="my-1.5 w-8 h-8"
                />
              </td>
              <td>
                <div
                  className={`px-2 py-1 rounded-xl font-semibold flex items-center gap-2 w-fit ${
                    coin.item.data.price_change_percentage_24h.usd < 0
                      ? "bg-red/20 text-red"
                      : "bg-green/20 text-green"
                  }`}
                >
                  <span>
                    {coin.item.data.price_change_percentage_24h.usd < 0 ? (
                      <IoMdTrendingDown className="" />
                    ) : (
                      <IoMdTrendingUp className="" />
                    )}
                  </span>
                  <span>
                    {coin.item.data.price_change_percentage_24h.usd.toFixed(1)}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        className="mx-auto my-3 w-fit bg-light text-dark dark:bg-gray-800 dark:border dark:border-light dark:text-light px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        to="/trending"
        state={coins}
      >
        View More
      </Link>
    </div>
  );
};

export default Trending;
