import { Grid } from "@material-ui/core";
import { useMobile } from "@ohfinance/oh-ui";
import { TokenBalanceButton } from "components/TokenBalanceButton";
import { Web3AccountButton } from "components/Web3AccountButton";
import { Web3NetworkButton } from "components/Web3NetworkButton";

export const AppBarMenu = () => {
  const mobile = useMobile();

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
      {!mobile && (
        <Grid item>
          <Web3NetworkButton />
        </Grid>
      )}
      {!mobile && (
        <Grid item>
          <TokenBalanceButton />
        </Grid>
      )}

      <Grid item>
        <Web3AccountButton />
      </Grid>
    </Grid>
  );
};
