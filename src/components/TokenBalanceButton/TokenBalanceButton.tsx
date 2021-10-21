import { Box, Button } from "@material-ui/core";
import { Flex, useModal } from "@ohfinance/oh-ui";
import { TokenBalanceModal } from "components/TokenBalanceModal";
import { useAddress } from "hooks/useAddress";
import { useTokenBalance } from "hooks/useTokenBalance";
import { useWeb3 } from "hooks/useWeb3";
import { getTokenAddress } from "utils/addressHelper";
import { getFullDisplayBalance } from "utils/formatBalances";
import { Balance } from "../Balance";
import OhToken from "assets/img/oh-token.svg";

export const TokenBalanceButton = ({ ...props }) => {
  const { account } = useWeb3();
  const address = useAddress(getTokenAddress());
  const { balance } = useTokenBalance(address);
  const [onPresentBalanceModal] = useModal(
    <TokenBalanceModal address={address} balance={balance} />
  );

  if (!account) {
    return null;
  }

  return (
    <Button
      variant="contained"
      onClick={onPresentBalanceModal}
      {...props}
      endIcon={<img src={OhToken} alt="oh-token" height={24} width="auto" />}
    >
      <Flex align="center">
        <Balance value={getFullDisplayBalance(balance)} />
      </Flex>
    </Button>
  );
};
