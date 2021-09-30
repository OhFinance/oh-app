import { Container, Grid, Typography } from "@material-ui/core";
import { Flex, Modal, ModalProps, Button } from "@ohfinance/oh-ui";
import { FC } from "react";
import { Web3LoginModalButton } from "./components/Web3LoginModalButton";
import connectors from "config/constants/connectors";
import useAuth from "hooks/useAuth";
import { CONNECTOR_STORAGE_KEY } from "config/constants/values";
import { Web3NetworkButton } from "components/Web3NetworkButton";

export const Web3LoginModal: FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { login } = useAuth();

  return (
    <Modal
      title="Login with your Wallet"
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      fullWidth
    >
      <Grid container spacing={2}>
        {connectors.map((connector, i) => (
          <Grid item key={i} xs={12} md={6}>
            <Web3LoginModalButton
              connector={connector}
              onLogin={() => {
                login(connector.connectorId);
                window.localStorage.setItem(
                  CONNECTOR_STORAGE_KEY,
                  connector.connectorId
                );
                onDismiss();
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Flex mt={4} column center>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Don't have a crypto wallet yet?
        </Typography>
        <Button color="primary" href="https://docs.oh.finance/">
          Learn How To Login
        </Button>
      </Flex>
    </Modal>
  );
};
