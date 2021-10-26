import { Avatar } from "@material-ui/core";
import { Button } from "@ohfinance/oh-ui";
import { useWeb3 } from "hooks/useWeb3";
import MetamaskLogo from "assets/img/metamask.svg";
import { registerToken } from "utils/wallet";
import { Token } from "config/constants/types";
import { FC } from "react";

export interface RegisterTokenButtonProps {
  address?: string;
  symbol?: string;
  decimals?: number;
}

export const RegisterTokenButton: FC<RegisterTokenButtonProps> = ({
  address,
  symbol,
  decimals,
}) => {
  const { library } = useWeb3();

  if (!library || !library.provider.isMetaMask) {
    return null;
  }

  return (
    <Button
      onClick={() => registerToken(address, symbol, decimals)}
      endIcon={
        <img
          src={MetamaskLogo}
          alt="metamask-logo"
          height="22px"
          width="auto"
        />
      }
    >
      Add {symbol} to Metamask
    </Button>
  );
};
