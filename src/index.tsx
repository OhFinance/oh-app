import ReactDOM from "react-dom";
import BigNumber from "bignumber.js";
import App from "./App";
import Providers from "Providers";

// set big number precision
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById("root")
);
