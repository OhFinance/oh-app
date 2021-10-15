import { makeStyles } from "@material-ui/core";
import { PageHeading } from "components/PageHeading";
import { Web3View } from "components/Web3View";
import { useUserEarnViewMode } from "state/user/hooks";
import { Box, Button, ButtonGroup } from "@material-ui/core";
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded";
import ViewModuleRoundedIcon from "@material-ui/icons/ViewModuleRounded";
import { Flex, useMobile } from "@ohfinance/oh-ui";
import { ViewMode } from "state/user/types";
import { EarnTableView } from "./components/EarnTableView/EarnTableView";
import { EarnCardView } from "./components/EarnCardView";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
    height: 40,
  },
}));

const Earn = () => {
  const classes = useStyles();
  const mobile = useMobile();
  const [userEarnViewMode, setUserEarnViewMode] = useUserEarnViewMode();

  return (
    <Web3View>
      <PageHeading title="Earn" subtitle="Yield Generating DeFi Strategies" />
      <Box mb={2}>
        <Flex justify="space-between" align="center">
          {!mobile && (
            <ButtonGroup color="default">
              <Button
                className={classes.button}
                onClick={() => setUserEarnViewMode(ViewMode.TABLE)}
              >
                <ViewListRoundedIcon
                  color={
                    userEarnViewMode === ViewMode.TABLE ? "primary" : "disabled"
                  }
                />
              </Button>
              <Button
                className={classes.button}
                onClick={() => setUserEarnViewMode(ViewMode.CARD)}
              >
                <ViewModuleRoundedIcon
                  color={
                    userEarnViewMode === ViewMode.CARD ? "primary" : "disabled"
                  }
                />
              </Button>
            </ButtonGroup>
          )}
        </Flex>
      </Box>

      {userEarnViewMode === ViewMode.TABLE ? (
        <EarnTableView />
      ) : (
        <EarnCardView />
      )}
    </Web3View>
  );
};

export default Earn;
