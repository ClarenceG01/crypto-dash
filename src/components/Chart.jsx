import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ id }) => {
  const [days, setDays] = useState(1);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  console.log(`Chart component for coin with ID: ${id}`);
  const fetchChartData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": `${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      const data = await response.json();

      const priceData = data.prices.map((price) => ({
        date: new Date(price[0]).toLocaleDateString(),
        price: price[1],
      }));
      setData(priceData);
    } catch (error) {
      console.log(error);
      setData([]);
      setError(true);
    }
  };
  useEffect(() => {
    fetchChartData();
  }, [id, days]);
  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error getting chart data. Please try again later.
      </div>
    );
  }
  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-center gap-2">
        <button
          className={`px-3 py-1.5 mr-2 rounded bg-light-foreground shadow-md hover:bg-light-foreground/70 dark:bg-dark-foreground dark:hover:bg-dark-foreground/70 dark:text-light-foreground cursor-pointer transition ${
            days === 1 ? "border border-amber-300" : ""
          }`}
          onClick={() => setDays(1)}
        >
          1d
        </button>
        <button
          className={`px-3 py-1.5 mr-2 rounded bg-light-foreground shadow-md hover:bg-light-foreground/70 dark:bg-dark-foreground dark:hover:bg-dark-foreground/70 dark:text-light-foreground cursor-pointer transition ${
            days === 7 ? "border border-amber-300" : ""
          }`}
          onClick={() => setDays(7)}
        >
          7d
        </button>
        <button
          className={`px-3 py-1.5 mr-2 rounded bg-light-foreground shadow-md hover:bg-light-foreground/70 dark:bg-dark-foreground dark:hover:bg-dark-foreground/70 dark:text-light-foreground cursor-pointer transition ${
            days === 30 ? "border border-amber-300" : ""
          }`}
          onClick={() => setDays(30)}
        >
          1M
        </button>
        <button
          className={`px-3 py-1.5 mr-2 rounded bg-light-foreground shadow-md hover:bg-light-foreground/70 dark:bg-dark-foreground dark:hover:bg-dark-foreground/70 dark:text-light-foreground cursor-pointer transition ${
            days === 365 ? "border border-amber-300" : ""
          }`}
          onClick={() => setDays(365)}
        >
          1Y
        </button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="basic" dataKey="price" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
