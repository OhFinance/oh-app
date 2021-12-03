import { Grid } from "@material-ui/core";
import { Button, useMobile, useModal } from "@ohfinance/oh-ui";
import { TokenBalanceButton } from "components/TokenBalanceButton";
import { Web3AccountButton } from "components/Web3AccountButton";
import { Web3NetworkButton } from "components/Web3NetworkButton";
import SettingsIcon from "@material-ui/icons/Settings";
import { SettingsModal } from "components/SettingsModal";

export const AppBarMenu = () => {
  const mobile = useMobile();
  const [onPresentSettingsModal] = useModal(<SettingsModal />);

  return (
    <Grid container spacing={2} alignItems="center" justify="flex-end">
      {/* {!mobile && (
        <Grid item>
          <Web3NetworkButton />
        </Grid>
      )} */}
      {!mobile && (
        <Grid item>
          <TokenBalanceButton />
        </Grid>
      )}

      <Grid item>
        <Web3AccountButton />
      </Grid>

      <Grid item>
        <Button
          paper
          variant="outlined"
          style={{ minWidth: 0 }}
          onClick={onPresentSettingsModal}
        >
          <SettingsIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
