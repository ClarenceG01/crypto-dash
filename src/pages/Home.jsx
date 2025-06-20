import { useEffect,useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ConvertBtc from "../components/ConvertBtc";
import CoinHolder from "../components/CoinHolder";
import Trending from "../components/Trending";
import fetchTopCrypto from "../utils/topCrypto";
import fetchTrendingCoins from "../utils/trendingCrypto";
const Home = () => {
  const [topCrypto, setTopCrypto] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  // Fetch top cryptocurrencies
  const { data: topCryptoData, isLoading: topLoading } = useQuery({
    queryKey: ["topcrypto"],
    queryFn: fetchTopCrypto,
    refetchOnWindowFocus: false,
    refetchInterval: 600000,
  });
  // Fetch trending cryptocurrencies
  const { data: trendingCoinsData, loading: trendingLoading } = useQuery({
    queryKey: ["trendingCoins"],
    queryFn: fetchTrendingCoins,
    refetchOnWindowFocus: false,
    refetchInterval: 600000,
  });
  const loading = topLoading || trendingLoading;
  useEffect(() => {
    if (topCryptoData) {
      setTopCrypto(topCryptoData);
    }
  }, [topCryptoData]);
  useEffect(() => {
    if (trendingCoinsData) {
      setTrendingCoins(trendingCoinsData);
    }
  }, [trendingCoinsData]);
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <span className="loading loading-spinner text-success loading-xl"></span>
      </div>
    );
  }
  return (
    <div className="bg-light dark:bg-dark min-h-screen transition-colors duration-300 font-inter">
      <div className="pt-2 mx-3 md:pt-4 lg:mx-5 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-5">
      {topCrypto.map((coin) => (
        <CoinHolder key={coin.id} data={coin} />
      ))}
    </div>
      <div className="flex flex-col gap-4 lg:flex-row mt-5 mx-4">
        <Trending coins={trendingCoins} />
        <ConvertBtc />
      </div>
    </div>
  );
};

export default Home;
