import { Connector, ConnectorNames } from "./types";
import MetamaskLogo from "assets/img/metamask.svg";
import WalletConnectLogo from "assets/img/walletconnect.svg";

const connectors: Connector[] = [
  {
    title: "Metamask",
    icon: MetamaskLogo,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: "WalletConnect",
    icon: WalletConnectLogo,
    connectorId: ConnectorNames.WalletConnect,
  },
];

export default connectors;
