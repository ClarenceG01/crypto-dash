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
    refetchInterval: 1200000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center">
        Error fetching data. Please try again later.
      </div>
    );

  console.log("Trending Coins:", coins);
  return (
    <div className="flex flex-col py-2 px-4  w-full lg:w-1/2 dark:bg-dark-foreground bg-light-foreground rounded-md shadow-sm">
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
    </div>
  );
};

export default Trending;
