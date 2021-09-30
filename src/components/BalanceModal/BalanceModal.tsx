import { Avatar, Box, Typography } from "@material-ui/core";
import { Button, Flex, Modal, ModalProps } from "@ohfinance/oh-ui";
import { FC } from "react";
import OhToken from "assets/img/oh-token.svg";
import { Balance } from "components/Balance";
import { getFullDisplayBalance } from "utils/formatBalances";
import { useWeb3React } from "@web3-react/core";
import { useTokenBalance } from "hooks/useTokenBalance";
import { getTokenAddress } from "helpers/addressHelper";
import { FaExchangeAlt, FaExternalLinkAlt } from "react-icons/fa";

export const BalanceModal: FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { account, chainId } = useWeb3React();
  const { balance } = useTokenBalance(getTokenAddress(chainId));

  return (
    <Modal title="Oh! Token" isOpen={!!isOpen} onDismiss={onDismiss}>
      <Flex p={2} center>
        <Avatar src={OhToken} style={{ height: "128px", width: "128px" }} />
      </Flex>
      <Typography align="center" variant="body1">
        <b>
          <Balance value={+getFullDisplayBalance(balance)} suffix=" OH" />
        </b>
      </Typography>
      <Typography
        align="center"
        variant="subtitle2"
        color="textSecondary"
        paragraph
      >
        Current Balance
      </Typography>

      <Flex center my={2}>
        <Button
          endIcon={<FaExternalLinkAlt />}
          color="primary"
          size="small"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          Contract Address
        </Button>
      </Flex>

      <Button
        fullWidth
        variant="contained"
        color="secondary"
        startIcon={<FaExchangeAlt />}
      >
        Buy Oh! Tokens
      </Button>
    </Modal>
  );
};
