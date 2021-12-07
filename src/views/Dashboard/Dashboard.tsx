import { Grid } from "@material-ui/core";
import { DashboardAPYGraph } from "./components/DashboardAPYGraph";
import { DashboardMetrics } from "./components/DashboardMetrics";
import { DashboardSupply } from "./components/DashboardSupply";
import { DashboardTVLGraph } from "./components/DashboardTVLGraph";

const Dashboard = () => {
  return (
    <Grid container spacing={4} justify="center">
      <Grid item xs={12} md={8}>
        <DashboardMetrics />
      </Grid>
      {/* <Grid item xs={12} md={8}>
        <DashboardSupply />
      </Grid> */}
      <Grid item xs={12} md={8}>
        <DashboardTVLGraph />
      </Grid>
      <Grid item xs={12} md={8}>
        <DashboardAPYGraph />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
