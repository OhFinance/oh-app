import { ModalProps } from "@ohfinance/oh-ui";
import { TransactionConfirmationModal } from "components/TransactionConfirmationModal";
import { Pool } from "config/constants/types";
import { FC, useCallback, useState } from "react";
import { useTransactionAdder } from "state/transactions/hooks";
import { StakePoolModalContent } from "./StakePoolModalContent";

export interface StakePoolModalProps extends ModalProps {
  pool: Pool;
}

export const StakePoolModal: FC<StakePoolModalProps> = ({
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

  const content = () => <StakePoolModalContent pool={pool} />;

  return (
    <TransactionConfirmationModal
      title={`Stake ${pool.staked.symbol}`}
      isOpen={isOpen}
      onDismiss={handleDismiss}
      hash={txHash}
      pending={txPending}
      onBack={() => setTxPending(false)}
      pendingText={`Staking ${0} ${
        pool.staked.symbol
      } with ${"Variable"} Lockup`}
      content={content}
    />
  );
};
