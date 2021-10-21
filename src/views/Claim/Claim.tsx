import { Grid } from "@material-ui/core";
import { PageHeading } from "components/PageHeading";
import { Web3View } from "components/Web3View";
import { timelocks } from "config/constants/timelocks";
import { ClaimSurface } from "./components/ClaimSurface";

const Claim = () => {
  return (
    <Web3View>
      <PageHeading title="Claim" subtitle="Unlock Vesting Oh! Tokens" />
      <Grid container spacing={2} direction="column">
        {timelocks.map((timelock, i) => (
          <Grid item key={i}>
            <ClaimSurface timelock={timelock} />
          </Grid>
        ))}
      </Grid>
    </Web3View>
  );
};

export default Claim;
