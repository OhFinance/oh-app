import { Button } from "@ohfinance/oh-ui";
import BigNumber from "bignumber.js";
import { Token } from "config/constants/types";
import { FC } from "react";
import { TEN } from "utils/bigNumber";
import { useFaucetToken } from "../hooks/useFaucetToken";

export const EarnFaucetButton: FC<{ token: Token; onClick?: () => void }> = ({
  token,
  onClick,
}) => {
  const { onMint } = useFaucetToken(token.address);

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={async () => {
        await onMint(new BigNumber(100).times(TEN.pow(token.decimals)));
        onClick();
      }}
    >
      Mint {token.symbol}
    </Button>
  );
};
