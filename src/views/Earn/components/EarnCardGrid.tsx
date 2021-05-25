import { Grid } from "@material-ui/core";
import { EarnCard } from "./EarnCard";

export const EarnCardGrid = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <EarnCard />
      </Grid>
    </Grid>
  );
};
