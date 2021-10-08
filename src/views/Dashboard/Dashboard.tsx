import { Box, Grid } from "@material-ui/core";
import { ViewHeader } from "components/ViewHeader";
import { Web3View } from "components/Web3View";
import { DashboardGraph } from "./components/DashboardGraph";
import { DashboardMetrics } from "./components/DashboardMetrics";
import { DashboardTabs } from "./components/DashboardTabs";

const Dashboard = () => {
  return (
    <Web3View>
      <ViewHeader
        title="Dashboard"
        subtitle="Track your portfolio and view real-time metrics"
      />
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <DashboardGraph />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardMetrics />
        </Grid>
      </Grid>
      <Box my={4}>
        <DashboardTabs />
      </Box>
    </Web3View>
  );
};

export default Dashboard;
