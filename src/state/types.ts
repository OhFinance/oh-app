// export interface AppState {
//   account?: AccountState;
//   earn?: EarnState;
//   gas?: GasState;
//   transactions?: TransactionState;
// }

export interface UserAccount {
  account?: string;
  connector?: string;
}

export interface UserState extends UserAccount {
  pollingInterval?: number;
  colorMode?: "dark" | "light";
}

export interface EarnState {
  displayMode?: "table" | "card";
}

export interface GasState {
  gasPrice?: string;
}

export interface TransactionInfo {
  hash: string;
  approval?: { tokenAddress: string; spender: string };
  summary?: string;
  // claim?:
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionInfo;
  };
}
