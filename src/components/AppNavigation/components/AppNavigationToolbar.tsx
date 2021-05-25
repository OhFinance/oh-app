import { AccountAvatar } from "components/AccountAvatar";
import { BalanceButton } from "components/BalanceButton";
import { LoginButton } from "components/LoginButton";
import { Fragment } from "react";

export const AppNavigationToolbar = () => {
  return (
    <Fragment>
      <BalanceButton style={{ marginRight: 8 }} />
      <LoginButton style={{ marginRight: 8 }} />
      <AccountAvatar
        size={36}
        account="0x000000010b5AFA32AB82B72625D68571B11EAE13"
      />
    </Fragment>
  );
};
