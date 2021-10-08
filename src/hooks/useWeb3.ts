import { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { getWeb3NoAccount } from "utils/web3-default";

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
export const useWeb3 = () => {
  const { library, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [web3, setWeb3] = useState(
    library ? new Web3(library) : getWeb3NoAccount()
  );

  useEffect(() => {
    if (library !== refEth.current) {
      setWeb3(library ? new Web3(library) : getWeb3NoAccount());
      refEth.current = library;
    }
  }, [library]);

  return { library: web3, ...web3React };
};
