import { ModalProps } from "@ohfinance/oh-ui";
import BigNumber from "bignumber.js";
import { TransactionConfirmationModal } from "components/TransactionConfirmationModal";
import { Pool } from "config/constants/pools";
import { useStakingContract } from "hooks/useContract";
import { useWeb3 } from "hooks/useWeb3";
import { FC, useCallback, useState } from "react";
import { TransactionType } from "state/transactions/actions";
import { useTransactionAdder } from "state/transactions/hooks";
import { TEN } from "utils/bigNumber";
import { calculateGasMargin } from "utils/calculateGasMargin";
import { StakePoolModalContent } from "./StakePoolModalContent";

export interface StakePoolModalProps extends ModalProps {
  pool: Pool;
}

export const StakePoolModal: FC<StakePoolModalProps> = ({
  isOpen,
  onDismiss,
  pool,
}) => {
  const { chainId, library, account } = useWeb3();
  const [confirming, setConfirming] = useState<boolean>(false);
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");
  const [pending, setPending] = useState<{
    amount: string;
    days?: number;
  }>();

  const handleDismiss = useCallback(() => {
    if (confirming) {
      setConfirming(false);
    } else if (attemptingTxn) {
      setAttemptingTxn(false);
    } else {
      setTxHash("");
    }

    if (pending) {
      setPending(undefined);
    }

    onDismiss();
  }, [confirming, attemptingTxn, pending, setPending, onDismiss]);

  const poolContract = useStakingContract(pool.poolAddress);

  const addTransaction = useTransactionAdder();

  async function onAdd(duration?: number, amount?: string) {
    if (!chainId || !library || !account || !amount) return;

    let estimate = poolContract.estimateGas.deposit;
    let method = poolContract.deposit;
    let durationArg = duration === undefined ? 600 : duration;
    let args = [amount, durationArg, account];
    setPending({
      amount: new BigNumber(amount)
        .dividedBy(TEN.pow(pool.token.decimals))
        .toFixed(3, 1),
      days:
        duration !== undefined
          ? Math.floor(duration / 60 / 60 / 24)
          : undefined,
    });
    setAttemptingTxn(true);

    await estimate(...args)
      .then((estimatedGasLimit) =>
        method(...args, {
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).then((response) => {
          setAttemptingTxn(false);

          addTransaction(
            response,
            typeof duration === "number"
              ? {
                  type: TransactionType.DEPOSIT_LOCKED_STAKING,
                  duration: durationArg,
                }
              : {
                  type: TransactionType.DEPOSIT_FLEXIBLE_STAKING,
                }
          );
          setTxHash(response.hash);
        })
      )
      .catch((error) => {
        setAttemptingTxn(false);
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error);
        }
      });
  }

  const content = () => (
    <StakePoolModalContent pool={pool} addTransaction={onAdd} />
  );

  return (
    <TransactionConfirmationModal
      title={`Stake ${pool.token.symbol}`}
      isOpen={isOpen}
      onDismiss={handleDismiss}
      hash={txHash}
      pending={attemptingTxn}
      onBack={() => setAttemptingTxn(false)}
      pendingText={`Staking ${pending?.amount} ${pool.token.symbol} with ${
        pending?.days !== undefined ? `${pending?.days} days` : "no"
      } lockup`}
      content={content}
    />
  );
};
