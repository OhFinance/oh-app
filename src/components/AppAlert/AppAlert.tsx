import { makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { DRAWER_WIDTH } from "config/constants/values";
import { useState } from "react";
import { useAlertManager } from "state/user/hooks";

const useStyles = makeStyles((theme) => ({
  alert: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
    borderRadius: 0,
    margin: 0,
    // maxHeight: "56px",
  },
}));

export const AppAlert = () => {
  const classes = useStyles();
  // const [isAlertDisplayed, toggleAlert] = useAlertManager();

  const [isAlertDisplayed, toggleAlert] = useState(true);

  if (!isAlertDisplayed) {
    return null;
  }

  return (
    <Alert
      severity="warning"
      className={classes.alert}
      onClose={() => toggleAlert(false)}
    >
      This is a beta version of the Oh! Finance protocol. Please use at your own
      risk.
    </Alert>
  );
};
