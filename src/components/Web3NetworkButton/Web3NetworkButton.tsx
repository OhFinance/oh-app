import { Avatar } from "@material-ui/core";
import { Button, useModal } from "@ohfinance/oh-ui";
import { Web3NetworkModal } from "components/Web3NetworkModal";
import { NetworkIcons, Networks } from "config/constants/networks";
import { useWeb3 } from "hooks/useWeb3";

export const Web3NetworkButton = ({ ...props }) => {
  const { chainId } = useWeb3();

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
      {...props}
    >
      {Networks[chainId].chainName}
    </Button>
  );
};
