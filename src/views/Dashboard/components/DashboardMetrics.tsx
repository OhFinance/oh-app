import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Surface } from "@ohfinance/oh-ui";
import { DisplayValue } from "components/DisplayValue";
import { usePriceManager } from "state/prices/hooks";
import { useCirculatingSupply } from "state/supply/hooks";
import { useLatestTVL } from "state/tvl/hooks";

export const DashboardMetrics = () => {
  const [tvl] = useLatestTVL();
  const [prices] = usePriceManager();
  const [circulatingSupply] = useCirculatingSupply();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Surface>
          {tvl ? (
            <DisplayValue
              title="Total Value Locked"
              value={tvl}
              prefix="$"
              decimals={2}
            />
          ) : (
            <Skeleton width={80} height={40} />
          )}
        </Surface>
      </Grid>
      <Grid item xs={12} md={6}>
        <Surface>
          {prices["OH"] && circulatingSupply ? (
            <DisplayValue
              title="Market Cap"
              value={prices["OH"] * circulatingSupply}
              prefix="$"
              decimals={2}
            />
          ) : (
            <Skeleton width={80} height={40} />
          )}
        </Surface>
      </Grid>
    </Grid>
  );
};
