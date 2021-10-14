import { Grid, Typography } from "@material-ui/core";
import { Button, Modal, ModalProps } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { TokenInput } from "components/TokenInput";
import { Bank } from "config/constants/types";
import { useAddress } from "hooks/useAddress";
import { useNetwork } from "hooks/useNetwork";
import useToast from "hooks/useToast";
import { ApprovalState, useTokenApprove } from "hooks/useTokenApprove";
import { useTokenBalance } from "hooks/useTokenBalance";
import { FC, useState } from "react";
import { ZERO } from "utils/bigNumber";
import { getDecimalAmount, getFullDisplayBalance } from "utils/formatBalances";
import { useBankDeposit } from "../hooks/useBankDeposit";
import { EarnFaucetButton } from "./EarnFaucetButton";

export interface EarnDepositModalProps extends ModalProps {
  bank: Bank;
}

export const EarnDepositModal: FC<EarnDepositModalProps> = ({
  isOpen,
  onDismiss,
  bank,
}) => {
  const [input, setInput] = useState("");
  const [pendingTx, setPendingTx] = useState(false);
  const { isTestnet } = useNetwork();
  const { toastSuccess, toastError } = useToast();

  const underlyingAddress = useAddress(bank.underlying.address);
  const bankAddress = useAddress(bank.address);

  const { balance } = useTokenBalance(underlyingAddress);
  const { approvalState, onApprove } = useTokenApprove(
    underlyingAddress,
    bankAddress,
    getDecimalAmount(input, bank.underlying.decimals)
  );
  const { onDeposit } = useBankDeposit(bankAddress);

  const handleDeposit = async () => {
    setPendingTx(true);
    try {
    } catch (error) {}
  };

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
          {(approvalState === ApprovalState.NOT_APPROVED ||
            approvalState === ApprovalState.PENDING) && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={approvalState === ApprovalState.PENDING}
              onClick={onApprove}
            >
              {approvalState === ApprovalState.PENDING
                ? `Approving ${bank.underlying.symbol}`
                : `Approve ${bank.underlying.symbol}`}
            </Button>
          )}
          {(approvalState === ApprovalState.APPROVED ||
            approvalState === ApprovalState.UNKNOWN) && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={!input || approvalState === ApprovalState.UNKNOWN}
              onClick={async () => {
                setPendingTx(true);
                try {
                  await onDeposit(
                    getDecimalAmount(input, bank.underlying.decimals)
                  );
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
        {isTestnet && (
          <Grid item>
            <EarnFaucetButton token={bank.underlying} onClick={() => {}} />
          </Grid>
        )}
      </Grid>
    </Modal>
  );
};
