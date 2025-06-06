import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import SingleCrypto from "./pages/SingleCrypto";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<SingleCrypto />} />
      </Route>
    </Routes>
  );
};

export default App;
