import { Grid, Typography } from "@material-ui/core";
import { Button, Modal, ModalProps } from "@ohfinance/oh-ui";
import BigNumber from "bignumber.js";
import { Balance } from "components/Balance";
import { TokenInput } from "components/TokenInput";
import { Bank } from "config/constants/types";
import { useAddress } from "hooks/useAddress";
import { useTokenApprove } from "hooks/useTokenApprove";
import { useTokenBalance } from "hooks/useTokenBalance";
import { FC, useState } from "react";
import { getDecimalAmount, getFullDisplayBalance } from "utils/formatBalances";
import { useBankWithdraw } from "../hooks/useBankWithdraw";

export interface EarnWithdrawModalProps extends ModalProps {
  bank: Bank;
}

export const EarnWithdrawModal: FC<EarnWithdrawModalProps> = ({
  isOpen,
  onDismiss,
  bank,
}) => {
  const [input, setInput] = useState("");
  const [pendingTx, setPendingTx] = useState(false);
  const tokenAddress = useAddress(bank.address);
  const bankAddress = useAddress(bank.address);
  const { balance } = useTokenBalance(tokenAddress);
  const { onWithdraw } = useBankWithdraw(bankAddress);

  return (
    <Modal
      title={`Withdraw ${bank.underlying.symbol}`}
      isOpen={isOpen}
      onDismiss={onDismiss}
      fullWidth
    >
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
                  value={getFullDisplayBalance(balance, bank.decimals)}
                  suffix={` ${bank.symbol}`}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TokenInput
            placeholder={`Withdraw ${bank.underlying.symbol}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onMax={() => {
              setInput(
                getFullDisplayBalance(balance, bank.decimals, bank.decimals)
              );
            }}
          />
        </Grid>
        <Grid item>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={async () => {
              setPendingTx(true);
              try {
                await onWithdraw(getDecimalAmount(input, bank.decimals));
                onDismiss();
              } catch (e) {
                console.error(e);
              } finally {
                setPendingTx(false);
              }
            }}
          >
            Withdraw
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};
