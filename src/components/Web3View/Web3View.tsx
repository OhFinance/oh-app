import { Web3Login } from "components/Web3Login";
import { useWeb3 } from "hooks/useWeb3";
import { Fragment } from "react";

export const Web3View = ({ children }) => {
  const { account } = useWeb3();

  return <Fragment>{!!account ? children : <Web3Login />}</Fragment>;
};
