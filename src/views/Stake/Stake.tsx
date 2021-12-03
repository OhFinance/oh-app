import { Box, Grid } from "@material-ui/core";
import { Flex } from "@ohfinance/oh-ui";
import { ComingSoon } from "components/ComingSoon";
import { pools } from "config/constants/pools";
import { useWeb3 } from "hooks/useWeb3";
import { isLocalhost } from "utils/misc";
import { StakePoolCard } from "./components/StakePoolCard";
import { StakeValueCard } from "./components/StakeValueCard";

const Stake = () => {
  const local = isLocalhost();
  const { chainId } = useWeb3()

  if (!local) {
    return <ComingSoon />;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <StakeValueCard title="Total Staked" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StakeValueCard title="Pending Rewards" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StakeValueCard title="Active Pools" />
        </Grid>
      </Grid>

      <Box mt={2}>
        <Grid container spacing={2}>
        {pools[chainId].map((pool, i) => (
          <Grid item key={i} xs={12}>
            <StakePoolCard pool={pool} />
          </Grid>
        ))}
        </Grid>
      </Box>
      
    </Box>
  )
};

export default Stake;
