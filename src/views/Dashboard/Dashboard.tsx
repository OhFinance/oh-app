import { Grid } from "@material-ui/core";
import { DashboardGraph } from "./components/DashboardGraph";
import { DashboardMetrics } from "./components/DashboardMetrics";

const Dashboard = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <DashboardGraph />
      </Grid>
      <Grid item xs={12} md={4}>
        <DashboardMetrics />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
