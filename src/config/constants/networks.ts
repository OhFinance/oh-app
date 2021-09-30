import { Network } from "./types";

// Avalanche Info: https://docs.avax.network/build/tutorials/platform/launch-your-ethereum-dapp 
export const Networks: Network[] = [
  {
    chainId: "0xa869",
    chainName: "Avalanche FUJI C-Chain",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
  },
  {
    chainId: "0xa86a",
    chainName: "Avalanche Mainnet C-Chain",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
  },
];
