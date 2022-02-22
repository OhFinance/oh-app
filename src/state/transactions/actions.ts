import { SerializableTransactionReceipt } from "./types";

export interface ClearAllTransactions {
  chainId: number;
}

export interface CheckedTransaction {
  chainId: number;
  hash: string;
  blockNumber: number;
}

export interface FinalizeTransaction {
  chainId: number;
  hash: string;
  receipt: SerializableTransactionReceipt;
}

export enum TransactionType {
  APPROVAL = 0,
  SWAP = 1,
  DEPOSIT_LOCKED_STAKING = 2,
  DEPOSIT_FLEXIBLE_STAKING = 3,
  OH_VESTING = 4,
  BANK_DEPOSIT = 5,
  BANK_WITHDRAW = 6,
  FINANCE = 7,
  FINANCE_ALL = 8,
  REBALANCE = 9,
  CLAIM_REWARDS = 10,
  UNSTAKE = 11,
}

export interface BaseTransactionInfo {
  type: TransactionType;
}

export interface ApproveTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.APPROVAL;
  tokenAddress: string;
  spender: string;
}

export interface DepositLockedStakingTransactionInfo
  extends BaseTransactionInfo {
  type: TransactionType.DEPOSIT_LOCKED_STAKING;
  duration: number;
}

export interface DepositFlexibleStakingTransactionInfo
  extends BaseTransactionInfo {
  type: TransactionType.DEPOSIT_FLEXIBLE_STAKING;
}

export interface OhVestingTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.OH_VESTING;
}

export interface ClaimRewardsTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.CLAIM_REWARDS;
}

export interface UnstakeTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.UNSTAKE;
}

export interface BankDepositTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.BANK_DEPOSIT;
  depositAmount: string;
  depositSymbol: string;
  receiveAmount: string;
  receiveSymbol: string;
}

export interface BankWithdrawTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.BANK_WITHDRAW;
  withdrawAmount: string;
  withdrawSymbol: string;
  receiveAmount: string;
  receiveSymbol: string;
}

export interface FinanceTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.FINANCE;
}

export interface FinanceAllTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.FINANCE_ALL;
}

export interface RebalanceTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.REBALANCE;
}

export type TransactionInfo =
  | ApproveTransactionInfo
  | OhVestingTransactionInfo
  | BankDepositTransactionInfo
  | BankWithdrawTransactionInfo
  | FinanceAllTransactionInfo
  | FinanceTransactionInfo
  | RebalanceTransactionInfo
  | DepositFlexibleStakingTransactionInfo
  | DepositLockedStakingTransactionInfo
  | ClaimRewardsTransactionInfo
  | UnstakeTransactionInfo;

export interface AddTransaction {
  chainId: number;
  hash: string;
  from: string;
  info: TransactionInfo;
}
