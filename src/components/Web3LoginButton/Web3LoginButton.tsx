import { useModal, Button } from "@ohfinance/oh-ui";
import { useWeb3React } from "@web3-react/core";
import { Web3AccountAvatar } from "components/Web3AccountAvatar";
import { Web3AccountModal } from "components/Web3AccountModal";
import { Web3LoginModal } from "components/Web3LoginModal";
import { getDisplayAddress } from "utils/formatAddress";

export const Web3LoginButton = () => {
  const { account } = useWeb3React();
  const [onPresentLogin] = useModal(<Web3LoginModal />);
  const [onPresentAccount] = useModal(<Web3AccountModal />);

  return (
    <Button
      onClick={!!account ? onPresentAccount : onPresentLogin}
      variant="contained"
      color="primary"
      endIcon={!!account && <Web3AccountAvatar size={24} account={account} />}
    >
      {!!account ? getDisplayAddress(account) : "Login"}
    </Button>
  );
};
