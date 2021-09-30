import { Avatar, Box, Typography } from "@material-ui/core";
import { Button, Flex, Modal, ModalProps } from "@ohfinance/oh-ui";
import { FC } from "react";
import OhToken from "assets/img/oh-token.svg";
import { Balance } from "components/Balance";
import { getFullDisplayBalance } from "utils/formatBalances";
import { useWeb3React } from "@web3-react/core";
import { useTokenBalance } from "hooks/useTokenBalance";
import { getTokenAddress } from "helpers/addressHelper";
import { FaExchangeAlt, FaExternalLinkAlt, FaLink } from "react-icons/fa";
import { Networks } from "config/constants/networks";
import { Tokens } from "config/constants/tokens";
import BigNumber from "bignumber.js";

interface BalanceModalProps extends ModalProps {
  tokenBalance: BigNumber;
  chainId: number;
}

export const BalanceModal: FC<BalanceModalProps> = ({
  isOpen,
  onDismiss,
  tokenBalance,
  chainId,
}) => {
  return (
    <Modal title="Oh! Token" isOpen={!!isOpen} onDismiss={onDismiss}>
      <Flex p={2} center>
        <Avatar src={OhToken} style={{ height: "128px", width: "128px" }} />
      </Flex>
      <Typography align="center" variant="body1">
        <b>
          <Balance value={+getFullDisplayBalance(tokenBalance)} suffix=" OH" />
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
          endIcon={<FaLink />}
          color="primary"
          // size="small"
          // style={{ alignItems: "center", justifyContent: "center" }}
          href={`${Networks[chainId].blockExplorerUrls[0]}/address/${Tokens.ohToken.address}`}
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
        Swap Oh! Tokens
      </Button>
    </Modal>
  );
};
