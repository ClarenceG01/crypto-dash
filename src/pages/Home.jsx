import TopThree from "../components/TopThree";
import Trending from "../components/Trending";
const Home = () => {
  return (
    <div className="bg-light dark:bg-dark min-h-screen transition-colors duration-300 font-inter">
      <TopThree />
      <Trending />
    </div>
  );
};

export default Home;
