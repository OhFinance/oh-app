import { Grid } from "@material-ui/core";
import banks from "config/constants/banks";
import { Bank } from "config/constants/types";
import { EarnCard } from "./EarnCard";

export const EarnCardView = () => {
  return (
    <Grid container spacing={4}>
      {banks.map((bank: Bank, i: number) => (
        <Grid item key={i} xs={12} md={6}>
          <EarnCard bank={bank} />
        </Grid>
      ))}
    </Grid>
  );
};
