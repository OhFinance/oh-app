import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  Typography,
  Box,
} from "@material-ui/core";
import { Button, Flex, Modal, ModalProps } from "@ohfinance/oh-ui";
import { useWeb3React } from "@web3-react/core";
import { LinkButton } from "components/LinkButton";
import { Web3AccountAvatar } from "components/Web3AccountAvatar";
import useAuth from "hooks/useAuth";
import { useNetwork } from "hooks/useNetwork";
import { useToken } from "hooks/useToken";
import { FC } from "react";
import { FaCopy, FaExternalLinkAlt } from "react-icons/fa";

export const Web3AccountModal: FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { logout } = useAuth();
  const { account } = useWeb3React();
  const { blockExplorerUrl } = useNetwork();

  return (
    <Modal
      title="Account Details"
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      fullWidth
    >
      <Flex column>
        <Flex center>
          <Web3AccountAvatar account={account} size={128} />
        </Flex>
        <Typography>Your Account</Typography>
        {/* <FormControl> */}
        {/* <InputLabel htmlFor="account-address">Your Address</InputLabel> */}
        <OutlinedInput
          id="account-address"
          value={account}
          endAdornment={
            <InputAdornment position="end">
              <FaCopy />
            </InputAdornment>
          }
        />
        {/* </FormControl> */}

        <Box textAlign="center" mt={1}>
          <LinkButton
            onClick={() =>
              window.open(`${blockExplorerUrl}/address/${account}`, "_blank")
            }
          >
            View on Block Explorer
          </LinkButton>
        </Box>

        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              logout();
              onDismiss();
            }}
          >
            Logout
          </Button>
        </Box>
      </Flex>
    </Modal>
  );
};
