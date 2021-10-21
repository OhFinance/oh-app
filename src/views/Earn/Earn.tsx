import { PageHeading } from "components/PageHeading";
import { Web3View } from "components/Web3View";
import { useUserEarnViewMode } from "state/user/hooks";
import { Box } from "@material-ui/core";
import { Flex, useMobile } from "@ohfinance/oh-ui";
import { ViewMode } from "state/user/types";
import { EarnTableView } from "./components/EarnTableView/EarnTableView";
import { EarnCardView } from "./components/EarnCardView";
import { EarnViewToggle } from "./components/EarnViewToggle/EarnViewToggle";

const Earn = () => {
  const mobile = useMobile();
  const [userEarnViewMode] = useUserEarnViewMode();

  return (
    <Web3View>
      <PageHeading title="Earn" subtitle="Yield Generating DeFi Strategies" />
      <Box mb={2}>
        <Flex justify="space-between" align="center">
          {!mobile && <EarnViewToggle />}
        </Flex>
      </Box>

      {!mobile && userEarnViewMode === ViewMode.TABLE ? (
        <EarnTableView />
      ) : (
        <EarnCardView />
      )}
    </Web3View>
  );
};

export default Earn;
