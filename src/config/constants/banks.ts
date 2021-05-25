import Aave from "assets/img/aave.svg";
import Comp from "assets/img/comp.svg";
import Crv from "assets/img/crv.svg";
import Usdc from "assets/img/usdc.svg";

export interface Bank {
  image: string;
  symbol: string;
  description: string;
  alt: string;
  underlying: string;
  composition: string[];
}

const banks: Bank[] = [
  {
    image: Usdc,
    symbol: "Oh! USDC",
    description: "Risk-Optimized Lending and Yield Farming",
    alt: "oh-usdc",
    underlying: Usdc,
    composition: [Aave, Comp, Crv],
  },
];

export default banks;
