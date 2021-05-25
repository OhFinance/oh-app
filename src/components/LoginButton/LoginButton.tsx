import { Button } from "@material-ui/core";

export const LoginButton = ({ ...props }) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      Login
    </Button>
  );
};
