import { ModalProps } from "@ohfinance/oh-ui";
import BigNumber from "bignumber.js";
import { TransactionConfirmationModal } from "components/TransactionConfirmationModal";
import { Bank } from "config/constants/types";
import { useAddress } from "hooks/useAddress";
import { useBankContract } from "hooks/useContract";
import { useTokenBalance } from "hooks/useTokenBalance";
import { FC, useCallback, useMemo, useState } from "react";
import { useTransactionAdder } from "state/transactions/hooks";
import { getDecimalAmount, getFullDisplayBalance } from "utils/formatBalances";
import { useBankData } from "views/Earn/hooks/useBankData";
import { EarnWithdrawConfirmation } from "./EarnWithdrawConfirmation";
import { EarnWithdrawInput } from "./EarnWithdrawInput";

export interface EarnWithdrawModalProps extends ModalProps {
  bank: Bank;
}

export const EarnWithdrawModal: FC<EarnWithdrawModalProps> = ({
  isOpen,
  onDismiss,
  bank,
}) => {
  const [confirming, setConfirming] = useState<boolean>(false);
  const [txPending, setTxPending] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");
  const addTransaction = useTransactionAdder();

  const [input, setInput] = useState("");

  const bankAddress = useAddress(bank.address);
  const bankContract = useBankContract(bankAddress);

  const { balance } = useTokenBalance(bankAddress);

  const bankBalance = useMemo(() => {
    return getFullDisplayBalance(balance, bank.decimals, bank.decimals);
  }, [balance, bank]);

  const { virtualPrice, getShareValue } = useBankData(bankAddress);

  const withdrawAmount = useMemo(() => {
    return getFullDisplayBalance(
      getDecimalAmount(input, bank.decimals),
      bank.decimals
    );
  }, [bank, input]);

  const receiveAmount = useMemo(() => {
    const tokenValue = getShareValue(new BigNumber(input), bank.decimals);

    return getFullDisplayBalance(
      getDecimalAmount(tokenValue, bank.decimals),
      bank.decimals
    );
  }, [bank, input, getShareValue]);

  const exchangeRate = useMemo(() => {
    return (
      virtualPrice &&
      getFullDisplayBalance(virtualPrice, bank.decimals, bank.decimals)
    );
  }, [bank, virtualPrice]);

  const handleWithdraw = useCallback(async () => {
    setTxPending(true);

    await bankContract
      .withdraw(getDecimalAmount(input, bank.decimals).toString())
      .then((response) => {
        setTxPending(false);

        addTransaction(response, {
          summary: `Withdrew ${receiveAmount} ${bank.underlying.symbol} for ${withdrawAmount} ${bank.symbol}`,
        });

        setTxHash(response.hash);
      })
      .catch((error) => {
        console.error(error);
        setTxPending(false);
      });
  }, [
    bank,
    bankContract,
    input,
    withdrawAmount,
    receiveAmount,
    addTransaction,
  ]);

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

  const content = () => {
    if (!confirming) {
      return (
        <EarnWithdrawInput
          bank={bank}
          input={input}
          setInput={setInput}
          bankBalance={bankBalance}
          onConfirm={() => setConfirming(true)}
        />
      );
    } else if (!txPending) {
      return (
        <EarnWithdrawConfirmation
          bank={bank}
          input={input}
          withdrawAmount={withdrawAmount}
          receiveAmount={receiveAmount}
          exchangeRate={exchangeRate}
          // totalShare={new BigNumber(totalShare).toString()}
          onBack={() => setConfirming(false)}
          onWithdraw={handleWithdraw}
        />
      );
    }
  };

  return (
    <TransactionConfirmationModal
      title={`Withdraw ${bank.underlying.symbol}`}
      isOpen={isOpen}
      onDismiss={handleDismiss}
      hash={txHash}
      pending={txPending}
      onBack={() => setTxPending(false)}
      pendingText={`Withdrawing ${receiveAmount} USDC for ${withdrawAmount} OH-USDC...`}
      content={content}
    />
  );
};
