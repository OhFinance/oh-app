import BigNumber from "bignumber.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Earn } from "views/Earn";
import { Dashboard } from "views/Dashboard";
import { NoMatch } from "views/NoMatch";
import { Stake } from "views/Stake";
import { Vote } from "views/Vote";
import { AppNavigation } from "components/AppNavigation";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const App = () => {
  return (
    <BrowserRouter>
      <AppNavigation />

      <Switch>
        <Route path="/" exact component={Dashboard} />
        {/* <Route path="/earn/:id" component={Banks} /> */}
        <Route path="/earn" component={Earn} />
        <Route path="/stake" component={Stake} />
        <Route path="/vote" component={Vote} />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
