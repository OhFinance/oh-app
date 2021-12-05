import { Button } from "@ohfinance/oh-ui";
import { FC } from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.primary.main,
    textTransform: "none",
  },
}));

export interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: FC<BackButtonProps> = ({
  onClick,
  children,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button
      startIcon={<ArrowBackRoundedIcon />}
      onClick={onClick}
      classes={{ label: classes.label }}
      {...props}
    >
      {children ?? "Go Back"}
    </Button>
  );
};
