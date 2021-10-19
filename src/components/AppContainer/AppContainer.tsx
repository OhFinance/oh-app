import { Box, Container, makeStyles } from "@material-ui/core";
import { Display, Flex } from "@ohfinance/oh-ui";
import { AppAlert } from "components/AppAlert";
import { AppBar } from "components/AppBar";
import { AppDrawer } from "components/AppDrawer";
import { Footer } from "components/Footer";
import { DRAWER_WIDTH } from "config/constants/values";
import { FC, Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: "hidden",
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
    <div className={classes.container}>
      <AppDrawer />
      <AppAlert />
      <Container maxWidth="xl">
        <Display>
          <AppBar />
          <Flex grow={1} column className={classes.wrapper}>
            {children}
          </Flex>
          <Footer />
        </Display>
      </Container>
    </div>
  );
};
