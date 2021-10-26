import { Grid, Typography } from "@material-ui/core";
import { Button } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { TokenInput } from "components/TokenInput";
import { Bank } from "config/constants/types";
import { FC, useCallback } from "react";
import { getDecimalAmount, getFullDisplayBalance } from "utils/formatBalances";

export interface EarnWithdrawInputProps {
  bank: Bank;
  input: string;
  setInput: (e: any) => void;
  onConfirm: () => void;
  bankBalance: string;
}

export const EarnWithdrawInput: FC<EarnWithdrawInputProps> = ({
  bank,
  input,
  setInput,
  onConfirm,
  bankBalance,
}) => {
  const onMaxInput = useCallback(() => {
    setInput(
      getFullDisplayBalance(
        getDecimalAmount(bankBalance, bank.decimals),
        bank.decimals,
        bank.decimals
      )
    );
  }, [bank, bankBalance, setInput]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="h6" align="left">
              {bank.symbol} Balance
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6" align="right">
              <Balance
                value={bankBalance}
                decimals={bank.decimals}
                suffix={` ${bank.symbol}`}
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <TokenInput
          placeholder={`Withdraw ${bank.underlying.symbol}`}
          decimals={bank.decimals}
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
          Withdraw
        </Button>
      </Grid>
    </Grid>
  );
};
