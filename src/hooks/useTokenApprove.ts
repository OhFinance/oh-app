import { useWeb3React } from "@web3-react/core";
import { useCallback, useMemo } from "react";
import { MAX_UINT256 } from "utils/bigNumber";
import { useERC20Contract } from "./useContract";
import { useTokenAllowance } from "./useTokenAllowance";
import { approve as approveHelper } from "helpers/callHelper";
import BigNumber from "bignumber.js";

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  // PENDING,
  APPROVED,
}

export const useTokenApprove = (
  tokenAddress?: string,
  spender?: string,
  amountToApprove?: BigNumber
) => {
  const { account } = useWeb3React();
  const contract = useERC20Contract(tokenAddress);
  const allowance = useTokenAllowance(
    tokenAddress,
    account ?? undefined,
    spender
  );

  const approvalState: ApprovalState = useMemo(() => {
    if (!tokenAddress || !spender || !allowance) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    return allowance.lt(amountToApprove ?? MAX_UINT256)
      ? // pendingApproval
        // ? ApprovalState.PENDING
        // :
        ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [
    amountToApprove,
    allowance,
    //pendingApproval,
    spender,
    tokenAddress,
  ]);

  const handleApprove = useCallback(async (): Promise<void> => {
    try {
      if (approvalState !== ApprovalState.NOT_APPROVED) {
        console.error("approve was called unnecessarily");
        return;
      }

      if (!tokenAddress) {
        console.error("no token");
        return;
      }

      if (!contract) {
        console.error("tokenContract is null");
        return;
      }

      if (!spender) {
        console.error("no spender");
        return;
      }

      await approveHelper(
        contract,
        spender,
        account,
        amountToApprove ?? MAX_UINT256
      );

      // add transaction to pending queue
    } catch (e) {
      console.error(e);
      throw e;
    }
  }, [
    account,
    amountToApprove,
    approvalState,
    contract,
    spender,
    tokenAddress,
  ]);

  return { approvalState, onApprove: handleApprove };
};
