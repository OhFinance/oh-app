import { TransactionResponse } from "@ethersproject/providers";
import { useWeb3 } from "hooks/useWeb3";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import { now } from "utils/misc";
import { addTransaction } from "./state";
import { TransactionDetails } from "./types";

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponse,
  customData?: {
    summary?: string;
    approval?: { tokenAddress: string; spender: string };
  }
) => void {
  const { chainId, account } = useWeb3();
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    (
      response: TransactionResponse,
      {
        summary,
        approval,
      }: {
        summary?: string;
        approval?: { tokenAddress: string; spender: string };
      } = {}
    ) => {
      if (!account || !chainId) {
        return;
      }

      const { hash } = response;
      if (!hash) {
        throw Error("No transaction hash found.");
      }

      dispatch(
        addTransaction({
          hash,
          from: account,
          chainId,
          approval,
          summary,
        })
      );
    },
    [dispatch, chainId, account]
  );
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useWeb3();

  const state = useSelector<AppState, AppState["transactions"]>(
    (s) => s.transactions
  );

  return chainId ? state[chainId] ?? {} : {};
}

export function useIsTransactionPending(transactionHash?: string): boolean {
  const transactions = useAllTransactions();

  if (!transactionHash || !transactions[transactionHash]) return false;

  return !transactions[transactionHash].receipt;
}

// Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return now() - tx.addedTime < 86_400_000;
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(
  tokenAddress: string | undefined,
  spender: string | undefined
): boolean {
  const allTransactions = useAllTransactions();
  return useMemo(
    () =>
      typeof tokenAddress === "string" &&
      typeof spender === "string" &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash];
        if (!tx) return false;
        if (tx.receipt) {
          return false;
        }
        const { approval } = tx;
        if (!approval) return false;
        return (
          approval.spender === spender &&
          approval.tokenAddress === tokenAddress &&
          isTransactionRecent(tx)
        );
      }),
    [allTransactions, spender, tokenAddress]
  );
}
