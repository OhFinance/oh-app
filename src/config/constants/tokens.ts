import { Token } from "./types";

export const Tokens: { [token: string]: Token } = {
  dai: {
    symbol: "DAI",
    decimals: 6,
    address: {
      1: "",
      4: "",
    },
  },
  ohToken: {
    symbol: "OH",
    decimals: 18,
    address: {
      1: "",
      4: "",
      42: "0x6b461A994d76d8248a6B439D4a19cDfd821409eE",
    },
  },
  ohUsdc: {
    symbol: "OH-USDC",
    decimals: 6,
    address: {
      1: "",
      4: "",
    },
  },
  usdc: {
    symbol: "USDC",
    decimals: 6,
    address: {
      1: "",
      4: "",
    },
  },
  usdt: {
    symbol: "USDT",
    decimals: 6,
    address: {
      1: "",
      4: "",
    },
  },
};
