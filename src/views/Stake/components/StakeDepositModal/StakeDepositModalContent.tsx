import { Box, ButtonGroup, Grid } from "@material-ui/core";
import { Button, Flex, Subheading, Subtitle, Text } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Tooltip } from "components/Tooltip";
import { Pool } from "config/constants/types";
import { FC } from "react";

export interface StakeDepositModalContentProps {
  pool: Pool;
}

export const StakeDepositModalContent: FC<StakeDepositModalContentProps> = ({
  pool,
}) => {
  return (
    <Box>
      <Flex center p={2}>
        <img src={pool.staked.image} alt={pool.staked.symbol} height={128} />
      </Flex>
      <Flex column center>
        <Subheading>
          <b>{pool.name} Staking</b>
        </Subheading>
        <Flex align="center" mb={2}>
          <Subtitle>Stake {pool.staked.symbol} to earn OH</Subtitle>
          <Flex center ml={1}>
            <Tooltip title="Staking" />
          </Flex>
        </Flex>
      </Flex>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <ButtonGroup fullWidth>
            <Button fullWidth>Unstake</Button>
            <Button fullWidth>Claim</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Flex align="center" justify="space-between">
            <Text>Unclaimed Rewards</Text>
            <Text>
              <b>
                <Balance value={0} suffix=" OH" />
              </b>
            </Text>
          </Flex>
          <Flex align="center" justify="space-between">
            <Text>Unlocked Rewards</Text>
            <Text>
              <b>
                <Balance value={0} suffix=" OH" />
              </b>
            </Text>
          </Flex>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary">
            Claim
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
