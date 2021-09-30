import { useModal, Button } from "@ohfinance/oh-ui";
import { useWeb3React } from "@web3-react/core";
import { AccountAvatar } from "components/AccountAvatar";
import { AccountModal } from "components/AccountModal";
import { Web3LoginModal } from "components/Web3LoginModal";
import { getDisplayAddress } from "utils/formatAddress";

export const Web3LoginButton = () => {
  const { account } = useWeb3React();
  const [onPresentLogin] = useModal(<Web3LoginModal />);
  const [onPresentAccount] = useModal(<AccountModal />);

  return (
    <Button
      onClick={!!account ? onPresentAccount : onPresentLogin}
      variant="contained"
      color="primary"
      endIcon={!!account && <AccountAvatar size={24} account={account} />}
    >
      {!!account ? getDisplayAddress(account) : "Login"}
    </Button>
  );
};
