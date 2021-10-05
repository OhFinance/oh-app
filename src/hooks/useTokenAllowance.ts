import BigNumber from "bignumber.js";
import { allowance as allowanceHelper } from "helpers/callHelper";
import { useEffect, useState } from "react";
import { ZERO } from "utils/bigNumber";
import { useERC20Contract } from "./useContract";
import useWeb3 from "./useWeb3";

export const useTokenAllowance = (
  tokenAddress?: string,
  owner?: string,
  spender?: string
) => {
  const contract = useERC20Contract(tokenAddress);
  const [allowance, setAllowance] = useState<BigNumber>(ZERO);

  useEffect(() => {
    const fetchAllowance = async () => {
      try {
        const result = await allowanceHelper(contract, spender, owner);
        console.log(result);
        setAllowance(new BigNumber(result));
      } catch (e) {
        console.error(e);
      }
    };

    if (contract && spender && owner) {
      fetchAllowance();
    }
  }, [contract, spender, owner]);

  return allowance;
};
