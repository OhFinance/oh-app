import { lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ErrorHandledSuspense } from "components/ErrorHandledSuspense";
import { Loading } from "components/Loading";
import { ToastListener } from "contexts/ToastContext";
import { ScrollManager } from "@ohfinance/oh-ui";
import { AppContainer } from "components/AppContainer";
import { usePollBlockNumber } from "state/block/hooks";
import useEagerConnect from "hooks/useEagerConnect";
import { useWeb3 } from "hooks/useWeb3";
import Login from "views/Login";
import NoMatch from "views/NoMatch";

// code-splitting to reduce bundle size
const Dashboard = lazy(() => import("views/Dashboard"));
const Earn = lazy(() => import("views/Earn"));
const Stake = lazy(() => import("views/Stake"));
const Vote = lazy(() => import("views/Vote"));
const Claim = lazy(() => import("views/Claim"));
const Manage = lazy(() => import("views/Manage"));

const App = () => {
  usePollBlockNumber();
  useEagerConnect();

  const { account } = useWeb3();

  return (
    <BrowserRouter>
      <AppContainer>
        <ErrorHandledSuspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact component={Dashboard} />

            {/* Auth'd Routes */}
            <Route path="/earn" component={!!account ? Earn : Login} />
            <Route path="/claim" component={!!account ? Claim : Login} />
            <Route path="/manage" component={!!account ? Manage : Login} />
            <Route path="/stake" component={!!account ? Stake : Login} />
            <Route path="/vote" component={!!account ? Vote : Login} />

            {/* 404 */}
            <Route component={NoMatch} />
          </Switch>
        </ErrorHandledSuspense>
      </AppContainer>

      <ScrollManager />
      <ToastListener />
    </BrowserRouter>
  );
};

export default App;
