import { Avatar, Select } from "@material-ui/core";
import { Button, useModal } from "@ohfinance/oh-ui";
import { useWeb3React } from "@web3-react/core";
import { Web3NetworkModal } from "components/Web3NetworkModal";
import { NetworkIcons, Networks } from "config/constants/networks";

export const Web3NetworkButton = () => {
  const { chainId } = useWeb3React();

  const [onPresentNetworkModal] = useModal(<Web3NetworkModal />);

  if (!chainId) {
    return null;
  }

  return (
    <Button
      //variant="contained"
      onClick={onPresentNetworkModal}
      startIcon={
        <Avatar
          src={NetworkIcons[chainId]}
          style={{ height: "22px", width: "22px" }}
        />
      }
    >
      {Networks[chainId].chainName}
    </Button>
  );
};
