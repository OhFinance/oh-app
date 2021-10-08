import { ViewHeader } from "components/ViewHeader";
import { Web3View } from "components/Web3View";
import { EarnContextProvider } from "contexts/EarnContext";
import { EarnData } from "./components/EarnData";
import { EarnSettings } from "./components/EarnSettings";

const Earn = () => {
  return (
    <EarnContextProvider>
      <Web3View>
        <ViewHeader
          title="Earn"
          subtitle="Diversified strategies to do more with your DeFi Dollar"
        />
        <EarnSettings />
        <EarnData />
      </Web3View>
    </EarnContextProvider>
  );
};

export default Earn;
