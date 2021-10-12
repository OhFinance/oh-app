import { lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ErrorHandledSuspense } from "components/ErrorHandledSuspense";
import { Loading } from "components/Loading";
import { ToastListener } from "contexts/ToastContext";
import { ScrollManager } from "@ohfinance/oh-ui";
import { AppContainer } from "components/AppContainer";
import { usePollBlockNumber } from "state/block/hooks";
import useEagerConnect from "hooks/useEagerConnect";

// code-splitting to reduce bundle size
// const Dashboard = lazy(() => import("views/Dashboard"));
const Earn = lazy(() => import("views/Earn"));
const NoMatch = lazy(() => import("views/NoMatch"));
// const Stake = lazy(() => import("views/Stake"));
// const Vote = lazy(() => import("views/Vote"));
const Claim = lazy(() => import("views/Claim"));
const Management = lazy(() => import("views/Management"));

const App = () => {
  usePollBlockNumber();
  useEagerConnect();

  return (
    <BrowserRouter>
      <AppContainer>
        <ErrorHandledSuspense fallback={<Loading />}>
          <Switch>
            {/* Visible Paths */}

            {/* 
          <Route path="/" exact component={Dashboard} />
          <Route path="/stake" component={Stake} />
          <Route path="/vote" component={Vote} /> 
          */}

            <Route path="/" exact component={Earn} />
            <Route path="/claim" component={Claim} />

            {/* Non-Visible Paths */}
            <Route path="/manage" component={Management} />

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
