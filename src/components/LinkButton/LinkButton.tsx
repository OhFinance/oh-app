import { ButtonProps, makeStyles } from "@material-ui/core";
import { Button } from "@ohfinance/oh-ui";
import { FC } from "react";
import { FaLink } from "react-icons/fa";

interface LinkButtonProps extends ButtonProps {
  link: string;
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
}));

export const LinkButton: FC<LinkButtonProps> = ({
  link,
  children,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Button
      color="primary"
      size="small"
      endIcon={<FaLink className={classes.icon} />}
      className={classes.button}
      onClick={() => window.open(link, "_blank")}
      {...props}
    >
      {children}
    </Button>
  );
};
