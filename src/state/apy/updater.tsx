import axios from "axios";
import banks from "config/constants/banks";
import { SupportedNetworks } from "config/constants/networks";
import { MAXIMUM_RETRIES } from "config/constants/values";
import { useEffect, useState } from "react";
import { useHistoryAPY } from "./hooks";

export function APYUpdater() {
  const [retries, setRetries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [, setHistoryAPY] = useHistoryAPY();

  useEffect(() => {
    const fetchHistoryAPY = async () => {
      try {
        const allBanks = SupportedNetworks.map(
          (chainId) => banks[chainId]
        ).flat();

        const requests = await Promise.all(
          allBanks.map((bank) =>
            axios.get(
              `https://api.oh.finance/apy/history?chain=${bank.chainId}&addr=${
                bank.address[bank.chainId]
              }`
            )
          )
        );

        const apys = [];
        requests.forEach((request) => {
          apys.push({
            chainId: request.data.chain,
            data: request.data.data,
          });
        });

        setHistoryAPY(apys);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setRetries(retries + 1);
      }
    };

    if (loading && retries < MAXIMUM_RETRIES) {
      fetchHistoryAPY();
    }
  }, [loading, retries, setHistoryAPY]);

  return null;
}
