import { Typography } from "@material-ui/core";
import { Surface } from "@ohfinance/oh-ui";
import { DisplayValue } from "components/DisplayValue";

export const DashboardMetrics = () => {
  return (
    <Surface>
      <Typography variant="h6">Metrics</Typography>
      <DisplayValue title="Total Value Locked" value="$1,000,000" />
      <DisplayValue title="My Value Locked" value="$100,000" />
      <DisplayValue title="Total Value Locked" value="$1,000,000" />
    </Surface>
  );
};
