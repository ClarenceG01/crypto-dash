import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchExchangeRates = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/exchange_rates",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": `${import.meta.env.VITE_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};
const ConvertBtc = () => {
  const [btcAmount, setBtcAmount] = useState(1);
  const [convertCurrency, setConvertCurrency] = useState("kes");
  const [result, setResult] = useState("");
  const {
    data: exchangeRates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
    refetchOnWindowFocus: false,
    refetchInterval: 3600000,
  });
  const handleConvert = () => {
    const rate = exchangeRates?.[convertCurrency]?.value;
    const convertedResult = rate * btcAmount.toFixed(2);
    setResult(convertedResult);
  };

  return (
    <div className="flex flex-col py-2 px-4 w-full lg:w-1/2 dark:bg-dark-foreground bg-light-foreground rounded-md shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-light mb-3 text-center">
        Convert Bitcoin
      </h1>
      {error && <div className="text-red-500 text-center">{error.message}</div>}
      <div className="relative">
        <input
          type="number"
          value={btcAmount}
          onChange={(e) => setBtcAmount(e.target.value)}
          placeholder="Enter BTC Amount"
          className="border border-gray-300 dark:border-gray-700 rounded-md p-2"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FCF4DB] text-[#FF7C04] font-semibold rounded-md px-4 py-2">
          BTC
        </button>
      </div>
      <div className="relative mt-4">
        <input
          type="text"
          value={result}
          className="border border-gray-300 dark:border-gray-700 rounded-md p-2"
          placeholder="Converted Amount"
          readOnly
        />
        <select
          value={convertCurrency}
          onChange={(e) => {
            setResult("");
            setConvertCurrency(e.target.value);
          }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#C7E4DB] text-[#219653] font-semibold rounded-md px-2 py-2"
        >
          <option value="kes">KES</option>
          <option value="ltc">LTC</option>
          <option value="xrp">XRP</option>
          <option value="eth">ETH</option>
        </select>
      </div>
      <button
        className="mt-4 w-full bg-[#FF7C04] text-white font-semibold rounded-md px-4 py-2 hover:bg-[#FF7C04]/90 transition-colors"
        onClick={handleConvert}
      >
        {isLoading ? "Loading..." : "Convert"}
      </button>
    </div>
  );
};

export default ConvertBtc;
