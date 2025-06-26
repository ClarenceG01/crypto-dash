import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import SingleCrypto from "./pages/SingleCrypto";
import TrendingCoin from "./pages/TrendingCoin";
import { WatchlistProvider } from "./context/WatchlistContext";
import { WatchlistPage } from "./pages/WatchlistPage";

const App = () => {
  return (
    <WatchlistProvider>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<SingleCrypto />} />
        <Route path="/trending" element={<TrendingCoin />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Route>
    </Routes>
    </WatchlistProvider>
  );
};

export default App;
