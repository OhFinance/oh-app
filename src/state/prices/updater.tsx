import axios from "axios";
import {
  supportedTokenPrices,
  supportedTokenIds,
} from "config/constants/tokens";
import { MAXIMUM_RETRIES } from "config/constants/values";
import { useEffect, useState } from "react";
import { usePriceManager } from "./hooks";

export function PriceUpdater() {
  const [retries, setRetries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [, setPrices] = usePriceManager();

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const tokenIds = supportedTokenPrices.map(
          (symbol) => supportedTokenIds[symbol]
        );
        const tokenQueryString = tokenIds.join(",");
        const request = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${tokenQueryString}&vs_currencies=usd`
        );

        const prices = {};
        supportedTokenPrices.forEach((symbol) => {
          prices[symbol] = request.data[supportedTokenIds[symbol]]["usd"];
        });

        setPrices(prices);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setRetries(retries + 1);
      }
    };

    if (loading && retries < MAXIMUM_RETRIES) {
      fetchPrices();
    }
  }, [loading, retries, setPrices]);

  return null;
}
