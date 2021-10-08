import { Grid } from "@material-ui/core";
import { useMobile } from "@ohfinance/oh-ui";
import { BalanceButton } from "components/BalanceButton";
import { Web3AccountButton } from "components/Web3AccountButton";
import { Web3NetworkButton } from "components/Web3NetworkButton";
import { useWeb3 } from "hooks/useWeb3";

export const AppBarMenu = () => {
  const mobile = useMobile();

  return (
    <Grid container spacing={2} alignItems="center" justify="flex-end">
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
        <Web3AccountButton />
      </Grid>
    </Grid>
  );
};
