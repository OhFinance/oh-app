import { Box, Button } from "@material-ui/core";
import { Flex, useModal } from "@ohfinance/oh-ui";
import { TokenBalanceModal } from "components/TokenBalanceModal";
import { useAddress } from "hooks/useAddress";
import { FetchStatus, useTokenBalance } from "hooks/useTokenBalance";
import { useWeb3 } from "hooks/useWeb3";
import { getTokenAddress } from "utils/addressHelper";
import { getFullDisplayBalance } from "utils/formatBalances";
import { Balance } from "../Balance";
import OhToken from "assets/img/oh-token.svg";
import { Skeleton } from "@material-ui/lab";

export const TokenBalanceButton = ({ ...props }) => {
  const { account } = useWeb3();
  const address = useAddress(getTokenAddress());
  const tokenBalance = useTokenBalance(address);
  const { balance, fetchStatus } = tokenBalance;
  const [onPresentBalanceModal] = useModal(
    <TokenBalanceModal address={address} tokenBalance={tokenBalance} />
  );

  if (!account) {
    return null;
  }

  return (
    <Button
      // variant="contained"
      onClick={onPresentBalanceModal}
      endIcon={<img src={OhToken} alt="oh-token" height={24} width="auto" />}
      {...props}
    >
      {/* <Flex align="center"> */}
      {fetchStatus === FetchStatus.SUCCESS ? (
        <Balance value={getFullDisplayBalance(balance)} />
      ) : (
        <Skeleton width={40} height={22} />
      )}
      {/* </Flex> */}
    </Button>
  );
};
