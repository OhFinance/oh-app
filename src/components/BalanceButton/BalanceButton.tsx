import { Button } from "@material-ui/core";

export const BalanceButton = ({ ...props }) => {
  return (
    <Button variant="contained" {...props}>
      0.000 OH
    </Button>
  );
};
