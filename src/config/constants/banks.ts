import { Bank } from "./types";
import aave from "assets/img/aave.svg";
import comp from "assets/img/comp.svg";
import crv from "assets/img/crv.svg";
import benqi from "assets/img/benqi.png";
import traderJoe from "assets/img/trader-joe.png";
import ohUsdc from "assets/img/oh-usdc.svg";
import ohUsdcE from "assets/img/oh-usdc-e.svg";
import tokens from "./tokens";

const banks: Bank[] = [
  {
    image: ohUsdc,
    name: "Oh! USDC",
    symbol: "OH-USDC",
    decimals: 6,
    chainId: 1,
    address: {
      1: "",
      4: "0xCEe95f9Aa3248eC712c001483439A10B180faC9e",
      42: "0xCEe95f9Aa3248eC712c001483439A10B180faC9e",
    },
    description: "Risk-Optimized Lending and Yield Farming",
    alt: "oh-usdc",
    underlying: tokens.usdc,
    strategies: [
      { protocol: "Aave V2", image: aave },
      { protocol: "Compound", image: comp },
      { protocol: "Curve", image: crv },
    ],
  },
  {
    image: ohUsdcE,
    name: "Oh! USDC.e",
    symbol: "OH-USDC.e",
    decimals: 6,
    chainId: 43114,
    address: {
      1: "",
      4: "0xCEe95f9Aa3248eC712c001483439A10B180faC9e",
      42: "0xCEe95f9Aa3248eC712c001483439A10B180faC9e",
    },
    description: "Avalanche C-Chain Optimized Lending and Yield Farming",
    alt: "oh-usdc.e",
    underlying: tokens.usdc,
    strategies: [
      { protocol: "Aave V2", image: aave },
      { protocol: "Benqi", image: benqi },
      { protocol: "Trader Joe", image: traderJoe },
    ],
  },
];

export default banks;
