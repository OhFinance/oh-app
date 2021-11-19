import { Box, Grid } from "@material-ui/core";
import { Button, Flex, Subheading, Subtitle } from "@ohfinance/oh-ui";
import { LinkButton } from "components/LinkButton";
import { Web3AccountAvatar } from "components/Web3AccountAvatar";
import { connectorNames } from "config/constants/connectors";
import { ConnectorNames } from "config/constants/types";
import { CONNECTOR_STORAGE_KEY } from "config/constants/values";
import useAuth from "hooks/useAuth";
import { useNetwork } from "hooks/useNetwork";
import { useWeb3 } from "hooks/useWeb3";
import { FaCopy } from "react-icons/fa";
import { getDisplayAddress } from "utils/formatAddress";

export const Web3AccountView = ({ onDismiss }) => {
  const { logout } = useAuth();
  const { account } = useWeb3();
  const { blockExplorerUrl } = useNetwork();

  const connectorId = window.localStorage.getItem(
    CONNECTOR_STORAGE_KEY
  ) as ConnectorNames;

  return (
    <Flex column p={3}>
      <Flex center>
        <Web3AccountAvatar account={account} size={128} />
      </Flex>

      <Flex center my={1}>
        <Subheading align="center">
          <b>{getDisplayAddress(account)}</b>
        </Subheading>
      </Flex>

      <Grid container alignItems="center" justifyContent="center" spacing={2}>
        <Grid item>
          <Button
            color="primary"
            size="small"
            onClick={() => navigator.clipboard.writeText(account)}
            endIcon={<FaCopy style={{ height: 12, width: 12 }} />}
            style={{ paddingLeft: 16, paddingRight: 16 }}
          >
            Copy Address
          </Button>
        </Grid>
        <Grid item>
          <LinkButton link={`${blockExplorerUrl}/address/${account}`}>
            View on Block Explorer
          </LinkButton>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            logout();
            onDismiss();
          }}
        >
          Disconnect Wallet
        </Button>
      </Box>
      <Flex center my={1}>
        <Subtitle align="center" color="textSecondary" style={{ fontSize: 14 }}>
          Connected with {connectorNames[connectorId]}
        </Subtitle>
      </Flex>
    </Flex>
  );
};
