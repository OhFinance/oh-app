import { Avatar, Typography } from "@material-ui/core";
import { Button, Flex, Modal, ModalProps, Text } from "@ohfinance/oh-ui";
import { FC } from "react";
import OhToken from "assets/img/oh-token.svg";
import { Balance } from "components/Balance";
import { getFullDisplayBalance } from "utils/formatBalances";
import { FaExchangeAlt } from "react-icons/fa";
import BigNumber from "bignumber.js";
import { useNetwork } from "hooks/useNetwork";
import { LinkButton } from "components/LinkButton";
import { RegisterTokenButton } from "components/RegisterTokenButton";
import tokens from "config/constants/tokens";
import { FetchStatus, TokenBalanceState } from "hooks/useTokenBalance";
import { Skeleton } from "@material-ui/lab";

export interface TokenBalanceModalProps extends ModalProps {
  address: string;
  tokenBalance: TokenBalanceState;
}

export const TokenBalanceModal: FC<TokenBalanceModalProps> = ({
  isOpen,
  onDismiss,
  address,
  tokenBalance,
}) => {
  const { balance, fetchStatus } = tokenBalance;
  const { blockExplorerUrl, swapRouterUrl } = useNetwork();

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
      <Flex center>
        {fetchStatus === FetchStatus.SUCCESS ? (
          <Text align="center">
            <b>
              <Balance value={getFullDisplayBalance(balance)} suffix=" OH" />
            </b>
          </Text>
        ) : (
          <Skeleton width={60} height={24} />
        )}
      </Flex>

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

      <Flex center my={2}>
        <RegisterTokenButton
          address={address}
          symbol={tokens.ohToken.symbol}
          decimals={tokens.ohToken.decimals}
        />
      </Flex>

      <Button
        fullWidth
        variant="contained"
        color="secondary"
        startIcon={<FaExchangeAlt />}
        onClick={() =>
          window.open(
            // `https://app.sushi.com/swap?inputCurrency=${address}&outputCurrency=ETH`,
            swapRouterUrl,
            "_blank"
          )
        }
      >
        Swap Oh! Tokens
      </Button>
    </Modal>
  );
};
