export interface Address {
  1: string;
  4?: string;
}

export interface Token {
  symbol: string;
  address?: Address;
  decimals?: number;
}

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
}

export interface Connector {
  title: string;
  icon: string;
  connectorId: ConnectorNames;
}
