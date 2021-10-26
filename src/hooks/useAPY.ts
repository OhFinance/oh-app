import { useContext } from "react";
import { APYContext } from "contexts/APYContext";

const useAPY = () => {
  const { banks } = useContext(APYContext);
  return {
    banks,
  };
};

export default useAPY;
