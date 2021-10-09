import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { ModalProvider, ThemeProvider } from "@ohfinance/oh-ui";
import { ToastProvider } from "contexts/ToastContext";
import { PollerProvider } from "contexts/PollerContext";
import { getLibrary } from "utils/web3-connectors";
import store from "state";
import { FC } from "react";

const Providers: FC = ({ children }) => {
  return (
    <HelmetProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <ThemeProvider>
            <ToastProvider>
              <ModalProvider>
                <PollerProvider>{children}</PollerProvider>
              </ModalProvider>
            </ToastProvider>
          </ThemeProvider>
        </Provider>
      </Web3ReactProvider>
    </HelmetProvider>
  );
};

export default Providers;
