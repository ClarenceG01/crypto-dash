import { useQuery } from "@tanstack/react-query";

const fetchTrendingCoins = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/search/trending",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": `${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.coins;
};

const Trending = () => {
  const {
    data: coins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["trendingCoins"],
    queryFn: fetchTrendingCoins,
    refetchOnWindowFocus: false,
    refetchInterval: 300000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  console.log("Trending Coins:", coins);
  return (
    <div className="flex flex-col py-2 px-4 mt-3.5 mx-3  lg:mx-5 md:w-1/2 dark:bg-dark-foreground bg-light-foreground rounded-md shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-light mb-3 text-center">
        Trending Coins
      </h1>
      <table className="">
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
              <td>${coin.item.data.price.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center ">
        <button className="w-fit mt-2 px-4 py-1.5 dark:bg-dark dark:text-light rounded-md shadow-md border border-light dark:hover:bg-dark/60 hover:bg-light cursor-pointer transition-colors">
          View All
        </button>
      </div>
    </div>
  );
};

export default Trending;
