import axios from "axios";
import { MAXIMUM_RETRIES } from "config/constants/values";
import { useEffect, useState } from "react";
import { useCirculatingSupply } from "./hooks";

export function SupplyUpdater() {
  const [retries, setRetries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [, setCirculatingSupply] = useCirculatingSupply();

  useEffect(() => {
    const fetchCirculatingSupply = async () => {
      try {
        const request = await axios.get(
          "https://api.oh.finance/circulatingSupply"
        );

        setCirculatingSupply(request.data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setRetries(retries + 1);
      }
    };

    if (loading && retries < MAXIMUM_RETRIES) {
      fetchCirculatingSupply();
    }
  });

  return null;
}
