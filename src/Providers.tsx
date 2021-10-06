import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { ModalProvider, OhLightTheme } from "@ohfinance/oh-ui";
import { VersionProvider } from "@ohfinance/oh-ui";
import { version } from "../package.json";
import { getLibrary } from "utils/web3-connectors";
import store from "state";
import { ToastProvider } from "contexts/ToastContext";

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastProvider>
          <HelmetProvider>
            <VersionProvider version={version}>
              <ThemeProvider theme={OhLightTheme}>
                <CssBaseline />
                <ModalProvider>{children}</ModalProvider>
              </ThemeProvider>
            </VersionProvider>
          </HelmetProvider>
        </ToastProvider>
      </Provider>
    </Web3ReactProvider>
  );
};

export default Providers;
