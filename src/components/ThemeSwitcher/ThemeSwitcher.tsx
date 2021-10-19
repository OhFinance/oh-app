import { makeStyles, Switch } from "@material-ui/core";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  switch: {
    // height: "48px",
    display: "inline-flex",
  },
}));

export const ThemeSwitcher = ({ checked, onChange }) => {
  const classes = useStyles();

  const handleChange = useCallback(
    (e) => {
      onChange(e);
    },
    [onChange]
  );

  return (
    <Switch
      className={classes.switch}
      checked={checked}
      onChange={(e) => handleChange(e)}
    />
  );
};
