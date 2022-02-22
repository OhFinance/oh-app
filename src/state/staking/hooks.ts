import { Token } from "config/constants/types";
import { Interface, isAddress } from "ethers/lib/utils";
import { useWeb3 } from "hooks/useWeb3";
import { useMemo } from "react";
import {
  useMultipleContractSingleData,
  useSingleCallResult,
  useSingleContractMultipleData,
} from "state/multicall/hooks";
import ERC20ABI from "config/abi/IERC20.json";
import BigNumber from "bignumber.js";
import { useERC20Contract } from "hooks/useContract";
import tokens from "config/constants/tokens";
import { Pool, POOLS } from "config/constants/pools";
import { CallStateResult } from "state/multicall/types";
import { useAppDispatch, useAppSelector } from "state";
import { addPoolTvl, addUserStaked } from "./reducer";
import { TEN } from "utils/bigNumber";

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[]
): [{ [tokenAddress: string]: BigNumber | undefined }, boolean] {
  const { chainId } = useWeb3();
  const validatedTokens: Token[] = useMemo(
    () =>
      tokens?.filter(
        (t?: Token): t is Token => isAddress(t?.address[chainId]) !== false
      ) ?? [],
    [tokens, chainId]
  );

  const validatedTokenAddresses = useMemo(
    () => validatedTokens.map((vt) => vt.address[chainId]),
    [validatedTokens, chainId]
  );
  const ERC20Interface = new Interface(ERC20ABI);
  const balances = useMultipleContractSingleData(
    validatedTokenAddresses,
    ERC20Interface,
    "balanceOf",
    [address],
    {
      gasRequired: 100_000,
    }
  );

  const anyLoading: boolean = useMemo(
    () => balances.some((callState) => callState.loading),
    [balances]
  );

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{
              [tokenAddress: string]: BigNumber | undefined;
            }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0];
              const amount = value
                ? new BigNumber(value.toString()).dividedBy(
                    TEN.pow(token.decimals)
                  )
                : undefined;
              if (amount) {
                memo[token.address[chainId]] = amount;
              }
              return memo;
            }, {})
          : {},
      [address, validatedTokens, balances, chainId]
    ),
    anyLoading,
  ];
}

// every pool has its own staking token
// token.balanceOf(Pool)
// singleCallResult
export function usePoolTokenBalance(pool: Pool) {
  const { chainId, account } = useWeb3();
  const contract = useERC20Contract(pool.token.address[chainId]);

  const result = useSingleCallResult(contract, "balanceOf", [account]);
  return useMemo(() => {
    if (
      result.loading ||
      result.error ||
      !isAddress(pool.token.address[chainId])
    ) {
      return null;
    }

    return new BigNumber(result.result?.[0].toString());
  }, [result, chainId, pool.poolAddress, pool.token.address]);
}

// balanceOf(poolAddress) token
export function useFetchPoolTvl(pool: Pool): string | null {
  const { chainId } = useWeb3();
  const dispatch = useAppDispatch();
  const contract = useERC20Contract(pool.token.address[chainId]);

  const result = useSingleCallResult(contract, "balanceOf", [pool.poolAddress]);
  return useMemo(() => {
    if (
      result.loading ||
      result.error ||
      !isAddress(pool.token.address[chainId])
    ) {
      return null;
    }
    const value = new BigNumber(result.result?.[0].toString()).dividedBy(
      TEN.pow(pool.token.decimals)
    );
    dispatch(
      addPoolTvl({
        poolAddress: pool.poolAddress,
        amount: value,
      })
    );

    return value.toFixed(3, 1);
  }, [
    result,
    chainId,
    dispatch,
    pool.poolAddress,
    pool.token.address,
    pool.token.decimals,
  ]);
}

export function usePoolTvl(pool: Pool): BigNumber | null {
  const tvl = useAppSelector((state) => state.staking.tvlByPool);

  return useMemo(() => tvl[pool.poolAddress] || null, [tvl, pool.poolAddress]);
}

export const usePoolsRewards = () => {
  const { chainId } = useWeb3();
  const ohToken = tokens.ohToken.address[chainId];

  // tmp mc token
  const ERC20TOKEN = useERC20Contract(
    "0x949d48eca67b17269629c7194f4b727d4ef9e5d6"
  );

  const pools: Pool[] | undefined = useMemo(
    () => (chainId in POOLS ? POOLS[chainId] : undefined),
    [chainId]
  );

  const validatedPools: Pool[] = useMemo(
    () =>
      pools?.filter(
        (t?: Pool): t is Pool => isAddress(t?.escrowAddress) !== false
      ) ?? [],
    [pools]
  );

  const validatedEscrowAddresses = useMemo(
    () =>
      validatedPools
        .map((vp) => vp.escrowAddress)
        .filter(
          (value, index, array) =>
            !array.filter(
              (v, i) => JSON.stringify(value) == JSON.stringify(v) && i < index
            ).length
        ),
    [validatedPools]
  );
  const inputs = useMemo(
    () => validatedEscrowAddresses.map((addr) => [addr]),
    [validatedEscrowAddresses]
  );

  const results = useSingleContractMultipleData(
    ERC20TOKEN,
    "balanceOf",
    inputs
  );

  const loading = useMemo(
    () => results.some(({ loading }) => loading),
    [results]
  );
  const error = useMemo(() => results.some(({ error }) => error), [results]);

  const poolsWithTvl = useMemo(() => {
    if (!loading && !error && pools) {
      return results.map((call, i) => {
        const pool = pools[i];
        const result = call.result as CallStateResult;
        return {
          ...pool,
          tvl: new BigNumber(result?.[0].toString()),
        };
      });
    }
    return null;
  }, [loading, error, pools, results]);

  const tvl = useMemo(
    () =>
      poolsWithTvl
        ? poolsWithTvl.reduce(
            (prev, curr) => prev.plus(curr.tvl),
            new BigNumber(0)
          )
        : null,
    [poolsWithTvl]
  );

  // tvl being total value of rewards locked
  return { poolsWithTvl, tvl };
};
