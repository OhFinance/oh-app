export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,

  AVAX = 43114,
}

export const CoingeckoChainNames = {
  [SupportedChainId.MAINNET]: "ethereum",
  [SupportedChainId.AVAX]: "avalanche",
};
