import axios from "axios";
import banks from "config/constants/banks";
import { MAXIMUM_RETRIES } from "config/constants/values";
import { useEffect, useState } from "react";

export function APYUpdater() {
  const [retries, setRetries] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricalAPY = async () => {
      try {
        const values = await Promise.all([
          axios.get(
            `https://api.oh.finance/apy/history?chain=1&timespan_days=1&addr=${banks[1][0].address[1]}`
          ),
          axios.get(
            `https://api.oh.finance/apy/history?chain=43114&timespan_days=1&addr=${banks[43114][0].address[43114]}`
          ),
        ]);

        setLoading(false);
      } catch (e) {
        console.error(e);
        setRetries(retries + 1);
      }
    };

    if (loading && retries < MAXIMUM_RETRIES) {
      fetchHistoricalAPY();
    }
  }, []);

  return null;
}
