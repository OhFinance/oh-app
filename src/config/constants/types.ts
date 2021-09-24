export interface Address {
  readonly 1: string; // mainnet
  readonly 4?: string; // rinkeby
  readonly 42?: string; // kovan
}

export interface Token {
  readonly symbol: string;
  readonly address?: Address;
  readonly decimals?: number;
}

export interface Bank {
  readonly image: string;
  readonly symbol: string;
  readonly description: string;
  readonly alt: string;
  readonly underlying: string;
  readonly composition: string[];
}

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
}

export interface Connector {
  readonly title: string;
  readonly icon: string;
  readonly connectorId: ConnectorNames;
}

export interface Path {
  readonly name: string;
  readonly path: string;
}

export interface Network {
  chainId: string; // append 0x, parse chainId as hexidecimal string
  chainName: string;
  nativeCurrency: NativeCurrency;
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}
