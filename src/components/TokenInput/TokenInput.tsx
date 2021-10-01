import {
  BaseTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextField,
} from "@material-ui/core";
import { FC, useCallback } from "react";
import { TokenInputMaxButton } from "./components/TokenInputMaxButton";

interface TokenInputProps extends StandardTextFieldProps {
  onMax: () => void;
}

export const TokenInput: FC<TokenInputProps> = ({
  placeholder,
  value,
  onChange,
  onMax,
  ...props
}) => {
  const handleMax = useCallback(() => {}, []);

  return (
    <TextField
      fullWidth
      variant="outlined"
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e)}
      InputProps={{
        endAdornment: <TokenInputMaxButton onClick={onMax} />,
      }}
    />
  );
};
