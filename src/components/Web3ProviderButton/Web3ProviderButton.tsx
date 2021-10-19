import { Typography } from "@material-ui/core";
import { Button, Flex } from "@ohfinance/oh-ui";
import { Connector, ConnectorNames } from "config/constants/types";
import {
  CONNECTOR_STORAGE_KEY,
  WALLET_STORAGE_KEY,
} from "config/constants/values";
import useAuth from "hooks/useAuth";
import { FC, useCallback } from "react";

interface Web3ProviderButtonProps {
  connector: Connector;
}

export const Web3ProviderButton: FC<Web3ProviderButtonProps> = ({
  connector,
}) => {
  const { icon, title, connectorId } = connector;
  const { login } = useAuth();

  const onLogin = useCallback(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    // Since iOS does not support Trust Wallet we fall back to WalletConnect
    if (title === "Trust Wallet" && isIOS) {
      login(ConnectorNames.WalletConnect);
    } else {
      login(connectorId);
    }

    localStorage.setItem(WALLET_STORAGE_KEY, title);
    localStorage.setItem(CONNECTOR_STORAGE_KEY, connectorId);
  }, [connectorId, login, title]);

  return (
    <Button paper fullWidth variant="outlined" onClick={onLogin}>
      <Flex center column p={2}>
        <Flex>
          <img src={icon} height={"48px"} width="auto" alt={title} />
        </Flex>
        <Flex mt={1}>
          <Typography variant="body1" align="center">
            {title}
          </Typography>
        </Flex>
      </Flex>
    </Button>
  );
};
