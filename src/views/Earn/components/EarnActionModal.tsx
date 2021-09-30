import { Modal, ModalProps } from "@ohfinance/oh-ui";
import { Bank } from "config/constants/types";
import { FC } from "react";

interface EarnActionModalProps extends ModalProps {
  action: "Deposit" | "Withdraw";
  bank: Bank;
}

export const EarnActionModal: FC<EarnActionModalProps> = ({
  isOpen,
  onDismiss,
  action,
}) => {
  return (
    <Modal title={`${action}`} isOpen={!!isOpen} onDismiss={onDismiss}></Modal>
  );
};
