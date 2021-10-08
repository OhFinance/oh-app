import { Avatar, Typography } from "@material-ui/core";
import { Button, Flex, Modal, ModalProps } from "@ohfinance/oh-ui";
import { FC, useMemo } from "react";
import OhToken from "assets/img/oh-token.svg";
import { Balance } from "components/Balance";
import { getFullDisplayBalance } from "utils/formatBalances";
import { getTokenAddress } from "helpers/addressHelper";
import { FaExchangeAlt } from "react-icons/fa";
import BigNumber from "bignumber.js";
import { useNetwork } from "hooks/useNetwork";
import { LinkButton } from "components/LinkButton";
import { useWeb3 } from "hooks/useWeb3";

interface BalanceModalProps extends ModalProps {
  tokenBalance: BigNumber;
  chainId: number;
}

export const BalanceModal: FC<BalanceModalProps> = ({
  isOpen,
  onDismiss,
  tokenBalance,
}) => {
  const { chainId } = useWeb3();
  const { blockExplorerUrl } = useNetwork();
  const address = useMemo(() => getTokenAddress(chainId), [chainId]);

  return (
    <Modal title="Oh! Token" isOpen={!!isOpen} onDismiss={onDismiss}>
      <Flex p={2} center>
        <Avatar src={OhToken} style={{ height: "128px", width: "128px" }} />
      </Flex>
      <Typography align="center" variant="body1">
        <b>
          <Balance value={getFullDisplayBalance(tokenBalance)} suffix=" OH" />
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
        <LinkButton link={`${blockExplorerUrl}/address/${address}`}>
          Contract Address
        </LinkButton>
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
