import { AppBar as MuiAppBar, makeStyles, Toolbar } from "@material-ui/core";
import { useMobile, IconButton, Flex, OH_LOGO_URL } from "@ohfinance/oh-ui";
import { DRAWER_WIDTH } from "config/constants/values";
import { AppBarMenu } from "./AppBarMenu";
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

/* 
  Component displayed at very top of view
  Manages mobile menu and various web3 account components
*/
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
        <Flex grow={1} ml={1}>
          {mobile && (
            <img
              src={OH_LOGO_URL}
              alt="oh-finance"
              height="24px"
              width="auto"
            />
          )}
        </Flex>
        <AppBarMenu />
      </Toolbar>
    </MuiAppBar>
  );
};
