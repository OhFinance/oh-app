import { lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppNavigation } from "components/AppNavigation";
import { ErrorHandledSuspense } from "components/ErrorHandledSuspense";
import { Loading } from "components/Loading";

// code-splitting to reduce bundle size
const Dashboard = lazy(() => import("views/Dashboard"));
const Earn = lazy(() => import("views/Earn"));
const NoMatch = lazy(() => import("views/NoMatch"));
const Stake = lazy(() => import("views/Stake"));
const Vote = lazy(() => import("views/Vote"));
const Claim = lazy(() => import("views/Claim"));
const Management = lazy(() => import("views/Management"));

const App = () => {
  return (
    <BrowserRouter>
      <AppNavigation />

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

          <Route component={NoMatch} />
        </Switch>
      </ErrorHandledSuspense>
    </BrowserRouter>
  );
};

export default App;
