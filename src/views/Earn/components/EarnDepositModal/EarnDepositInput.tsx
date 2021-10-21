import { Grid, Typography } from "@material-ui/core";
import { Button } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { TokenInput } from "components/TokenInput";
import { Bank } from "config/constants/types";
import { useNetwork } from "hooks/useNetwork";
import { FC, useCallback } from "react";
import { EarnFaucetButton } from "../EarnFaucetButton";

export interface EarnDepositInputProps {
  bank: Bank;
  input: string;
  setInput: (e: any) => void;
  onConfirm: () => void;
  underlyingBalance: string;
}

export const EarnDepositInput: FC<EarnDepositInputProps> = ({
  bank,
  input,
  setInput,
  onConfirm,
  underlyingBalance,
}) => {
  const { isTestnet } = useNetwork();

  const onMaxInput = useCallback(() => {
    setInput(underlyingBalance);
  }, [underlyingBalance, setInput]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="h6" align="left">
              {bank.underlying.symbol} Balance
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6" align="right">
              <Balance
                value={underlyingBalance}
                suffix={` ${bank.underlying.symbol}`}
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <TokenInput
          placeholder={`Deposit ${bank.underlying.symbol}`}
          decimals={bank.underlying.decimals}
          value={input}
          onUserInput={(e) => setInput(e)}
          onMax={onMaxInput}
        />
      </Grid>

      <Grid item>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={!input}
          onClick={onConfirm}
        >
          Deposit
        </Button>
      </Grid>

      {isTestnet && (
        <Grid item>
          <EarnFaucetButton token={bank.underlying} />
        </Grid>
      )}
    </Grid>
  );
};
