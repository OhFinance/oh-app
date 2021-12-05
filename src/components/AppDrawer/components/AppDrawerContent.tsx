import { Fragment } from "react";
import {
  Flex,
  Link,
  useMobile,
  TelegramButton,
  MediumButton,
  TwitterButton,
  GithubButton,
  BASE_URL,
  DOCS_URL,
} from "@ohfinance/oh-ui";
import OhBrand from "assets/img/oh-brand.png";
import { Box, Divider } from "@material-ui/core";
import { AppDrawerList } from "./AppDrawerList";
import { Web3NetworkButton } from "components/Web3NetworkButton";
import { TokenBalanceButton } from "components/TokenBalanceButton";
import { AppDrawerPrices } from "./AppDrawerPrices";

export const AppDrawerContent = ({ onDismiss }: { onDismiss?: () => void }) => {
  const mobile = useMobile();

  return (
    <Fragment>
      <Flex column grow>
        <Box m={4} mb={4}>
          <Flex center>
            <img
              src={OhBrand}
              alt="oh-finance-brand"
              width="auto"
              height="96px"
            />
          </Flex>
        </Box>

        <Box mb={4}>
          <AppDrawerList onDismiss={onDismiss} />
        </Box>

        <Box mb={4}>
          <AppDrawerPrices />
        </Box>
      </Flex>

      <Box my={1} mx={2}>
        {mobile && (
          <Flex mb={1}>
            <TokenBalanceButton fullWidth />
          </Flex>
        )}
        <Flex>
          <Web3NetworkButton fullWidth />
        </Flex>
      </Box>

      <Divider variant="middle" />
      <Box my={2}>
        <Flex center>
          <TwitterButton />
          <TelegramButton />
          <MediumButton />
          {/* <GithubButton /> */}
        </Flex>

        <Flex center>
          <Box mx={1}>
            <Link external href={BASE_URL}>
              Home
            </Link>
          </Box>
          <Box mx={1}>
            <Link external href={DOCS_URL}>
              Docs
            </Link>
          </Box>
        </Flex>
      </Box>
    </Fragment>
  );
};
