import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { simpleRpcProvider } from "utils/web3Providers";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
export const useWeb3 = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setProvider] = useState(library || simpleRpcProvider);

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider);
      refEth.current = library;
    }
  }, [library]);

  return { library: provider, ...web3React };
};
