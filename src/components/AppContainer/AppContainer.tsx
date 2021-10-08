import { Box, Container, makeStyles } from "@material-ui/core";
import { Display } from "@ohfinance/oh-ui";
import { AppBar } from "components/AppBar";
import { AppDrawer } from "components/AppDrawer";
import { DRAWER_WIDTH } from "config/constants/values";
import { FC, Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  display: {
    overflow: "hidden",
  },
  wrapper: {
    [theme.breakpoints.up("md")]: {
      marginLeft: DRAWER_WIDTH - 30,
    },
  },
}));

export const AppContainer: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <AppDrawer />

      <Display className={classes.display}>
        <Container maxWidth="xl">
          <AppBar />

          <Box className={classes.wrapper}>{children}</Box>
        </Container>
      </Display>
    </Fragment>
  );
};
