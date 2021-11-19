import { Grid } from "@material-ui/core";
import banks from "config/constants/banks";
import { Bank } from "config/constants/types";
import { useWeb3 } from "hooks/useWeb3";
import { EarnCard } from "./components/EarnCard";

const Earn = () => {
  const { chainId } = useWeb3();

  return (
    <Grid container justifyContent="center" spacing={4}>
      {banks[chainId].map((bank: Bank, i: number) => (
        <Grid item key={i} xs={12} md={8}>
          <EarnCard bank={bank} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Earn;
