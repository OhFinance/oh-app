import { Token } from "./types";
import usdc from "assets/img/usdc.svg";

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
      1: "0x0000000000000000000000000000000000000000",
      4: "0x6b461A994d76d8248a6B439D4a19cDfd821409eE",
      42: "0x6b461A994d76d8248a6B439D4a19cDfd821409eE",
    },
  },
  usdc: {
    symbol: "USDC",
    decimals: 6,
    address: {
      1: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      4: "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
      42: "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede", // compound usdc
    },
    image: usdc,
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
