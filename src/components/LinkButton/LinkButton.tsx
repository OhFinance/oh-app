import { ButtonProps, makeStyles } from "@material-ui/core";
import { Button } from "@ohfinance/oh-ui";
import { FC } from "react";
import { FaLink } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";

interface LinkButtonProps extends ButtonProps {
  link?: string;
  onClick?: () => void;
  icon?: "link" | "copy";
}

const useStyles = makeStyles((theme) => ({
  icon: {
    height: 12,
    width: 12,
  },
  button: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  label: {
    color: theme.palette.primary.main,
    textTransform: "none",
  },
}));

export const LinkButton: FC<LinkButtonProps> = ({
  link,
  onClick,
  icon = "link",
  children,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Button
      size="small"
      endIcon={
        icon === "link" ? (
          <FaLink className={classes.icon} />
        ) : (
          <FaCopy className={classes.icon} />
        )
      }
      classes={{ label: classes.label }}
      className={classes.button}
      onClick={
        onClick !== undefined
          ? () => onClick()
          : () => window.open(link, "_blank")
      }
      {...props}
    >
      {children}
    </Button>
  );
};
