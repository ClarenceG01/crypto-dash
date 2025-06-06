import { Link } from "react-router-dom";
let USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const CoinHolder = ({ data }) => {
  console.log(data);
  return (
    <Link
      to={`/${data.id}`}
	  state={{ coinData: data }}
      className="bg-light-foreground dark:bg-dark-foreground flex flex-col px-2 py-3 rounded-md shadow-sm mb-2   cursor-pointer hover:scale-102 transition-all duration-300"
    >
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="flex flex-row items-center gap-2">
          <img
            src={data.image}
            alt={`${data.name} image`}
            className="size-10"
          />
          <div className="flex flex-col">
            <span className="uppercase dark:text-light">{data.symbol}</span>
            <span className="text-light-text ">{data.name}</span>
          </div>
        </div>
        <span className="font-bold text-lg dark:text-light">
          {USD.format(data.current_price)}
        </span>
      </div>
      <div
        className={`flex flex-row justify-between items-center font-semibold  ${
          data.price_change_percentage_24h < 0 ? "text-red" : "text-green"
        }`}
      >
        <span
          className={`px-2 py-1 rounded-xl ${
            data.price_change_percentage_24h < 0 ? "bg-red/20" : "bg-green/20"
          }`}
        >
          {data.price_change_percentage_24h.toFixed(1)}%
        </span>
        <span>${data.price_change_24h.toFixed(2)}</span>
      </div>
    </Link>
  );
};

export default CoinHolder;
