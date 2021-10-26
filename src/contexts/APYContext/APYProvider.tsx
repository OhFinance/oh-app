import axios from "axios";
import banks from "config/constants/banks";
import { useEffect, useState } from "react";
import { APYContext, APYStore, IAPYContext } from ".";

export const APYProvider = ({ children }) => {
  const [apyState, setApyState] = useState<APYStore>({});
  const addresses = banks.map((bank) => bank.address[bank.chainId]);

  useEffect(() => {
    const fetchAPY = async () => {
      const address = addresses[0];

      if (apyState[address]) {
        return;
      }

      axios
        .get(`https://api.oh.finance/apy?addr=${address}`)
        .then((result) => {
          setApyState({
            [address]: result.data.apys,
            ...apyState,
          });
        })
        .catch((error) => {
          // console.error(error);
          setApyState({
            [address]: [],
            ...apyState,
          });
        });
    };

    if (addresses) {
      fetchAPY();
    }
  }, [addresses, apyState]);

  return (
    <APYContext.Provider
      value={{
        banks: apyState,
      }}
    >
      {children}
    </APYContext.Provider>
  );
};
