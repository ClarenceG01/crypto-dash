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
    const convertedResult = rate * btcAmount;
    setResult(convertedResult);
  };

  return (
    <div className="flex flex-col py-2 px-4 w-full lg:w-1/3 dark:bg-dark-foreground text-dark  dark:text-light bg-light-foreground rounded-md shadow-sm">
      <h1 className="text-xl font-bold text-gray-900 dark:text-light mb-3 text-center">
        Convert Bitcoin
      </h1>
      <div className="flex flex-col justify-center h-full">
        <div className="w-full mt-4 flex items-center gap-2 justify-center">
          <input
            type="number"
            value={btcAmount}
            onChange={(e) => setBtcAmount(e.target.value)}
            placeholder="Enter BTC Amount"
            className="border border-gray-300 dark:border-gray-700 rounded-md p-2"
          />
          <button className="bg-[#FCF4DB] text-[#FF7C04] font-semibold rounded-md px-4 py-2">
            BTC
          </button>
        </div>
        <div className="w-full mt-4 flex items-center gap-2 justify-center">
          <input
            type="text"
            value={result}
            className="border border-gray-300 dark:border-gray-700 rounded-md p-2 font-semibold"
            placeholder="Converted Amount"
            readOnly
          />
          <select
            value={convertCurrency}
            onChange={(e) => {
              setResult("");
              setConvertCurrency(e.target.value);
            }}
            className=" bg-[#C7E4DB] text-[#219653] font-semibold rounded-md px-2 py-2"
          >
            <option value="kes">KES</option>
            <option value="ltc">LTC</option>
            <option value="xrp">XRP</option>
            <option value="eth">ETH</option>
          </select>
        </div>
      <button
        className="mt-4 mx-auto w-fit bg-[#FF7C04] text-white font-semibold rounded-md px-4 py-2 hover:bg-[#FF7C04]/90 transition-colors"
        onClick={handleConvert}
      >
        Convert
      </button>
      </div>
    </div>
  );
};

export default ConvertBtc;
