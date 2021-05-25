import { Box, makeStyles, Typography } from "@material-ui/core";
import { Path } from "config/constants/paths";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

interface SideDrawerLinkProps {
  path: Path;
}

const useStyles = makeStyles((theme) => ({
  hover: {
    cursor: "pointer",
  },
  active: {
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary,
    },
    textDecoration: "underline",
    textDecorationColor: theme.palette.primary.main,
    textDecorationThickness: 4,
    textUnderlinePosition: "under",
  },
  link: {
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary,
    },
  },
}));

export const SideDrawerLink: React.FC<SideDrawerLinkProps> = ({ path }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === path.path) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location.pathname, path, setActive]);

  return (
    <Box className={classes.hover}>
      <Typography
        className={classes.link}
        onClick={() => history.push(path.path)}
      >
        {path.name}
      </Typography>
    </Box>
  );
};
