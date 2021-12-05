import { Box, Grid } from "@material-ui/core";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Subheading,
  Subtitle,
  Surface,
  Text,
} from "@ohfinance/oh-ui";
import { ComingSoon } from "components/ComingSoon";
import { DisplayValueCard } from "components/DisplayValue";
import { pools } from "config/constants/pools";
import { useWeb3 } from "hooks/useWeb3";
import { isLocalhost } from "utils/misc";
import { StakePoolCard } from "./components/StakePoolCard";
import { StakeClaimTable } from "./components/StakeClaimTable";
import { StakeDepositTable } from "./components/StakeDepositTable";
import { StakePoolTable } from "./components/StakePoolTable";
import { Tooltip, TooltipText } from "components/Tooltip";
import { Balance } from "components/Balance";

const Stake = () => {
  const local = isLocalhost();
  const { chainId } = useWeb3();

  if (!local) {
    return <ComingSoon />;
  }

  if (!chainId) {
    return null;
  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} md={8}>
        <Surface>
          <Heading align="left">
            <b>Oh! Staking</b>
          </Heading>
          <Flex align="center">
            <Subtitle align="left" color="textSecondary">
              Lock Tokens to earn Oh! Rewards
            </Subtitle>
            <Flex center ml={1}>
              <Tooltip title={<TooltipText>GET STAKED</TooltipText>} />
            </Flex>
          </Flex>
          <Flex align="center" justify="space-between">
            <Text align="center">Total Value Staked</Text>
            <Flex center>
              <Subheading align="center">
                <b>
                  <Balance value={0} prefix="$" />
                </b>
              </Subheading>
            </Flex>
          </Flex>
          <Flex align="center" justify="space-between">
            <Text align="center">Total Amount Claimed</Text>
            <Flex center>
              <Subheading align="center">
                <b>
                  <Balance value={0} prefix="$" />
                </b>
              </Subheading>
            </Flex>
          </Flex>
        </Surface>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DisplayValueCard
              title="Staked"
              value={0}
              decimals={2}
              prefix="$"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DisplayValueCard
              title="Unclaimed Rewards"
              value={0}
              decimals={2}
              prefix="$"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={8}>
        <StakePoolTable pools={pools[chainId]} />
        {/* <Grid container spacing={2}>
          {pools[chainId].map((pool, i) => (
            <Grid item key={i} xs={12}>
              <StakePoolCard pool={pool} />
            </Grid>
          ))}
        </Grid> */}
      </Grid>

      <Grid item xs={12} md={8}>
        <StakeDepositTable />
      </Grid>

      <Grid item xs={12} md={8}>
        <StakeClaimTable />
      </Grid>
    </Grid>
  );
};

export default Stake;
