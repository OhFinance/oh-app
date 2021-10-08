import { Drawer, makeStyles, SwipeableDrawer } from "@material-ui/core";
import { useMobile } from "@ohfinance/oh-ui";
import { DRAWER_WIDTH } from "config/constants/values";
import { useState } from "react";
import { AppDrawerContent } from "./components/AppDrawerContent";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
  },
}));

export const AppDrawer = () => {
  const classes = useStyles();
  const mobile = useMobile();
  const [open, setOpen] = useState(false);

  if (!!mobile) {
    return (
      <SwipeableDrawer
        anchor="left"
        className={classes.drawer}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <AppDrawerContent />
      </SwipeableDrawer>
    );
  }

  return (
    <Drawer anchor="left" variant="permanent" className={classes.drawer} open>
      <AppDrawerContent />
    </Drawer>
  );
};
