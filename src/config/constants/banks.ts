import { Bank } from "./types";
import aave from "assets/img/aave.svg";
import comp from "assets/img/comp.svg";
import crv from "assets/img/crv.svg";
import usdc from "assets/img/usdc.svg";
import ohUsdc from "assets/img/oh-usdc.svg";
import tokens from "./tokens";

const banks: Bank[] = [
  {
    image: ohUsdc,
    name: "Oh! USDC",
    symbol: "OH-USDC",
    decimals: 6,
    address: {
      1: "",
      4: "0xCEe95f9Aa3248eC712c001483439A10B180faC9e",
      42: "0xCEe95f9Aa3248eC712c001483439A10B180faC9e",
    },
    description: "Risk-Optimized Lending and Yield Farming",
    alt: "oh-usdc",
    underlying: tokens.usdc,
    underlyingImage: usdc,
    composition: ["Aave V2", "Compound", "Curve"],
    compositionImages: [aave, comp, crv],
  },
];

export default banks;
