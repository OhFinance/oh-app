import { Box, ButtonGroup, Grid } from "@material-ui/core";
import { Button, Flex, Subheading, Subtitle, Text } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Tooltip } from "components/Tooltip";
import { Pool } from "config/constants/pools";
import { useClaimableRewards } from "hooks/useClaimableRewards";
import { useStakingContract } from "hooks/useContract";
import { DepositsState } from "hooks/useDeposits";
import { FC, useState } from "react";
import { getFullDisplayBalance } from "utils/formatBalances";

export interface StakeDepositModalContentProps {
  pool: Pool;
  deposit?: DepositsState["deposits"][0];
  withdraw: () => Promise<void>;
}

export const StakeDepositModalContent: FC<StakeDepositModalContentProps> = ({
  pool,
  deposit,
  withdraw,
}) => {
  return (
    <Box>
      <Flex center p={2}>
        <img src={pool.token.image} alt={pool.token.symbol} height={128} />
      </Flex>
      <Flex column center>
        <Subheading>
          <b>{pool.label} Staking</b>
        </Subheading>
        <Flex align="center" mb={2}>
          <Subtitle>Withdraw your available {pool.token.symbol}</Subtitle>
          <Flex center ml={1}>
            <Tooltip title="Staking" />
          </Flex>
        </Flex>
      </Flex>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <Flex align="center" justify="space-between">
            <Text>Unlocked Balance</Text>
            <Text>
              <b>
                <Balance
                  value={
                    deposit
                      ? getFullDisplayBalance(
                          deposit.amount,
                          pool.token.decimals
                        )
                      : 0
                  }
                  suffix={` ${pool.token.symbol}`}
                />
              </b>
            </Text>
          </Flex>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={withdraw}
            fullWidth
            variant="contained"
            color="primary"
          >
            Withdraw
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
