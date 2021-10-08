import {
  AppBar as MuiAppBar,
  Grid,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import { useMobile, MobileMenu } from "@ohfinance/oh-ui";
import { DRAWER_WIDTH } from "config/constants/values";
import { AppBarMenu } from "./components/AppBarMenu";
// import { MobileMenu } from "./components/MobileMenu";
import OhLogo from "assets/img/oh-logo.png";

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

  return (
    <MuiAppBar
      position="static"
      color="transparent"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar disableGutters>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            {mobile && <MobileMenu onClick={() => {}} image={OhLogo} />}
          </Grid>
          <Grid item>
            <AppBarMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
};
