export default async function fetchTrendingCoins() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/search/trending",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": `${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.coins;
}
