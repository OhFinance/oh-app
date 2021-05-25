import { Surface } from "components/Surface";
import { ViewHeader } from "components/ViewHeader";
import { ViewWrapper } from "components/ViewWrapper";
import { EarnCardGrid } from "./components/EarnCardGrid";
import { EarnSettings } from "./components/EarnSettings";
import { EarnTable } from "./components/EarnTable";

export const Earn = () => {
  return (
    <ViewWrapper>
      <ViewHeader
        title="Earn"
        subtitle="Diversified strategies to do more with your DeFi Dollar"
      />
      <EarnSettings />
      {/* <EarnTable /> */}
      <EarnCardGrid />
    </ViewWrapper>
  );
};
