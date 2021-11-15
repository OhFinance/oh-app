import axios from "axios";
import banks from "config/constants/banks";
import { MAXIMUM_RETRIES } from "config/constants/values";
import { useEffect, useState } from "react";
import { useBankAPYManager } from "./hooks";

export function BankUpdater() {
  const [retries, setRetries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [setBankAPYData] = useBankAPYManager();

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

        let bankAPYs = [];
        values.forEach((value, i) => {
          const bank = banks[i];
          bankAPYs.push({
            chainId: bank.chainId,
            address: bank.address[bank.chainId],
            apys: value.data.apys,
          });
        });
        setBankAPYData(bankAPYs);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setRetries(retries + 1);
      }
    };

    if (loading && retries < MAXIMUM_RETRIES) {
      fetchAPY();
    }
  }, [loading, retries, setBankAPYData]);

  return null;
}
