import { ButtonGroup } from "@material-ui/core";
import { Button, Flex, Modal, ModalProps } from "@ohfinance/oh-ui";
import { FC, useState } from "react";
import { Web3AccountView } from "./components/Web3AccountView";
import { Web3TransactionsView } from "./components/Web3TransactionsView";

export type AccountViewMode = "account" | "transactions";

export const Web3AccountModal: FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const [viewMode, setViewMode] = useState<AccountViewMode>("account");

  return (
    <Modal
      title="Account Details"
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      maxWidth="sm"
      fullWidth
      p={0}
    >
      <Flex center>
        <ButtonGroup>
          <Button style={{ width: 150 }} onClick={() => setViewMode("account")}>
            Account
          </Button>
          <Button
            style={{ width: 150 }}
            onClick={() => setViewMode("transactions")}
          >
            Transactions
          </Button>
        </ButtonGroup>
      </Flex>

      {viewMode === "account" ? (
        <Web3AccountView onDismiss={onDismiss} />
      ) : (
        <Web3TransactionsView />
      )}
    </Modal>
  );
};
