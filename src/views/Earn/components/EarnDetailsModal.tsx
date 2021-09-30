import { Modal, ModalProps } from "@ohfinance/oh-ui";
import { Bank } from "config/constants/types";
import { FC } from "react";

interface EarnDetailsModalProps extends ModalProps {
  bank: Bank;
}

export const EarnDetailsModal: FC<EarnDetailsModalProps> = ({
  isOpen,
  onDismiss,
  bank,
}) => {
  return (
    <Modal
      title={`${bank.symbol} Details`}
      isOpen={!!isOpen}
      onDismiss={onDismiss}
    ></Modal>
  );
};
