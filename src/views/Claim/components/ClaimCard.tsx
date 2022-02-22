import { Box, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import {
  Button,
  Flex,
  Heading,
  Subheading,
  Subtitle,
  Surface,
  Text,
} from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { LinkButton } from "components/LinkButton";
import { Tooltip, TooltipText } from "components/Tooltip";
import { Timelock } from "config/constants/types";
import { useAddress } from "hooks/useAddress";
import { useTimelockContract } from "hooks/useContract";
import { useNetwork } from "hooks/useNetwork";
import { useCallback, useMemo, useState } from "react";
import { TransactionType } from "state/transactions/actions";
import { useTransactionAdder } from "state/transactions/hooks";
import { getFullDisplayBalance } from "utils/formatBalances";
import { dateDiffInDays, now } from "utils/misc";
import { useClaimData } from "../hooks/useClaimData";

export const ClaimCard = ({ timelock }: { timelock: Timelock }) => {
  const [pendingTx, setPendingTx] = useState<boolean>(false);
  const addTransaction = useTransactionAdder();
  const { blockExplorerUrl } = useNetwork();

  const address = useAddress(timelock.address);
  const timelockContract = useTimelockContract(address);
  const { timelockStart, totalClaimBalance, claimedBalance, claimableBalance } =
    useClaimData(address);

  const total = useMemo(() => {
    return totalClaimBalance && getFullDisplayBalance(totalClaimBalance);
  }, [totalClaimBalance]);

  const locked = useMemo(() => {
    return (
      totalClaimBalance &&
      claimedBalance &&
      claimableBalance &&
      getFullDisplayBalance(
        totalClaimBalance.minus(claimedBalance).minus(claimableBalance)
      )
    );
  }, [totalClaimBalance, claimedBalance, claimableBalance]);

  const claimed = useMemo(() => {
    return claimedBalance && getFullDisplayBalance(claimedBalance);
  }, [claimedBalance]);

  const claimable = useMemo(() => {
    return claimableBalance && getFullDisplayBalance(claimableBalance);
  }, [claimableBalance]);

  const handleClaim = useCallback(async () => {
    setPendingTx(true);

    await timelockContract
      .claim()
      .then((response) => {
        addTransaction(response, {
          type: TransactionType.OH_VESTING,
        });
        setPendingTx(false);
      })
      .catch((error) => {
        setPendingTx(false);
      });
  }, [addTransaction, timelockContract]);

  const getDays = useCallback(() => {
    if (timelockStart * 1000 > now()) {
      const start = new Date(now());
      const end = new Date(timelockStart * 1000);
      return dateDiffInDays(start, end);
    } else {
      const start = new Date(timelockStart * 1000);
      const end = new Date(timelock.lockPeriod * 1000 + timelockStart * 1000);
      return dateDiffInDays(start, end);
    }
  }, [timelockStart, timelock]);

  if (totalClaimBalance && totalClaimBalance.eq(0)) {
    return null;
  }

  return (
    <Surface>
      <Flex align="center" justify="space-between">
        <Heading>{timelock.name}</Heading>
        <LinkButton link={`${blockExplorerUrl}/address/${address}`}>
          Contract
        </LinkButton>
      </Flex>
      <Subtitle color="textSecondary">
        {timelock.lockPeriod / 60 / 60 / 24 / 30} Month Linear Unlock{" "}
        {timelockStart &&
          `- ${timelockStart * 1000 > now() ? "Starting" : "Ending"} in 
           ${getDays()} Days`}
      </Subtitle>
      <Box my={4}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Flex align="center" justify="space-between">
              <Flex>
                <Text>Total Tokens</Text>
                <Flex center ml={1}>
                  <Tooltip
                    title={
                      <TooltipText>Total tokens allocated to you</TooltipText>
                    }
                  />
                </Flex>
              </Flex>
              {total ? (
                <Subheading>
                  <b>
                    <Balance value={total} />
                  </b>
                </Subheading>
              ) : (
                <Skeleton width={80} height={40} />
              )}
            </Flex>
          </Grid>
          <Grid item>
            <Flex align="center" justify="space-between">
              <Flex>
                <Text>Locked</Text>
                <Flex center ml={1}>
                  <Tooltip
                    title={
                      <TooltipText>
                        Total tokens that are still vesting
                      </TooltipText>
                    }
                  />
                </Flex>
              </Flex>
              {locked ? (
                <Subheading>
                  <b>
                    <Balance value={locked} />
                  </b>
                </Subheading>
              ) : (
                <Skeleton width={80} height={40} />
              )}
            </Flex>
          </Grid>
          <Grid item>
            <Flex align="center" justify="space-between">
              <Flex>
                <Text>Unlocked</Text>
                <Flex center ml={1}>
                  <Tooltip
                    title={
                      <TooltipText>Total tokens already claimed</TooltipText>
                    }
                  />
                </Flex>
              </Flex>
              {claimed ? (
                <Subheading>
                  <b>
                    <Balance value={claimed} />
                  </b>
                </Subheading>
              ) : (
                <Skeleton width={80} height={40} />
              )}
            </Flex>
          </Grid>
          <Grid item>
            <Flex align="center" justify="space-between">
              <Flex>
                <Text>Unclaimed</Text>
                <Flex center ml={1}>
                  <Tooltip
                    title={
                      <TooltipText>Total tokens available to claim</TooltipText>
                    }
                  />
                </Flex>
              </Flex>
              {claimable ? (
                <Subheading>
                  <b>
                    <Balance
                      value={timelockStart * 1000 > now() ? 0 : claimable}
                    />
                  </b>
                </Subheading>
              ) : (
                <Skeleton width={80} height={40} />
              )}
            </Flex>
          </Grid>
        </Grid>
      </Box>
      <Button
        fullWidth
        variant="contained"
        size="large"
        color="primary"
        disabled={pendingTx || !claimableBalance || claimableBalance.eq(0)}
        onClick={handleClaim}
      >
        Claim
      </Button>
    </Surface>
  );
};
