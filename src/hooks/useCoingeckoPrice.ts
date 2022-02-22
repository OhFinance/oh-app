import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { CoingeckoChainNames } from "config/constants/chains";
import { useCallback } from "react";
import { useWeb3 } from "hooks/useWeb3";
import { isAddress } from "ethers/lib/utils";
import { useERC20Contract } from "./useContract";
import { useSingleCallResult } from "state/multicall/hooks";
import { useTokenBalancesWithLoadingIndicator } from "state/staking/hooks";
import { Token } from "config/constants/types";
import BigNumber from "bignumber.js";
import { TEN } from "utils/bigNumber";

export function useLPTokenData(lpAddress: string, tokens?: [Token, Token]) {
  const { chainId } = useWeb3();

  const [balances, loading] = useTokenBalancesWithLoadingIndicator(
    lpAddress,
    tokens
  );

  const token0Price = useCoingeckoUsdPrice(tokens?.[0]?.address?.[chainId]);
  const token1Price = useCoingeckoUsdPrice(tokens?.[1]?.address?.[chainId]);
  const tokenContract = useERC20Contract(lpAddress);
  const lpTokenSupply = useSingleCallResult(tokenContract, "totalSupply");
  return useMemo(() => {
    if (
      !tokens ||
      loading ||
      token0Price.loading ||
      token0Price.error ||
      token1Price.loading ||
      token1Price.error ||
      lpTokenSupply.loading ||
      lpTokenSupply.error
    ) {
      return null;
    }
    const totalValuePool = tokens.reduce((memo, token, i) => {
      let balance = balances[token.address[chainId]];

      memo = memo.plus(
        balance.multipliedBy(i === 0 ? token0Price.result : token1Price.result)
      );
      return memo;
    }, new BigNumber(0));
    return totalValuePool.dividedBy(
      new BigNumber(lpTokenSupply.result?.[0].toString()).dividedBy(TEN.pow(18))
    );
  }, [
    balances,
    chainId,
    loading,
    lpTokenSupply.error,
    lpTokenSupply.loading,
    lpTokenSupply.result,
    token0Price,
    token1Price,
  ]);
}

export default function useCoingeckoUsdPrice(address?: string) {
  const { chainId } = useWeb3();
  const chainName = useMemo(() => CoingeckoChainNames[chainId], [chainId]);
  const [result, setResult] = useState<number>();
  const [error, setError] = useState(false);

  const fetchPrice = useCallback((address: string, chainName: string) => {
    axios
      .get<{ [addie: string]: { usd: number } }>(
        `https://api.coingecko.com/api/v3/simple/token_price/${chainName}?contract_addresses=${address}&vs_currencies=usd`
      )
      .then((response) => {
        setResult(response.data[address].usd);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);
  useEffect(() => {
    if (chainName && address && isAddress(address)) {
      fetchPrice(address.toLowerCase(), chainName);
    }
  }, [fetchPrice, chainName, address]);

  return useMemo(
    () => ({ loading: result === undefined, error, result }),
    [result, error]
  );
}
