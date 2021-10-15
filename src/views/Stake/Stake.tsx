import { ComingSoon } from "components/ComingSoon";
import { PageHeading } from "components/PageHeading";
import { Web3View } from "components/Web3View";

const Stake = () => {
  return (
    <Web3View>
      <PageHeading title="Stake" subtitle="Protocol Usage Incentives" />
      <ComingSoon />
    </Web3View>
  );
};

export default Stake;
