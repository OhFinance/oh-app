// https://api.oh.finance/tvl/latest?addr=all&chain=-1

import axios from "axios";
import banks from "config/constants/banks";
import { SupportedNetworks } from "config/constants/networks";
import { MAXIMUM_RETRIES } from "config/constants/values";
import { useEffect, useState } from "react";
import { useHistoryTVL, useLatestTVL } from "./hooks";

export function TVLUpdater() {
  const [retries, setRetries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [latest, setLatestTVL] = useLatestTVL();
  const [, setHistoryTVL] = useHistoryTVL();

  useEffect(() => {
    const fetchLatestTVL = async () => {
      try {
        const request = await axios.get(
          "https://api.oh.finance/tvl/latest?addr=all&chain=-1"
        );

        setLatestTVL(request.data.data[0].tvl);
      } catch (e) {
        console.error(e);
        setRetries(retries + 1);
      }
    };

    if (!latest && retries < MAXIMUM_RETRIES) {
      fetchLatestTVL();
    }
  }, [latest, retries, setLatestTVL]);

  useEffect(() => {
    const fetchHistoryTVL = async () => {
      try {
        const allBanks = SupportedNetworks.map(
          (chainId) => banks[chainId]
        ).flat();

        const requests = await Promise.all([
          axios.get("https://api.oh.finance/tvl/history?addr=all&chain=-1"),
          ...allBanks.map((bank) =>
            axios.get(
              `https://api.oh.finance/tvl/history?addr=${
                bank.address[bank.chainId]
              }&chain=${bank.chainId}`
            )
          ),
        ]);

        const tvls = [];
        requests.forEach((req) => {
          tvls.push({
            chainId: req.data.chain,
            data: req.data.data,
          });
        });

        setHistoryTVL(tvls);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setRetries(retries + 1);
      }
    };

    if (loading && retries < MAXIMUM_RETRIES) {
      fetchHistoryTVL();
    }
  }, [loading, retries, setHistoryTVL]);

  return null;
}
