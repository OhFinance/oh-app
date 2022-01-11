import { Token } from "./types";
import dai from "assets/img/dai.svg";
import usdc from "assets/img/usdc.svg";
import usdt from "assets/img/usdt.svg";
import ohToken from "assets/img/oh-token.svg";

// token prices supported on sidebar
export const supportedTokenPrices = ["OH", "BTC", "ETH", "AVAX"];

// token ids for coingecko price api
export const supportedTokenIds = {
  OH: "oh-finance",
  BTC: "bitcoin",
  ETH: "ethereum",
  AVAX: "avalanche-2",
};

const tokens: { [token: string]: Token } = {
  dai: {
    symbol: "DAI",
    decimals: 6,
    address: {
      1: "0x0000000000000000000000000000000000000000",
      4: "",
    },
  },
  ohToken: {
    symbol: "OH",
    decimals: 18,
    address: {
      1: "0x16ba8Efe847EBDFef99d399902ec29397D403C30",
      4: "0x6b461A994d76d8248a6B439D4a19cDfd821409eE",
      42: "0x6b461A994d76d8248a6B439D4a19cDfd821409eE",
      43114: "0x937E077aBaEA52d3abf879c9b9d3f2eBd15BAA21",
    },
    image: ohToken,
  },
  ohSushiLp: {
    symbol: "OH/ETH SLP",
    decimals: 18,
    address: {
      1: "0xCb4288eE0484B51CCb8d40893c4812df72CD5F70",
      4: "",
      42: "",
    },
    image: ohToken,
  },
  ohJoeLp: {
    symbol: "OH",
    decimals: 18,
    address: {
      43114: "0x937E077aBaEA52d3abf879c9b9d3f2eBd15BAA21",
    },
  },
  usdc: {
    symbol: "USDC",
    decimals: 6,
    address: {
      1: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      4: "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
      42: "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede", // compound usdc
      43114: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664", // usdc.e
    },
    image: usdc,
  },
  daie: {
    symbol: "DAI.e",
    decimals: 18,
    address: {
      43114: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
    },
    image: dai,
  },
  usdce: {
    symbol: "USDC.e",
    decimals: 6,
    address: {
      43114: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664", // usdc.e
    },
    image: usdc,
  },
  usdte: {
    symbol: "USDT.e",
    decimals: 6,
    address: {
      43114: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
    },
    image: usdt,
  },
  usdt: {
    symbol: "USDT",
    decimals: 6,
    address: {
      1: "0x0000000000000000000000000000000000000000",
      4: "",
    },
  },
};

export default tokens;
