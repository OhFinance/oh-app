import { Grid, Typography } from "@material-ui/core";
import { Button, Modal, ModalProps } from "@ohfinance/oh-ui";
import BigNumber from "bignumber.js";
import { Balance } from "components/Balance";
import { TokenInput } from "components/TokenInput";
import { Bank } from "config/constants/types";
import { useTokenAddress } from "hooks/useTokenAddress";
import { useTokenApprove } from "hooks/useTokenApprove";
import { useTokenBalance } from "hooks/useTokenBalance";
import { FC, useState } from "react";
import { getFullDisplayBalance } from "utils/formatBalances";
import { useBankWithdraw } from "../hooks/useBankWithdraw";

interface EarnWithdrawModalProps extends ModalProps {
  bank: Bank;
}

export const EarnWithdrawModal: FC<EarnWithdrawModalProps> = ({
  isOpen,
  onDismiss,
  bank,
}) => {
  const [input, setInput] = useState("");
  const [pendingTx, setPendingTx] = useState(false);
  const tokenAddress = useTokenAddress(bank.address);
  const bankAddress = useTokenAddress(bank.address);
  const { balance } = useTokenBalance(tokenAddress);
  const { approvalState, onApprove } = useTokenApprove(
    tokenAddress,
    bankAddress
  );
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
          {/* <Button fullWidth variant="contained" color="primary">
            Approve
          </Button> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={async () => {
              setPendingTx(true);
              try {
                await onWithdraw(new BigNumber(input));
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
