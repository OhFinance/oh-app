import { Box, Container, makeStyles } from "@material-ui/core";
import { Display, Flex } from "@ohfinance/oh-ui";
import { AppBar } from "components/AppBar";
import { AppDrawer } from "components/AppDrawer";
import { Footer } from "components/Footer";
import { DRAWER_WIDTH } from "config/constants/values";
import { FC, Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  display: {
    overflow: "hidden",
    // maxWidth: "100%",
    // [theme.breakpoints.up("md")]: {
    //   marginLeft: DRAWER_WIDTH,
    // },
  },
  wrapper: {
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      marginLeft: DRAWER_WIDTH,
    },
  },
}));

export const AppContainer: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <AppDrawer />

      <Display className={classes.display}>
        <AppBar />
        <Flex grow={1} column className={classes.wrapper}>
          {children}
        </Flex>
        <Footer />
      </Display>
    </Container>
  );
};
