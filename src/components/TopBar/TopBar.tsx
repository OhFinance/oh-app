import { AppBar, Box, Button, makeStyles, Toolbar } from "@material-ui/core";
import { Flex, useMobile } from "@ohfinance/oh-ui";
import { DRAWER_WIDTH } from "components/SideDrawer";
import { MobileMenu } from "./components/MobileMenu";

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
  },
  button: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export const TopBar = () => {
  const classes = useStyles();
  const mobile = useMobile();

  return (
    <AppBar color="transparent" elevation={0} className={classes.appBar}>
      <Toolbar>
        <Flex grow>{mobile ? <MobileMenu /> : " "}</Flex>
        <Button variant="contained" className={classes.button}>
          0.000 OH
        </Button>
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};
