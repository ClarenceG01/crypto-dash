import { LineChart, Line } from "recharts";
const Sparkline = ({ data }) => {
  const priceObj = data.map((value, index) => ({ id: index, value }));
console.log(priceObj)
  return (
    <LineChart width={150} height={30} data={priceObj}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
    </LineChart>
  );
};

export default Sparkline;
