import { Grid } from "@material-ui/core";
import { Modal, ModalProps } from "@ohfinance/oh-ui";
import {
  NetworkIcons,
  Networks,
  SupportedNetworks,
  SupportedTestNetworks,
} from "config/constants/networks";
import { useWeb3 } from "hooks/useWeb3";
import { FC } from "react";
import { setupNetwork } from "utils/wallet";
import { Web3NetworkModalButton } from "./components/Web3NetworkModalButton";

export const Web3NetworkModal: FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { chainId } = useWeb3();

  const isLocalhost = window.location.href.indexOf("localhost") > -1;
  const networks = isLocalhost
    ? [...SupportedNetworks, ...SupportedTestNetworks]
    : SupportedTestNetworks; // testnets only for beta

  return (
    <Modal title="Select a Network" isOpen={!!isOpen} onDismiss={onDismiss}>
      <Grid container spacing={2} direction="column" justify="center">
        {networks.map((networkId: number, i: number) => (
          <Grid item key={i}>
            <Web3NetworkModalButton
              networkIcon={NetworkIcons[networkId]}
              chainName={Networks[networkId].chainName}
              active={chainId === networkId}
              onClick={async () => {
                if (await setupNetwork(networkId)) {
                  onDismiss();
                }
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Modal>
  );
};
