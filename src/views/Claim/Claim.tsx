import { Grid } from "@material-ui/core";
import { ComingSoon } from "components/ComingSoon";
import { PageHeading } from "components/PageHeading";
import { Web3View } from "components/Web3View";
import { timelocks } from "config/constants/timelocks";
import { ClaimSurface } from "./components/ClaimSurface";

const Claim = () => {
  // const vestingData = timelocks.map((timelock))

  return (
    <Web3View>
      <PageHeading title="Claim" subtitle="Unlock Vesting Oh! Tokens" />
      <ComingSoon />
      {/* <Grid container spacing={2} direction="column">
        {timelocks.map((timelock, i) => (
          <Grid item key={i}>
            <ClaimSurface timelock={timelock} />
          </Grid>
        ))}
      </Grid> */}
    </Web3View>
  );
};

export default Claim;
