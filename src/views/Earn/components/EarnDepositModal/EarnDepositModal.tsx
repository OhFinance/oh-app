import { ModalProps } from "@ohfinance/oh-ui";
import BigNumber from "bignumber.js";
import { TransactionConfirmationModal } from "components/TransactionConfirmationModal";
import { Bank } from "config/constants/types";
import { useAddress } from "hooks/useAddress";
import { useBankContract } from "hooks/useContract";
import { useTokenApprove } from "hooks/useTokenApprove";
import { useTokenBalance } from "hooks/useTokenBalance";
import { FC, useCallback, useMemo, useState } from "react";
import { useTransactionAdder } from "state/transactions/hooks";
import { getDecimalAmount, getFullDisplayBalance } from "utils/formatBalances";
import { useBankValue } from "views/Earn/hooks/useBankValue";
import { EarnFaucetButton } from "../EarnFaucetButton";
import { EarnDepositConfirmation } from "./EarnDepositConfirmation";
import { EarnDepositInput } from "./EarnDepositInput";

export interface EarnDepositModalProps extends ModalProps {
  bank: Bank;
}

export const EarnDepositModal: FC<EarnDepositModalProps> = ({
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
  const underlyingAddress = useAddress(bank.underlying.address);
  const bankContract = useBankContract(bankAddress);

  const { approvalState, onApprove } = useTokenApprove(
    underlyingAddress,
    bankAddress,
    getDecimalAmount(input, bank.underlying.decimals)
  );

  const { balance } = useTokenBalance(underlyingAddress);

  const underlyingBalance = useMemo(() => {
    return getFullDisplayBalance(balance, bank.underlying.decimals);
  }, [balance, bank]);

  const { virtualPrice, getTokenValue, getTotalBankShare } =
    useBankValue(bankAddress);

  const depositAmount = useMemo(() => {
    return getFullDisplayBalance(
      getDecimalAmount(input, bank.underlying.decimals),
      bank.underlying.decimals
    );
  }, [bank, input]);

  const receiveAmount = useMemo(() => {
    const tokenValue = getTokenValue(new BigNumber(input));
    return getFullDisplayBalance(
      getDecimalAmount(tokenValue, bank.decimals),
      bank.decimals
    );
  }, [bank, input, getTokenValue]);

  const exchangeRate = useMemo(() => {
    return virtualPrice && getFullDisplayBalance(virtualPrice, bank.decimals);
  }, [bank, virtualPrice]);

  const totalShare = useMemo(() => {
    return input && getTotalBankShare(new BigNumber(input), bank.decimals);
  }, [bank, input, getTotalBankShare]);

  const handleDeposit = useCallback(async () => {
    setTxPending(true);

    await bankContract
      .deposit(getDecimalAmount(input, bank.underlying.decimals).toString())
      .then((response) => {
        setTxPending(false);

        addTransaction(response, {
          summary: `Deposited ${depositAmount} USDC for ${receiveAmount} OH-USDC`,
        });

        setTxHash(response.hash);
      })
      .catch((error) => {
        setTxPending(false);
      });
  }, [bank, bankContract, input, depositAmount, receiveAmount, addTransaction]);

  const handleDismiss = () => {
    if (confirming) {
      setConfirming(false);
    } else if (txPending) {
      setTxPending(false);
    } else {
      setTxHash("");
    }

    onDismiss();
  };

  const content = () => {
    if (!confirming) {
      return (
        <EarnDepositInput
          bank={bank}
          input={input}
          setInput={setInput}
          underlyingBalance={underlyingBalance}
          onConfirm={() => setConfirming(true)}
        />
      );
    } else if (!txPending) {
      return (
        <EarnDepositConfirmation
          bank={bank}
          input={input}
          approvalState={approvalState}
          depositAmount={depositAmount}
          receiveAmount={receiveAmount}
          exchangeRate={exchangeRate}
          totalShare={new BigNumber(totalShare).toString()}
          onApprove={onApprove}
          onConfirm={() => setTxPending(true)}
          onBack={() => setConfirming(false)}
          onDeposit={handleDeposit}
        />
      );
    }
  };

  return (
    <TransactionConfirmationModal
      title={`Deposit ${bank.underlying.symbol}`}
      isOpen={isOpen}
      onDismiss={handleDismiss}
      hash={txHash}
      pending={txPending}
      onBack={() => setTxPending(false)}
      pendingText={`Depositing ${depositAmount} USDC for ${receiveAmount} OH-USDC...`}
      content={content}
    />
  );
};
