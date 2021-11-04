import axios from "axios";
import banks from "config/constants/banks";
import { useEffect, useState } from "react";
import { APYContext, IAPYContext } from "./APYContext";

export const APYProvider = ({ children }) => {
  const [apyState, setApyState] = useState<IAPYContext>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPY = async () => {
      try {
        const values = await Promise.all(
          banks.map((bank) =>
            axios.get(
              `https://api.oh.finance/apy?chain=${bank.chainId}&addr=${
                bank.address[bank.chainId]
              }`
            )
          )
        );

        let nextState = {};
        values.forEach((value, i) => {
          nextState[banks[i].chainId] = {
            [banks[i].address[banks[i].chainId]]: value.data.apys,
            ...nextState[banks[i].chainId],
          };
        });
        setApyState(nextState);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    if (loading) {
      fetchAPY();
    }
  }, [loading, apyState]);

  return <APYContext.Provider value={apyState}>{children}</APYContext.Provider>;
};
