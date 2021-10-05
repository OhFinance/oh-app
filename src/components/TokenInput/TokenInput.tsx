import {
  BaseTextFieldProps,
  makeStyles,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextField,
} from "@material-ui/core";
import { FC, useCallback } from "react";
import { TokenInputMaxButton } from "./components/TokenInputMaxButton";

interface TokenInputProps extends StandardTextFieldProps {
  onMax: () => void;
}

const useStyles = makeStyles((theme) => ({
  input: {
    "&[type=number]": {
      "-moz-appearance": "textfield",
    },
    "&::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

export const TokenInput: FC<TokenInputProps> = ({
  placeholder,
  value,
  onChange,
  onMax,
  ...props
}) => {
  const classes = useStyles();
  const handleMax = useCallback(() => {}, []);

  return (
    <TextField
      fullWidth
      variant="outlined"
      autoComplete="off"
      type="text"
      className={classes.input}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e)}
      InputProps={{
        endAdornment: <TokenInputMaxButton onClick={onMax} />,
      }}
    />
  );
};
