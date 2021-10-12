import { ethers } from "ethers";
import { simpleRpcProvider } from "./web3Providers";
import { Web3Provider } from "@ethersproject/providers";

export function getContract(
  abi?: any,
  address?: string,
  library?: Web3Provider,
  account?: string
) {
  if (!abi || !address) {
    return null;
  }
  // const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(
    address,
    abi,
    getProviderOrSigner(library, account ?? undefined)
  );
}

export const getProviderOrSigner = (
  library: Web3Provider,
  account?: string
) => {
  return account ? library.getSigner(account).connectUnchecked() : library;
};
