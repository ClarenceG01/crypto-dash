import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Chart from "../components/Chart";

let USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const SingleCrypto = () => {
  const { pathname, state } = useLocation();
  console.log(state);
  const coin = state?.coin;
  const id = pathname.split("/")[1];

  return (
    <div className="bg-light dark:bg-dark min-h-screen py-3 px-5">
      <div className="flex items-center gap-4 mb-4">
        <img src={coin.image} alt="" className="size-16 md:size-20" />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold dark:text-light">
            {coin.name} Price
          </h1>
          <p className="uppercase dark:text-light">{coin.symbol}</p>
        </div>
        <div
          className={`mt-4 flex flex-col justify-between items-start gap-3 font-semibold  ${
            coin.price_change_percentage_24h < 0 ? "text-red" : "text-green"
          }`}
        >
          <span
            className={`px-2 py-1 rounded-xl ${
              coin.price_change_percentage_24h < 0 ? "bg-red/20" : "bg-green/20"
            }`}
          >
            {coin.price_change_percentage_24h.toFixed(1)}%
          </span>
          <span>${coin.price_change_24h.toFixed(2)}</span>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-lg dark:text-light">
          BTC to USD: 1 Bitcoin equals {USD.format(coin.current_price)}
        </p>
      </div>
      <Chart id={id} />
    </div>
  );
};

export default SingleCrypto;

{
  /* <div>
        <img src={coin?.image?.small} alt="" />
        <h1>{coin?.name}</h1>
      </div>
      <div>
        <p>{coin.description.en}</p>
      </div> */
}
