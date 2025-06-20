import { LineChart, Line } from "recharts";
const Sparkline = ({ data }) => {
  const priceObj = data.map((value, index) => ({ id: index, value }));

  return (
    <LineChart width={150} height={30} data={priceObj}>
      <Line
        type="monotone"
        dataKey="value"
        stroke="#219653"
        strokeWidth={2}
        dot={false}
        activeDot={{ r: 2 }}
      />
    </LineChart>
  );
};

export default Sparkline;
