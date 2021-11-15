import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { ModalProvider, ThemeProvider } from "@ohfinance/oh-ui";
import { ToastProvider } from "contexts/ToastContext";
import { PollerProvider } from "contexts/PollerContext";
import { getLibrary } from "utils/web3Connectors";
import store from "state";
import { FC } from "react";
import { useThemeManager } from "state/user/hooks";

const ThemeProviderWrapper = ({ children }) => {
  const [isDarkMode] = useThemeManager();

  return <ThemeProvider isDark={isDarkMode}>{children}</ThemeProvider>;
};

const Providers: FC = ({ children }) => {
  return (
    <HelmetProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <ThemeProviderWrapper>
            <ToastProvider>
              <ModalProvider>
                <PollerProvider>{children}</PollerProvider>
              </ModalProvider>
            </ToastProvider>
          </ThemeProviderWrapper>
        </Provider>
      </Web3ReactProvider>
    </HelmetProvider>
  );
};

export default Providers;
