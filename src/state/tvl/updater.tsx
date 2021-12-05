// https://api.oh.finance/tvl/latest?addr=all&chain=-1

import axios from "axios";
import { MAXIMUM_RETRIES } from "config/constants/values";
import { useEffect, useState } from "react";
import { useCombinedTVL } from "./hooks";

export function TVLUpdater() {
  const [retries, setRetries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [, setCombinedTVL] = useCombinedTVL();

  useEffect(() => {
    const fetchCombinedTVL = async () => {
      try {
        const value = await axios.get(
          "https://api.oh.finance/tvl/latest?addr=all&chain=-1"
        );

        // console.log(value.data);
        setCombinedTVL(value.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setRetries(retries + 1);
      }
    };

    if (loading && retries < MAXIMUM_RETRIES) {
      fetchCombinedTVL();
    }
  }, [loading, retries, setCombinedTVL]);

  return null;
}
