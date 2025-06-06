import { useLocation } from "react-router-dom";

const SingleCrypto = () => {
  const { state } = useLocation();
  const { coinData } = state;
  console.log(coinData);
  return <div>{coinData.name}</div>;
};

export default SingleCrypto;
