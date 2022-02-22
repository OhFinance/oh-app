import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Grid } from "@material-ui/core";
import {
  Flex,
  Heading,
  Subheading,
  Subtitle,
  Surface,
  Text,
} from "@ohfinance/oh-ui";
import { ComingSoon } from "components/ComingSoon";
import { DisplayValueCard } from "components/DisplayValue";
import { Pool, POOLS } from "config/constants/pools";
import { useWeb3 } from "hooks/useWeb3";
import { isLocalhost } from "utils/misc";
import { StakeClaimTable } from "./components/StakeClaimTable";
import { StakeDepositTable } from "./components/StakeDepositTable";
import { StakePoolTable } from "./components/StakePoolTable";
import { Tooltip, TooltipText } from "components/Tooltip";
import { Balance } from "components/Balance";
import { usePoolsRewards } from "state/staking/hooks";
import BigNumber from "bignumber.js";
import { getFullDisplayBalance } from "utils/formatBalances";
import { useAppSelector } from "state";
import { SkipFirst } from "types/tuples";
import { usePriceManager } from "state/prices/hooks";
import { TEN, ZERO } from "utils/bigNumber";
import useCoingeckoUsdPrice from "hooks/useCoingeckoPrice";
import tokens from "config/constants/tokens";

// all values decimal formatted
interface TVLState {
  byPoolTvl: { [pool: string]: { value: BigNumber; usdPrice?: number } };
  byPoolUserStake: { [pool: string]: { value: BigNumber; usdPrice?: number } };
  byPoolUserUnclaimed: {
    [pool: string]: { value: BigNumber; usdPrice?: number };
  };
}

function updateTVLState(
  setter: React.Dispatch<React.SetStateAction<TVLState>>,
  key: keyof TVLState,
  pool: Pool,
  value: { value: BigNumber; usdPrice?: number }
) {
  setter((prev) => ({
    ...prev,
    [key]: { ...prev[key], [pool.poolAddress]: value },
  }));
}
export type TVLStateUpdater = (
  ...args: SkipFirst<Parameters<typeof updateTVLState>, 1>
) => void;

const Stake = () => {
  const local = isLocalhost();
  const { chainId } = useWeb3();

  const poolsRewards = usePoolsRewards();
  console.log({
    poolsRewards: {
      ...poolsRewards,
      poolsWithTvl: poolsRewards.poolsWithTvl?.map((p) => ({
        ...p,
        tvl: p.tvl.toFixed(3, 1),
      })),
    },
  });
  const rewardPrice = useCoingeckoUsdPrice(
    "0x949d48eca67b17269629c7194f4b727d4ef9e5d6"
  );

  // Not ideal way of setting tvl state, but the app crashes without any error message when setting it on redux
  const [allTvl, setAllTvl] = useState<TVLState>({
    byPoolTvl: {},
    byPoolUserStake: {},
    byPoolUserUnclaimed: {},
  });

  const useUpdateTVLState = useCallback(
    (...args: SkipFirst<Parameters<typeof updateTVLState>, 1>) => {
      updateTVLState(setAllTvl, ...args);
    },
    [setAllTvl]
  );

  // const useLoadTvl = useCallback(
  //   (pool: Pool, tvl: string) => {
  //     setAllTvl((prev) => ({
  //       byPool: { ...prev.byPool, [pool.poolAddress]: tvl },
  //       tvl: prev.tvl.plus(new BigNumber(tvl)),
  //     }));
  //   },
  //   [setAllTvl]
  // );

  const totalValueLocked = useMemo(() => {
    let end = new BigNumber(0);
    for (let [key, value] of Object.entries(allTvl.byPoolTvl)) {
      // todo: price per token

      let usd =
        value.usdPrice !== undefined
          ? new BigNumber(value.value).multipliedBy(value.usdPrice)
          : ZERO;
      end = end.plus(usd);
    }
    return end;
  }, [allTvl]);

  const totalDeposit = useMemo(() => {
    let end = new BigNumber(0);
    for (let [key, value] of Object.entries(allTvl.byPoolUserStake)) {
      // todo: price per token
      let usd =
        value.usdPrice !== undefined
          ? new BigNumber(value.value).multipliedBy(value.usdPrice)
          : ZERO;
      end = end.plus(usd);
    }
    return end;
  }, [allTvl]);

  const totalUnclaimed = useMemo(() => {
    let end = new BigNumber(0);
    for (let [key, value] of Object.entries(allTvl.byPoolUserUnclaimed)) {
      // todo: price per token
      let usd =
        value.usdPrice !== undefined
          ? new BigNumber(value.value).multipliedBy(value.usdPrice)
          : ZERO;

      end = end.plus(usd);
    }
    return end;
  }, [allTvl]);

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
                  <Balance value={totalValueLocked.toFixed(3, 1)} prefix="$" />
                </b>
              </Subheading>
            </Flex>
          </Flex>
          <Flex align="center" justify="space-between">
            <Text align="center">Total Amount Claimed</Text>
            <Flex center>
              <Subheading align="center">
                <b>
                  <Balance
                    value={
                      poolsRewards.tvl !== null &&
                      rewardPrice.result !== undefined
                        ? poolsRewards.tvl
                            .dividedBy(TEN.pow(18))
                            .multipliedBy(rewardPrice.result)
                            .toFixed(3, 1)
                        : 0
                    }
                    prefix="$"
                  />
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
              value={totalDeposit.toFixed(3, 1)}
              decimals={2}
              prefix="$"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DisplayValueCard
              title="Unclaimed Rewards"
              value={totalUnclaimed.toFixed(3, 1)}
              decimals={2}
              prefix="$"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={8}>
        <StakePoolTable
          updateState={useUpdateTVLState}
          pools={POOLS[chainId]}
        />
        {/* <Grid container spacing={2}>
          {pools[chainId].map((pool, i) => (
            <Grid item key={i} xs={12}>
              <StakePoolCard pool={pool} />
            </Grid>
          ))}
        </Grid> */}
      </Grid>

      <Grid item xs={12} md={8}>
        <StakeDepositTable updateState={useUpdateTVLState} />
      </Grid>

      <Grid item xs={12} md={8}>
        <StakeClaimTable />
      </Grid>
    </Grid>
  );
};

export default Stake;
