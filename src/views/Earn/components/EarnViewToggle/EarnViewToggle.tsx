import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded";
import ViewModuleRoundedIcon from "@material-ui/icons/ViewModuleRounded";
import { useUserEarnViewMode } from "state/user/hooks";
import { ViewMode } from "state/user/types";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
    height: 40,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const EarnViewToggle = () => {
  const classes = useStyles();
  const [userEarnViewMode, setUserEarnViewMode] = useUserEarnViewMode();

  return (
    <ButtonGroup color="default">
      <Button
        className={classes.button}
        onClick={() => setUserEarnViewMode(ViewMode.TABLE)}
      >
        <ViewListRoundedIcon
          color={userEarnViewMode === ViewMode.TABLE ? "primary" : "disabled"}
        />
      </Button>
      <Button
        className={classes.button}
        onClick={() => setUserEarnViewMode(ViewMode.CARD)}
      >
        <ViewModuleRoundedIcon
          color={userEarnViewMode === ViewMode.CARD ? "primary" : "disabled"}
        />
      </Button>
    </ButtonGroup>
  );
};
