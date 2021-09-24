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
import { AccountAvatar } from "components/AccountAvatar";
import useAuth from "hooks/useAuth";
import { FC } from "react";
import { FaCopy, FaExternalLinkAlt } from "react-icons/fa";

export const AccountModal: FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { logout } = useAuth();
  const { account } = useWeb3React();

  return (
    <Modal
      title="Account Details"
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      fullWidth
    >
      <Flex column>
        <Flex center>
          <AccountAvatar account={account} />
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
          <Button variant="text" endIcon={<FaExternalLinkAlt />} href="">
            View on Block Explorer
          </Button>
        </Box>

        <Box textAlign="center" mt={2}>
          <Button
            variant="text"
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
