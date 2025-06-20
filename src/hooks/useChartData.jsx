import { useState, useEffect } from "react";

const useChartData = (id, days) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
          {
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );
        const json = await res.json();
        const priceData = json.prices.map(([time, price]) => ({
          date: new Date(time).toLocaleDateString(),
          price,
        }));
        setData(priceData);
        setError(false);
      } catch {
        setError(true);
        setData([]);
      }
    };

    fetchData();
  }, [id, days]);

  return { data, error };
};
export default useChartData;
