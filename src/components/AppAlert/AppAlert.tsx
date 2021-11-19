import { makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { DOCS_URL } from "@ohfinance/oh-ui";
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
      Please use at your own discretion. Always do your own research into
      underlying risks with DeFi and protocols.{" "}
      <a href={`${DOCS_URL}/general/security`} target="_blank" rel="noreferrer">
        See here
      </a>{" "}
      to view measures taken to secure Oh! Finance.
    </Alert>
  );
};
