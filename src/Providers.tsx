import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { getLibrary } from "utils/connectorHelper";

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <HelmetProvider>{children}</HelmetProvider>
    </Web3ReactProvider>
  );
};

export default Providers;
