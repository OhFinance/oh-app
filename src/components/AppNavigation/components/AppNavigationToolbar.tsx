import { Grid } from "@material-ui/core";
import { useMobile } from "@ohfinance/oh-ui";
import { BalanceButton } from "components/BalanceButton";
import { Web3LoginButton } from "components/Web3LoginButton";
import { Web3NetworkButton } from "components/Web3NetworkButton";
import { useWeb3 } from "hooks/useWeb3";

export const AppNavigationToolbar = () => {
  const mobile = useMobile();
  const { account } = useWeb3();

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

      {!!account && (
        <Grid item>
          <Web3LoginButton />
        </Grid>
      )}
    </Grid>
  );
};
