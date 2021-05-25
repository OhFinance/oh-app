import { ViewHeader } from "components/ViewHeader";
import { ViewWrapper } from "components/ViewWrapper";
import { VoteTabs } from "./components/VoteTabs";

export const Vote = () => {
  return (
    <ViewWrapper>
      <ViewHeader
        title="Vote"
        subtitle="Participate in Decentralized Governance and control the Protocol"
      />
      <VoteTabs />
    </ViewWrapper>
  );
};
