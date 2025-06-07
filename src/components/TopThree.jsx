import { useEffect, useState } from "react";
import CoinHolder from "./CoinHolder";
const TopThree = () => {
  const [coins, setCoins] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols=btc%2Ceth%2Cbnb%2Csol&sparkline=true",
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
      setCoins(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="pt-2 mx-3 md:pt-4 lg:mx-5 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-5">
      {coins.map((coin) => (
        <CoinHolder key={coin.id} data={coin} />
      ))}
    </div>
  );
};

export default TopThree;
