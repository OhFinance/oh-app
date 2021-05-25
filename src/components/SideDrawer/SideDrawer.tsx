import { Box, Divider, Drawer, List, makeStyles } from "@material-ui/core";
import paths from "config/constants/paths";
import { useCallback } from "react";
import { SideDrawerLink } from "./components/SideDrawerLink";
import OhLogo from "assets/img/oh-brand.png";
import {
  Flex,
  TwitterButton,
  TelegramButton,
  HomeButton,
  useMobile,
} from "@ohfinance/oh-ui";

export interface AppDrawer {}

export const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
  },
}));

export const SideDrawer = () => {
  const classes = useStyles();
  const mobile = useMobile();

  const onClose = useCallback(() => {}, []);

  const onOpen = useCallback(() => {}, []);

  return (
    <Drawer
      anchor="left"
      variant={mobile ? "temporary" : "permanent"}
      className={classes.drawer}
      open
    >
      <Box p={4}>
        <Flex column grow>
          <Box marginBottom={4}>
            <Flex center>
              <img
                src={OhLogo}
                alt="oh-finance-logo"
                width="auto"
                height="96px"
              />
            </Flex>
          </Box>
          <Divider />
          <List>
            {paths.map((path) => (
              <Box marginY={4}>
                <SideDrawerLink path={path} />
              </Box>
            ))}
          </List>
        </Flex>
        <Box>
          <Flex center>
            <TwitterButton />
            <TelegramButton />
            <HomeButton />
          </Flex>
        </Box>
      </Box>
    </Drawer>
  );
};
