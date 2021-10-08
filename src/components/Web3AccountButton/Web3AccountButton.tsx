import { useModal, Button } from "@ohfinance/oh-ui";
import { Web3AccountAvatar } from "components/Web3AccountAvatar";
import { Web3AccountModal } from "components/Web3AccountModal";
import { useWeb3 } from "hooks/useWeb3";
import { getDisplayAddress } from "utils/formatAddress";

export const Web3AccountButton = () => {
  const { account } = useWeb3();
  const [onPresentAccount] = useModal(<Web3AccountModal />);

  if (!account) {
    return null;
  }

  return (
    <Button
      onClick={onPresentAccount}
      variant="contained"
      color="primary"
      endIcon={!!account && <Web3AccountAvatar size={24} account={account} />}
    >
      {!!account && getDisplayAddress(account)}
    </Button>
  );
};
