import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Web3ReactProvider } from "@web3-react/core";
import { HelmetProvider } from "react-helmet-async";
import { OhLightTheme } from "@ohfinance/oh-ui";
import { VersionProvider } from "@ohfinance/oh-ui";
import { version } from "../package.json";
import { getLibrary } from "utils/connectorHelper";

const Providers: React.FC = ({ children }) => {
  return (
    <VersionProvider version={version}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <HelmetProvider>
          <ThemeProvider theme={OhLightTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </HelmetProvider>
      </Web3ReactProvider>
    </VersionProvider>
  );
};

export default Providers;
