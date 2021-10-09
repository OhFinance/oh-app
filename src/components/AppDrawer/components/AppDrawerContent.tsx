import { Fragment } from "react";
import {
  BASE_URL,
  Flex,
  IconButton,
  MEDIUM_URL,
  TWITTER_URL,
} from "@ohfinance/oh-ui";
import OhBrand from "assets/img/oh-brand.png";
import { Box } from "@material-ui/core";
import { AppDrawerList } from "./AppDrawerList";
import { FaHome, FaMediumM, FaTwitter } from "react-icons/fa";

export const AppDrawerContent = () => {
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
        <AppDrawerList />
      </Flex>
      <Box mb={2}>
        <Flex center>
          <IconButton size="medium" href={TWITTER_URL}>
            <FaTwitter size="32px" />
          </IconButton>
          <IconButton size="medium" href={MEDIUM_URL}>
            <FaMediumM size="32px" />
          </IconButton>
          <IconButton size="medium" href={BASE_URL}>
            <FaHome size="32px" />
          </IconButton>
        </Flex>
        {/* <Typography align="center">Version: v{version}</Typography> */}
      </Box>
    </Fragment>
  );
};
