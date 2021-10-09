import { Drawer, makeStyles, SwipeableDrawer } from "@material-ui/core";
import { useMobile } from "@ohfinance/oh-ui";
import { DRAWER_WIDTH } from "config/constants/values";
import { useState } from "react";
import { useDrawerManager } from "state/user/hooks";
import { AppDrawerContent } from "./components/AppDrawerContent";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
}));

export const AppDrawer = () => {
  const classes = useStyles();
  const mobile = useMobile();
  const [open, toggleOpen] = useDrawerManager();

  if (!!mobile) {
    return (
      <SwipeableDrawer
        anchor="left"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={open}
        onClose={toggleOpen}
        onOpen={toggleOpen}
      >
        <AppDrawerContent />
      </SwipeableDrawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      open
    >
      <AppDrawerContent />
    </Drawer>
  );
};
