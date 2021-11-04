import { useContext } from "react";
import { APYContext } from "contexts/APYContext";

const useAPY = () => {
  const apys = useContext(APYContext);
  return apys;
};

export default useAPY;
