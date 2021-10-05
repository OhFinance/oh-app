import { Grid, Typography } from "@material-ui/core";
import { Button, Modal, ModalProps } from "@ohfinance/oh-ui";
import BigNumber from "bignumber.js";
import { Balance } from "components/Balance";
import { TokenInput } from "components/TokenInput";
import { Bank } from "config/constants/types";
import { useTokenAddress } from "hooks/useTokenAddress";
import { ApprovalState, useTokenApprove } from "hooks/useTokenApprove";
import { useTokenBalance } from "hooks/useTokenBalance";
import { FC, useState } from "react";
import { getFullDisplayBalance } from "utils/formatBalances";
import { useBankDeposit } from "../hooks/useBankDeposit";

interface EarnDepositModalProps extends ModalProps {
  bank: Bank;
}

export const EarnDepositModal: FC<EarnDepositModalProps> = ({
  isOpen,
  onDismiss,
  bank,
}) => {
  const [input, setInput] = useState("");
  const [pendingTx, setPendingTx] = useState(false);
  const tokenAddress = useTokenAddress(bank.underlying.address);
  const bankAddress = useTokenAddress(bank.address);
  const { balance } = useTokenBalance(tokenAddress);
  const { approvalState, onApprove } = useTokenApprove(
    tokenAddress,
    bankAddress
  );
  const { onDeposit } = useBankDeposit(bankAddress);

  return (
    <Modal
      title={`Deposit ${bank.underlying.symbol}`}
      isOpen={isOpen}
      onDismiss={onDismiss}
      fullWidth
    >
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
                  value={getFullDisplayBalance(
                    balance,
                    bank.underlying.decimals
                  )}
                  suffix={` ${bank.underlying.symbol}`}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TokenInput
            placeholder={`Deposit ${bank.underlying.symbol}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onMax={() => {
              setInput(
                getFullDisplayBalance(
                  balance,
                  bank.underlying.decimals,
                  bank.underlying.decimals
                )
              );
            }}
          />
        </Grid>
        <Grid item>
          {approvalState === ApprovalState.NOT_APPROVED && (
            // || approval === ApprovalState.PENDING
            <Button
              fullWidth
              variant="contained"
              color="primary"
              // disabled={approval === ApprovalState.PENDING}
              onClick={onApprove}
            >
              Approve
            </Button>
          )}
          {(approvalState === ApprovalState.APPROVED ||
            approvalState === ApprovalState.UNKNOWN) && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={approvalState === ApprovalState.UNKNOWN}
              onClick={async () => {
                setPendingTx(true);
                try {
                  await onDeposit(new BigNumber(input));
                  onDismiss();
                } catch (e) {
                  console.error(e);
                } finally {
                  setPendingTx(false);
                }
              }}
            >
              Deposit
            </Button>
          )}
        </Grid>
      </Grid>
    </Modal>
  );
};
