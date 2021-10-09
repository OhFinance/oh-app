import { useCallback, useEffect } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { ConnectorNames } from "config/constants/types";
import { connectorLibrary } from "utils/web3Connectors";
import useToast from "./useToast";
import { CONNECTOR_STORAGE_KEY } from "config/constants/values";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";

const useAuth = () => {
  const { account, activate, deactivate } = useWeb3React();
  const { toastError } = useToast();

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorLibrary[connectorID];
      if (connector) {
        activate(connector, async (error: Error) => {
          console.error(error);
          // if (error instanceof UnsupportedChainIdError) {
          //   // const hasSetup = await setupNetwork();
          //   // if (hasSetup) {
          //   //   activate(connector);
          //   // }
          // } else {
          window.localStorage.removeItem(CONNECTOR_STORAGE_KEY);
          if (error instanceof NoEthereumProviderError) {
            toastError("Provider Error", "No provider was found");
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector as WalletConnectConnector;
              walletConnector.walletConnectProvider = null;
            }
            toastError(
              "Authorization Error",
              "Please authorize to access your account"
            );
          } else {
            toastError(error.name, error.message);
          }

          toastError(error.name, error.message);
        });

        console.log("LOGGED IN!");
      } else {
        toastError("Can't find connector", "The connector config is wrong");
      }
    },
    [activate, toastError]
  );

  const logout = useCallback(() => {
    // dispatch(profileClear());
    deactivate();
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
