import { Grid, Typography } from "@material-ui/core";
import { Flex, Modal, ModalProps, Button } from "@ohfinance/oh-ui";
import { FC } from "react";
import { LoginModalButton } from "./components/LoginModalButton";
import connectors from "config/constants/connectors";
import useAuth from "hooks/useAuth";
import { CONNECTOR_STORAGE_KEY } from "config/constants/values";

export const LoginModal: FC<ModalProps> = ({ isOpen, onDismiss }) => {
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
            <LoginModalButton
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
