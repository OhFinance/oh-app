import { Grid } from "@material-ui/core";
import { Timelock, timelocks } from "config/constants/timelocks";
import { useWeb3 } from "hooks/useWeb3";
import { ClaimCard } from "./components/ClaimCard";

const Claim = () => {
  const { chainId } = useWeb3();

  if (!chainId || chainId !== 1) {
    return null;
  }

  return (
    <Grid container justifyContent="center" spacing={4}>
      {timelocks.map((timelock: Timelock, i: number) => (
        <Grid item key={i} xs={12} md={8}>
          <ClaimCard timelock={timelock} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Claim;
