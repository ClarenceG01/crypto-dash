import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import SingleCrypto from "./pages/SingleCrypto";
import TrendingCoin from "./pages/TrendingCoin";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<SingleCrypto />} />
        <Route path="/trending" element={<TrendingCoin />} />
      </Route>
    </Routes>
  );
};

export default App;
