import { Modal, ModalProps } from "@ohfinance/oh-ui";
import { FC, ReactElement } from "react";
import { TransactionPendingContent } from "./TransactionPendingContent";
import { TransactionSubmittedContent } from "./TransactionSubmittedContent";

export interface TransactionConfirmationModalProps extends ModalProps {
  pending?: boolean;
  onBack?: () => void;
  hash?: string;
  pendingText: string;
  content: () => ReactElement;
}

export const TransactionConfirmationModal: FC<TransactionConfirmationModalProps> =
  ({
    title,
    isOpen,
    onDismiss,
    pending,
    onBack,
    hash,
    pendingText,
    content,
  }) => {
    return (
      <Modal
        title={title}
        isOpen={isOpen}
        onDismiss={onDismiss}
        maxWidth="md"
        fullWidth
      >
        {pending ? (
          <TransactionPendingContent
            pendingText={pendingText}
            onBack={onBack}
          />
        ) : hash ? (
          <TransactionSubmittedContent hash={hash} onDismiss={onDismiss} />
        ) : (
          content()
        )}
      </Modal>
    );
  };
