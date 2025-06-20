import { useLocation } from "react-router-dom";
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";

const AllTrending = () => {
  const { state } = useLocation();
  return (
    <table className="table table-xs md:table-md w-fit md:w-full border border-base-content/5 bg-light-foreground dark:bg-dark-foreground mx-auto">
      <tbody>
        {state.map((coin) => (
          <tr key={coin.item.id}>
            <td>
              <img
                src={coin.item.small}
                alt={`${coin.item.name} image`}
                className="size-8"
              />
            </td>
            <td>
              <div className="flex flex-col w-[100px]">
                <span className="uppercase font-semibold text-dark dark:text-light">
                  {coin.item.symbol}
                </span>
                <span className="text-light-text">{coin.item.name}</span>
              </div>
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
            <td>
              <span className="font-semibold text-dark dark:text-light">
                ${coin.item.data.price.toFixed(2)}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllTrending;
