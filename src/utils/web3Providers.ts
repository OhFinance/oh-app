import { ethers } from "ethers";

// Array of available nodes to connect to
export const nodes = {
  1:
    process.env.REACT_APP_MAINNET_NODE_URL ??
    "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161	",
  4:
    process.env.REACT_APP_RINKEBY_NODE_URL ??
    "https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  42:
    process.env.REACT_APP_KOVAN_NODE_URL ??
    "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  1285: "https://rpc.moonriver.moonbeam.network",
  43113: "https://api.avax-test.network/ext/bc/C/rpc",
  43114: "https://api.avax.network/ext/bc/C/rpc",
};

/* Fallback RPC Endpoint if no web3 connection, defaults to mainnet */
export const getDefaultProvider = (chainId?: number) =>
  new ethers.providers.JsonRpcProvider(nodes[chainId ?? 1]);
