import { Box } from "@material-ui/core";
import { Flex, useMobile } from "@ohfinance/oh-ui";
import { useWeb3React } from "@web3-react/core";
import { AccountAvatar } from "components/AccountAvatar";
import { BalanceButton } from "components/BalanceButton";
import { LoginButton } from "components/LoginButton";
import { Fragment } from "react";

export const AppNavigationToolbar = () => {
  const mobile = useMobile();
  const { account } = useWeb3React();

  return (
    <Flex p={1}>
      {!mobile && <BalanceButton style={{ marginRight: 8 }} />}

      <LoginButton style={{ marginRight: 8 }} />
      <AccountAvatar size={36} account={account || ""} />
    </Flex>
  );
};
