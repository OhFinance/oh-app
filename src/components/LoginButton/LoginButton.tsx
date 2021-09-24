import { useModal, Button } from "@ohfinance/oh-ui";
import { useWeb3React } from "@web3-react/core";
import { LoginModal } from "components/LoginModal";
import { getDisplayAddress } from "utils/formatAddress";

export const LoginButton = ({ ...props }) => {
  const { account } = useWeb3React();
  const [onPresentLogin] = useModal(<LoginModal />);

  return (
    <Button
      onClick={!!account ? console.log : onPresentLogin}
      variant="contained"
      color="primary"
      {...props}
    >
      {!!account ? getDisplayAddress(account) : "Login"}
    </Button>
  );
};
