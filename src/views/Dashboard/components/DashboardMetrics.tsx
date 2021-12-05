import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { DisplayValueCard } from "components/DisplayValue";
import { usePriceManager } from "state/prices/hooks";
import { useCirculatingSupply } from "state/supply/hooks";
import { useCombinedTVL } from "state/tvl/hooks";

export const DashboardMetrics = () => {
  const [tvl] = useCombinedTVL();
  const [prices] = usePriceManager();
  const [circulatingSupply] = useCirculatingSupply();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <DisplayValueCard
          title="Total Value Locked"
          value={tvl}
          prefix="$"
          decimals={2}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        {prices["OH"] && circulatingSupply ? (
          <DisplayValueCard
            title="Market Cap"
            value={prices["OH"] * circulatingSupply}
            prefix="$"
            decimals={2}
          />
        ) : (
          <Skeleton width={80} height={40} />
        )}
      </Grid>
    </Grid>
  );
};
