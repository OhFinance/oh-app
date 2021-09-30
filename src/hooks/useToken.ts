import { useWeb3React } from "@web3-react/core";
import { Tokens } from "config/constants/tokens";

export const useToken = (tokenKey: string) => {
  const { chainId } = useWeb3React();

  return {
    address: Tokens[tokenKey].address[chainId],
  };
};
