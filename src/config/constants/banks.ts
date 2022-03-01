import { Bank } from "./types";
import aave from "assets/img/aave.svg";
import comp from "assets/img/comp.svg";
import crv from "assets/img/crv.svg";
import benqi from "assets/img/benqi.png";
import traderJoe from "assets/img/trader-joe.png";
import mfam from "assets/img/mfam.png";
import ohUsdc from "assets/img/oh-usdc.svg";
import ohUsdce from "assets/img/oh-usdc-e.svg";
import ohUsdcMoonriver from "assets/img/oh-usdc-moonriver.png";
import ohUsdte from "assets/img/oh-usdt-e.svg";
import ohUsdtMoonriver from "assets/img/oh-usdt-moonriver.png";
import ohDaie from "assets/img/oh-dai-e.png";
import tokens from "./tokens";

const banks: { [chainId: number]: Bank[] } = {
  1: [
    {
      image: ohUsdc,
      name: "Oh! USDC",
      symbol: "OH-USDC",
      decimals: 6,
      chainId: 1,
      address: {
        1: "0xa528639AAe2E765351dcd1e0C2dD299D6279dB52",
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
  ],
  1285: [
    {
      image: ohUsdcMoonriver,
      name: "Oh! Moonwell USDC",
      symbol: "OH-USDC",
      decimals: 6,
      chainId: 1285,
      address: {
        1285: "0x4C211F45876d8EC7bAb54CAc0e32AAD15095358A",
      },
      description: "Moonriver Optimized Lending and Yield Farming",
      alt: "oh-usdc",
      underlying: tokens.usdc,
      strategies: [{ protocol: "Moonwell", image: mfam }],
    },
    {
      image: ohUsdtMoonriver,
      name: "Oh! Moonwell USDT",
      symbol: "OH-USDT",
      decimals: 6,
      chainId: 1285,
      address: {
        1285: "0xdeA7Ff1D84B7E54587b434C1A585718857CF61d1",
      },
      description: "Moonriver Optimized Lending and Yield Farming",
      alt: "oh-usdt",
      underlying: tokens.usdt,
      strategies: [{ protocol: "Moonwell", image: mfam }],
    },
  ],
  43114: [
    {
      image: ohUsdce,
      name: "Oh! USDC.e",
      symbol: "OH-USDC.e",
      decimals: 6,
      chainId: 43114,
      address: {
        43114: "0x8B1Be96dc17875ee01cC1984e389507Bb227CaAB",
      },
      description: "Avalanche C-Chain Optimized Lending and Yield Farming",
      alt: "oh-usdc.e",
      underlying: tokens.usdce,
      strategies: [
        { protocol: "Aave V2", image: aave },
        { protocol: "Curve", image: crv },
      ],
    },
    {
      image: ohUsdte,
      name: "Oh! USDT.e",
      symbol: "OH-USDT.e",
      decimals: 6,
      chainId: 43114,
      address: {
        43114: "0xd96AbEcf6AA022735CFa9CB512d63645b0834720",
      },
      description: "Avalanche C-Chain Optimized Lending and Yield Farming",
      alt: "oh-usdt.e",
      underlying: tokens.usdte,
      strategies: [
        { protocol: "Aave V2", image: aave },
        { protocol: "Curve", image: crv },
      ],
    },
    {
      image: ohDaie,
      name: "Oh! DAI.e",
      symbol: "OH-DAI.e",
      decimals: 18,
      chainId: 43114,
      address: {
        43114: "0xF74303DD14E511CCD90219594e8069d36Da01DCD",
      },
      description: "Avalanche C-Chain Optimized Lending and Yield Farming",
      alt: "oh-dai.e",
      underlying: tokens.daie,
      strategies: [
        { protocol: "Aave V2", image: aave },
        { protocol: "Curve", image: crv },
      ],
    },
  ],
};

export default banks;
