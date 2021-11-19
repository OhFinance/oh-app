import { Avatar, Box, Grid, Typography } from "@material-ui/core";
import {
  Button,
  CMC_URL,
  DEXTOOLS_URL,
  Flex,
  GECKO_URL,
  Link,
  Modal,
  ModalProps,
  Text,
} from "@ohfinance/oh-ui";
import { FC } from "react";
import OhToken from "assets/img/oh-token.svg";
import CoinGecko from "assets/img/gecko.svg";
import CoinMarketCap from "assets/img/cmc.png";
import DexTools from "assets/img/dextools.png";
import { Balance } from "components/Balance";
import { getFullDisplayBalance } from "utils/formatBalances";
import { FaExchangeAlt } from "react-icons/fa";
import { useNetwork } from "hooks/useNetwork";
import { LinkButton } from "components/LinkButton";
import { RegisterTokenButton } from "components/RegisterTokenButton";
import tokens from "config/constants/tokens";
import { FetchStatus, TokenBalanceState } from "hooks/useTokenBalance";
import { Alert, Skeleton } from "@material-ui/lab";

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
      p={0}
    >
      <Alert severity="warning">
        Do not send tokens directly to the contract address. You will not be
        able to retrieve them!
      </Alert>
      <Box p={3}>
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
            <Skeleton width={60} height={30} />
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

        <Flex center my={3}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Grid item>
              <Link external href={GECKO_URL}>
                <img src={CoinGecko} alt="coin-gecko" height={40} />
              </Link>
            </Grid>
            <Grid item>
              <Link external href={CMC_URL}>
                <img src={CoinMarketCap} alt="coin-market-cap" height={40} />
              </Link>
            </Grid>
            <Grid item>
              <Link external href={DEXTOOLS_URL}>
                <img src={DexTools} alt="dextools" height={40} />
              </Link>
            </Grid>
          </Grid>
        </Flex>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<FaExchangeAlt />}
          onClick={() => window.open(swapRouterUrl, "_blank")}
        >
          Swap Oh! Tokens
        </Button>
      </Box>
    </Modal>
  );
};
