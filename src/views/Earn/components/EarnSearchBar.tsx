import { InputAdornment, TextField } from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

export const EarnSearchBar = () => {
  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
