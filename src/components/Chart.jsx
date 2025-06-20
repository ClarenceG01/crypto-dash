import { useState } from "react";
import useChartData from "../hooks/useChartData";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

const Chart = ({ id }) => {
  const [days, setDays] = useState(1);
  const { data, error } = useChartData(id, days);

  if (error) {
    return (
      <div className="text-red-500 font-semibold  text-center">
        Error getting chart data. Please try again later.
      </div>
    );
  }
  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-center gap-2 duration-300 transition-colors">
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
        <AreaChart width={730} height={250} data={data} margin={{}}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#219653" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#219653" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
                dataKey="time"
                stroke="#6B7280"
                tickLine={false}
                axisLine={false}
             />
          <YAxis domain={["dataMin", "dataMax"]} />
          <CartesianGrid
            strokeDasharray="1 1"
            stroke="#374151"
            strokeOpacity={0.5}
            horizontal={true}
            vertical={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#F3F4F6" }}
            itemStyle={{ color: "#D1D5DB" }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#219653"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
