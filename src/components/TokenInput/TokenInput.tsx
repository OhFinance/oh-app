import {
  makeStyles,
  StandardTextFieldProps,
  TextField,
} from "@material-ui/core";
import { FC } from "react";
import { escapeRegExp } from "utils/misc";
import { TokenInputMaxButton } from "./components/TokenInputMaxButton";

interface TokenInputProps extends StandardTextFieldProps {
  onUserInput: (input: string) => void;
  onMax: () => void;
  decimals?: number;
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

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export const TokenInput: FC<TokenInputProps> = ({
  placeholder,
  value,
  onUserInput,
  onMax,
  decimals = 18,
  ...props
}) => {
  const classes = useStyles();

  const handleChange = (nextUserInput: string) => {
    if (nextUserInput === "" || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput);
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      value={value}
      onChange={(e) => {
        // do validity check to see if we match pattern
        if (e.currentTarget.validity.valid) {
          // replace commas with periods
          handleChange(e.target.value.replace(/,/g, "."));
        }
      }}
      className={classes.input}
      placeholder={placeholder || "0.0"}
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      inputMode="decimal"
      type="text"
      inputProps={{
        pattern: `^[0-9]*[.,]?[0-9]{0,${decimals}}$`,
      }}
      InputProps={{
        endAdornment: <TokenInputMaxButton onClick={onMax} />,
      }}
    />
  );
};
