import { Avatar, Typography } from "@material-ui/core";
import { Button, Flex, Modal, ModalProps } from "@ohfinance/oh-ui";
import { FC } from "react";
import OhToken from "assets/img/oh-token.svg";
import { Balance } from "components/Balance";
import { getFullDisplayBalance } from "utils/formatBalances";
import { FaExchangeAlt } from "react-icons/fa";
import BigNumber from "bignumber.js";
import { useNetwork } from "hooks/useNetwork";
import { LinkButton } from "components/LinkButton";

export interface TokenBalanceModalProps extends ModalProps {
  address: string;
  balance: BigNumber;
}

export const TokenBalanceModal: FC<TokenBalanceModalProps> = ({
  isOpen,
  onDismiss,
  address,
  balance,
}) => {
  const { blockExplorerUrl } = useNetwork();

  return (
    <Modal
      title="Oh! Token"
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      maxWidth="sm"
      fullWidth
    >
      <Flex p={2} center>
        <Avatar src={OhToken} style={{ height: "128px", width: "128px" }} />
      </Flex>
      <Typography align="center" variant="body1">
        <b>
          <Balance value={getFullDisplayBalance(balance)} suffix=" OH" />
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
        onClick={() =>
          window.open(
            `https://app.sushi.com/swap?inputCurrency=${address}&outputCurrency=ETH`,
            "_blank"
          )
        }
      >
        Swap Oh! Tokens
      </Button>
    </Modal>
  );
};
