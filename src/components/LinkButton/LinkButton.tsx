import { ButtonProps, makeStyles } from "@material-ui/core";
import { Button } from "@ohfinance/oh-ui";
import { FC } from "react";
import { FaLink } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  icon: {
    height: 12,
    width: 12,
  },
  button: {
    paddingLeft: 16,
    paddingRight: 16,
  },
}));

export const LinkButton: FC<ButtonProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Button
      color="primary"
      size="small"
      endIcon={<FaLink className={classes.icon} />}
      className={classes.button}
      {...props}
    >
      {children}
    </Button>
  );
};
