import { Box } from "@material-ui/core";
import { PageHeading } from "components/PageHeading";
import { VoteMetrics } from "./components/VoteMetrics";
import { VoteTabs } from "./components/VoteTabs";
import { Web3View } from "components/Web3View";
import { ComingSoon } from "components/ComingSoon";

const Vote = () => {
  return (
    <Web3View>
      <PageHeading title="Vote" subtitle="Decentralized Governance" />
      <ComingSoon />
      {/* <Box mb={2}>
        <VoteMetrics />
      </Box>
      <VoteTabs /> */}
    </Web3View>
  );
};

export default Vote;
