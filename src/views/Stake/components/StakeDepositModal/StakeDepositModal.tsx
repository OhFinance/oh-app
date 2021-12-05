import { ModalProps } from "@ohfinance/oh-ui";
import { TransactionConfirmationModal } from "components/TransactionConfirmationModal";
import { Pool } from "config/constants/types";
import { FC, useCallback, useState } from "react";
import { useTransactionAdder } from "state/transactions/hooks";
import { StakeDepositModalContent } from "./StakeDepositModalContent";

export interface StakeDepositModalProps extends ModalProps {
  pool: Pool;
}

export const StakeDepositModal: FC<StakeDepositModalProps> = ({
  isOpen,
  onDismiss,
  pool,
}) => {
  const [confirming, setConfirming] = useState<boolean>(false);
  const [txPending, setTxPending] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");
  const addTransaction = useTransactionAdder();

  const [input, setInput] = useState("");

  const handleDismiss = useCallback(() => {
    if (confirming) {
      setConfirming(false);
    } else if (txPending) {
      setTxPending(false);
    } else {
      setTxHash("");
    }

    onDismiss();
  }, [confirming, txPending, onDismiss]);

  const content = () => <StakeDepositModalContent pool={pool} />;

  return (
    <TransactionConfirmationModal
      title={`${pool.staked.symbol} Staking Deposit`}
      isOpen={isOpen}
      onDismiss={handleDismiss}
      hash={txHash}
      pending={txPending}
      onBack={() => setTxPending(false)}
      pendingText={`Unstaking ${0} ${pool.staked.symbol}`}
      content={content}
    />
  );
};
