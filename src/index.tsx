import ReactDOM from "react-dom";
import BigNumber from "bignumber.js";
import App from "./App";
import Providers from "Providers";
import { Updaters } from "Updaters";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// set big number precision
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ReactDOM.render(
  <Providers>
    <Updaters />
    <App />
  </Providers>,
  document.getElementById("root")
);
