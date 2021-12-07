import banks from "./banks";
import tokens from "./tokens";
import { Pool } from "./types";

export const pools: { [chainId: number]: Pool[] } = {
  1: [
    {
      name: "Oh! Finance",
      staked: tokens.ohToken,
    },
    {
      name: "Oh! Finance Sushiswap LP",
      staked: tokens.ohSushiLp,
    },
    {
      name: "Oh! USDC",
      staked: banks[1][0],
    },
  ],
  42: [],
  43114: [
    {
      name: "Oh! Finance",
      staked: tokens.ohToken,
    },
    {
      name: "Oh! Finance Trader Joe LP",
      staked: tokens.ohJoeLp,
    },
    {
      name: "Oh! USDC.e",
      staked: banks[43114][0],
    },
  ],
};
