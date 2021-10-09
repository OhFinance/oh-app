import {
  AppBar as MuiAppBar,
  Grid,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import { useMobile, IconButton, Flex } from "@ohfinance/oh-ui";
import { DRAWER_WIDTH } from "config/constants/values";
import { AppBarMenu } from "./AppBarMenu";
import OhLogo from "assets/img/oh-logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import { useDrawerManager } from "state/user/hooks";

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
    maxHeight: "56px",
  },
}));

export const AppBar = () => {
  const classes = useStyles();
  const mobile = useMobile();
  const [, toggleDrawer] = useDrawerManager();

  return (
    <MuiAppBar
      position="static"
      color="transparent"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar disableGutters>
        <IconButton edge="start" onClick={toggleDrawer}>
          {mobile && <MenuIcon />}
        </IconButton>
        <Flex grow ml={1}>
          {mobile && (
            <img src={OhLogo} alt="oh-finance" height="24px" width="auto" />
          )}
        </Flex>
        <AppBarMenu />
      </Toolbar>
    </MuiAppBar>
  );
};
