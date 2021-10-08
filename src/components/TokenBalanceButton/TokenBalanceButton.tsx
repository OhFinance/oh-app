import { Button } from "@material-ui/core";
import { useModal } from "@ohfinance/oh-ui";
import { TokenBalanceModal } from "components/TokenBalanceModal";
import { Tokens } from "config/constants/tokens";
import { useTokenAddress } from "hooks/useTokenAddress";
import { useTokenBalance } from "hooks/useTokenBalance";
import { useWeb3 } from "hooks/useWeb3";
import { getFullDisplayBalance } from "utils/formatBalances";
import { Balance } from "../Balance";

export const TokenBalanceButton = ({ ...props }) => {
  const { account, chainId } = useWeb3();
  const address = useTokenAddress(Tokens.ohToken.address);
  const { balance } = useTokenBalance(address);
  const [onPresentBalanceModal] = useModal(
    <TokenBalanceModal tokenBalance={balance} chainId={chainId} />
  );

  if (!account) {
    return null;
  }

  return (
    <Button variant="contained" onClick={onPresentBalanceModal} {...props}>
      <Balance value={getFullDisplayBalance(balance)} suffix=" OH" />
    </Button>
  );
};
