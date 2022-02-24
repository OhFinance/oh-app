import { TableCell, TableRow } from "@material-ui/core";
import { Flex, useModal } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Pool } from "config/constants/pools";
import { StakePoolModal } from "../StakePoolModal";
import { getFullDisplayBalance } from "utils/formatBalances";
import { useClaimableRewards } from "hooks/useClaimableRewards";
import { useFetchPoolTvl, usePoolRewards } from "state/staking/hooks";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { TVLStateUpdater } from "views/Stake/Stake";
import BigNumber from "bignumber.js";
import { TEN } from "utils/bigNumber";
import useStakingStyles from "../styles";
import { useStakingContract } from "hooks/useContract";
import { useTransactionAdder } from "state/transactions/hooks";
import { useWeb3 } from "hooks/useWeb3";
import { calculateGasMargin } from "utils/calculateGasMargin";
import { TransactionType } from "state/transactions/actions";
import useCoingeckoUsdPrice, { useLPTokenData } from "hooks/useCoingeckoPrice";

export const StakePoolTableRow = ({
  pool,
  bottomBorder = true,
  updateState,
}: {
  pool: Pool;
  bottomBorder?: boolean;
  updateState: TVLStateUpdater;
}) => {
  const { chainId, library, account } = useWeb3();
  const [onPresentStakeModal] = useModal(<StakePoolModal pool={pool} />);
  const classes = useStakingStyles();
  const totalClaimed = usePoolRewards(pool);
  const claimableRewards = useClaimableRewards(pool);
  const fetchPoolTvl = useFetchPoolTvl(pool);
  const usdPrice = useCoingeckoUsdPrice(pool.token.address[chainId]);
  const rewardUsdPrice = useCoingeckoUsdPrice(
    pool.rewardToken.address[chainId]
  );

  const lpTokenPrice = useLPTokenData(pool.token.address[chainId], pool.lpOf);
  const usedPrice = useMemo(() => {
    if (lpTokenPrice) {
      return lpTokenPrice.toNumber();
    } else {
      return usdPrice.result;
    }
  }, [lpTokenPrice, usdPrice]);

  useEffect(() => {
    if (fetchPoolTvl !== null) {
      updateState("byPoolTvl", pool, {
        value: new BigNumber(fetchPoolTvl),
        usdPrice: usedPrice,
      });
    }
  }, [fetchPoolTvl, updateState, pool, usedPrice]);

  useEffect(() => {
    if (totalClaimed !== null) {
      updateState("byPoolClaimedRewards", pool, {
        value: totalClaimed.dividedBy(TEN.pow(18)),
        usdPrice: rewardUsdPrice.result,
      });
    }
  }, [totalClaimed, updateState, pool, rewardUsdPrice.result]);

  useEffect(() => {
    if (claimableRewards.balance) {
      updateState("byPoolUserUnclaimed", pool, {
        value: claimableRewards.balance.dividedBy(
          TEN.pow(pool.rewardToken.decimals)
        ),
        usdPrice: rewardUsdPrice.result,
      });
    }
  }, [claimableRewards.balance, updateState, pool, rewardUsdPrice.result]);

  const canClaim = useMemo(
    () => claimableRewards.balance.gt(0),
    [claimableRewards.balance]
  );

  const poolContract = useStakingContract(pool.poolAddress);

  const addTransaction = useTransactionAdder();
  const [claimPending, setClaimPending] = useState(false);

  const onClaim = useCallback(
    async (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!chainId || !library || !account) return;

      let estimate = poolContract.estimateGas.claimRewards;
      let method = poolContract.claimRewards;
      let args = [account];

      setClaimPending(true);
      await estimate(...args)
        .then((estimatedGasLimit) =>
          method(...args, {
            gasLimit: calculateGasMargin(estimatedGasLimit),
          }).then((response) => {
            setClaimPending(false);

            addTransaction(
              response,

              {
                type: TransactionType.CLAIM_REWARDS,
              }
            );
          })
        )
        .catch((error) => {
          setClaimPending(false);
          // we only care if the error is something _other_ than the user rejected the tx
          if (error?.code !== 4001) {
            console.error(error);
          }
        });
    },
    [account, addTransaction, chainId, library, poolContract]
  );
  return (
    <TableRow
      hover
      onClick={onPresentStakeModal}
      style={{
        cursor: "pointer",
      }}
    >
      <TableCell
        padding="checkbox"
        style={{ borderBottom: !bottomBorder && "none" }}
      >
        <Flex center m={1}>
          <img src={pool.token.image} alt={pool.token.symbol} height={30} />
        </Flex>
      </TableCell>
      <TableCell style={{ borderBottom: !bottomBorder && "none" }}>
        <b>{pool.label}</b>
        {canClaim && (
          <span
            onClick={claimPending ? undefined : onClaim}
            className={classes.claim}
          >
            {" "}
            ({claimPending ? "Claiming" : "Claim Rewards"})
          </span>
        )}
      </TableCell>
      <TableCell
        align="right"
        style={{ borderBottom: !bottomBorder && "none" }}
      >
        <b>
          <Balance value={30} decimals={2} suffix="%" />
        </b>
      </TableCell>
      <TableCell
        align="right"
        style={{ borderBottom: !bottomBorder && "none" }}
      >
        <b>
          {fetchPoolTvl !== null && usedPrice !== undefined ? (
            <Balance
              value={new BigNumber(fetchPoolTvl)
                .multipliedBy(usedPrice)
                .toFixed(3, 1)}
              decimals={2}
              prefix="$"
            />
          ) : (
            "loading"
          )}
        </b>
      </TableCell>
      <TableCell
        align="right"
        style={{ borderBottom: !bottomBorder && "none" }}
      >
        <b>
          <Balance
            value={getFullDisplayBalance(
              claimableRewards.balance,
              pool.rewardToken.decimals
            )}
            suffix={" " + pool.rewardToken.symbol}
          />
        </b>
      </TableCell>
    </TableRow>
  );
};
