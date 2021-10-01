import { InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@ohfinance/oh-ui";
import { FC } from "react";

interface TokenInputMaxButtonProps {
  onClick: () => void;
}

const useStyles = makeStyles((theme) => ({
  button: {
    padding: 0,
  },
}));

export const TokenInputMaxButton: FC<TokenInputMaxButtonProps> = ({
  onClick,
}) => {
  const classes = useStyles();

  return (
    <InputAdornment position="end">
      <Button onClick={onClick} className={classes.button}>
        <b>MAX</b>
      </Button>
    </InputAdornment>
  );
};
