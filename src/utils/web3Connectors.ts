import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ConnectorNames } from "config/constants/types";
import { DEFAULT_POLLING_INTERVAL } from "config/constants/values";
import { ethers } from "ethers";

// const rpcUrl = getNodeUrl();
const supportedChainIds = [
  1, // mainnet
  4, // rinkeby
  42, // kovan
  43113, // avax fuji testnet
  43114, // avax mainnet
];

const injected = new InjectedConnector({ supportedChainIds });

// need to add rpc urls for wallet connect functionality
const walletconnect = new WalletConnectConnector({
  // rpc: { [chainId]: rpcUrl },
  // bridge: "https://pancakeswap.bridge.walletconnect.org/",
  qrcode: true,
  pollingInterval: DEFAULT_POLLING_INTERVAL,
  supportedChainIds,
});

export const connectorLibrary: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
};

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = DEFAULT_POLLING_INTERVAL;
  return library;
};