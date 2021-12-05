import { Grid, Typography } from "@material-ui/core";
import { Button, Flex } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { TokenInput } from "components/TokenInput";
import { Bank } from "config/constants/types";
import { useNetwork } from "hooks/useNetwork";
import { FC, useCallback } from "react";
import { getDecimalAmount, getFullDisplayBalance } from "utils/formatBalances";
import { EarnFaucetButton } from "../EarnFaucetButton";

export interface EarnDepositInputProps {
  bank: Bank;
  input: string;
  setInput: (e: any) => void;
  onConfirm: () => void;
  onDismiss: () => void;
  underlyingBalance: string;
}

export const EarnDepositInput: FC<EarnDepositInputProps> = ({
  bank,
  input,
  setInput,
  onConfirm,
  onDismiss,
  underlyingBalance,
}) => {
  const { isTestnet } = useNetwork();

  const onMaxInput = useCallback(() => {
    setInput(
      getFullDisplayBalance(
        getDecimalAmount(underlyingBalance, bank.underlying.decimals),
        bank.underlying.decimals,
        bank.underlying.decimals
      )
    );
  }, [bank, underlyingBalance, setInput]);

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
                decimals={bank.underlying.decimals}
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Flex>
              <Button fullWidth variant="contained" onClick={onDismiss}>
                Cancel
              </Button>
            </Flex>
          </Grid>
          <Grid item xs={6}>
            <Flex>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={!input}
                onClick={onConfirm}
              >
                Deposit
              </Button>
            </Flex>
          </Grid>
        </Grid>
      </Grid>

      {isTestnet && (
        <Grid item>
          <EarnFaucetButton token={bank.underlying} />
        </Grid>
      )}
    </Grid>
  );
};
