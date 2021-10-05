import { Button } from "@material-ui/core";
import { useModal } from "@ohfinance/oh-ui";
import { useWeb3React } from "@web3-react/core";
import { BalanceModal } from "components/BalanceModal";
import { Tokens } from "config/constants/tokens";
import { getTokenAddress } from "helpers/addressHelper";
import { useTokenAddress } from "hooks/useTokenAddress";
import { useTokenBalance } from "hooks/useTokenBalance";
import { useMemo, useState } from "react";
import { ZERO } from "utils/bigNumber";
import { getFullDisplayBalance } from "utils/formatBalances";
import { Balance } from "../Balance";

export const BalanceButton = ({ ...props }) => {
  const { account, chainId } = useWeb3React();
  const address = useTokenAddress(Tokens.ohToken.address);
  const { balance } = useTokenBalance(address);
  const [onPresentBalanceModal] = useModal(
    <BalanceModal tokenBalance={balance} chainId={chainId} />
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
