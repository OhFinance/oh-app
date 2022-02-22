import { ModalProps } from "@ohfinance/oh-ui";
import { TransactionConfirmationModal } from "components/TransactionConfirmationModal";
import { Pool } from "config/constants/pools";
import { BigNumber, ContractFunction } from "ethers";
import { useStakingContract } from "hooks/useContract";
import { DepositsState } from "hooks/useDeposits";
import { useWeb3 } from "hooks/useWeb3";
import { FC, useCallback, useState } from "react";
import { TransactionType } from "state/transactions/actions";
import { useTransactionAdder } from "state/transactions/hooks";
import { calculateGasMargin } from "utils/calculateGasMargin";
import { getFullDisplayBalance } from "utils/formatBalances";
import { StakeDepositModalContent } from "./StakeDepositModalContent";

export interface StakeDepositModalProps extends ModalProps {
  pool: Pool;
  depositId: number;
  deposit: DepositsState["deposits"][0];
}

export const StakeDepositModal: FC<StakeDepositModalProps> = ({
  isOpen,
  onDismiss,
  pool,
  depositId,
  deposit,
}) => {
  const [confirming, setConfirming] = useState<boolean>(false);
  const [txPending, setTxPending] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");

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

  const poolContract = useStakingContract(pool.poolAddress);
  const { chainId, library, account } = useWeb3();
  const addTransaction = useTransactionAdder();
  async function onUnstake() {
    if (!chainId || !library || !account) return;

    let estimate = poolContract.estimateGas.withdraw;
    let method = poolContract.withdraw;
    let args = [depositId, account];

    setTxPending(true);

    await estimate(...args)
      .then((estimatedGasLimit) =>
        method(...args, {
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).then((response) => {
          setTxPending(false);

          addTransaction(response, {
            type: TransactionType.UNSTAKE,
          });
          setTxHash(response.hash);
        })
      )
      .catch((error) => {
        setTxPending(false);
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error);
        }
      });
  }

  const content = () => (
    <StakeDepositModalContent
      pool={pool}
      deposit={deposit}
      withdraw={onUnstake}
    />
  );

  return (
    <TransactionConfirmationModal
      title={`${pool.token.symbol} Staking Withdraw`}
      isOpen={isOpen}
      onDismiss={handleDismiss}
      hash={txHash}
      pending={txPending}
      onBack={() => setTxPending(false)}
      pendingText={`Unstaking ${getFullDisplayBalance(
        deposit.amount,
        pool.token.decimals
      )} ${pool.token.symbol}`}
      content={content}
    />
  );
};
