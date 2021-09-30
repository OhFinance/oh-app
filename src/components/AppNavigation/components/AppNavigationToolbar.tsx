import { Box, Grid } from "@material-ui/core";
import { Flex, useMobile } from "@ohfinance/oh-ui";
import { useWeb3React } from "@web3-react/core";
import { BalanceButton } from "components/BalanceButton";
import { Web3LoginButton } from "components/Web3LoginButton";
import { Web3NetworkButton } from "components/Web3NetworkButton";
import { Fragment } from "react";

export const AppNavigationToolbar = () => {
  const mobile = useMobile();
  const { account } = useWeb3React();

  return (
    <Grid container spacing={1} alignItems="center" justify="flex-end">
      {!mobile && (
        <Grid item>
          <Web3NetworkButton />
        </Grid>
      )}
      {!mobile && (
        <Grid item>
          <BalanceButton />
        </Grid>
      )}

      <Grid item>
        <Web3LoginButton />
      </Grid>
    </Grid>
  );
};
