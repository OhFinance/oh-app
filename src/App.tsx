import BigNumber from "bignumber.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Banks } from "views/Banks";
import { Dashboard } from "views/Dashboard";
import { NoMatch } from "views/NoMatch";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/banks/:id" component={Banks} />
        <Route path="/banks" component={Banks} />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
