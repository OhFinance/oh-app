import {
  OutlinedInput,
  InputAdornment,
  Typography,
  Box,
  makeStyles,
  IconButton,
  Grid,
} from "@material-ui/core";
import { Button, Flex, Modal, ModalProps } from "@ohfinance/oh-ui";
import { LinkButton } from "components/LinkButton";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { Web3AccountAvatar } from "components/Web3AccountAvatar";
import useAuth from "hooks/useAuth";
import { useNetwork } from "hooks/useNetwork";
import { useWeb3 } from "hooks/useWeb3";
import { FC } from "react";
import { FaCopy } from "react-icons/fa";
import { useThemeManager } from "state/user/hooks";

const useStyles = makeStyles((theme) => ({
  input: {
    cursor: "copy",
    textOverflow: "ellipsis",
    msTextOverflow: "ellipsis",
  },
}));

export const Web3AccountModal: FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { logout } = useAuth();
  const { account } = useWeb3();
  const { blockExplorerUrl } = useNetwork();
  const classes = useStyles();

  return (
    <Modal
      title="Account Details"
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      maxWidth="sm"
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
          className={classes.input}
          value={account}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => navigator.clipboard.writeText(account)}
              >
                <FaCopy />
              </IconButton>
            </InputAdornment>
          }
        />
        {/* </FormControl> */}

        <Box textAlign="center" mt={1}>
          <LinkButton link={`${blockExplorerUrl}/address/${account}`}>
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