import { Button } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Balance } from "../Balance";

export const BalanceButton = ({ ...props }) => {
  const { account } = useWeb3React();

  if (!account) {
    return null;
  }

  return (
    <Button variant="contained" {...props}>
      <Balance value={0} suffix=" OH" />
    </Button>
  );
};
