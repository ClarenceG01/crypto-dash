import ConvertBtc from "../components/ConvertBtc";
import TopThree from "../components/TopThree";
import Trending from "../components/Trending";
const Home = () => {
  return (
    <div className="bg-light dark:bg-dark min-h-screen transition-colors duration-300 font-inter">
      <TopThree />
      <div className="flex flex-col gap-4 lg:flex-row mt-5 mx-4">
        <Trending />
        <ConvertBtc />
      </div>
    </div>
  );
};

export default Home;
