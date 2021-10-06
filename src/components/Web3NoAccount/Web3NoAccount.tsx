import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Flex } from "@ohfinance/oh-ui";
import { Web3ProviderButton } from "components/Web3ProviderButton";
import connectors from "config/constants/connectors";
import { CONNECTOR_STORAGE_KEY } from "config/constants/values";
import useAuth from "hooks/useAuth";

export const Web3NoAccount = () => {
  const { login } = useAuth();

  return (
    <Flex center column>
      <Box mb={4}>
        <Typography variant="h5" align="center">
          Login with your Wallet
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {connectors.map((connector, i) => (
          <Grid item key={i} xs={12} md={6}>
            <Web3ProviderButton
              connector={connector}
              onLogin={() => {
                login(connector.connectorId);
                // onDismiss();
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
    </Flex>
  );
};
