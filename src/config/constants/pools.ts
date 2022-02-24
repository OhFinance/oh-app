import banks from "./banks";
import tokens from "./tokens";
import { Token } from "./types";
import ohToken from "assets/img/oh-token.svg";

export interface Pool {
  label: string;
  poolAddress: string;
  escrowAddress: string;
  token: Token;
  rewardToken: Token;
  lpOf?: [Token, Token];
}

export const POOLS: { [chainId: number]: Pool[] } = {
  1: [
    {
      label: "Oh! Finance",
      poolAddress: "",
      escrowAddress: "",
      token: tokens.ohToken,
      rewardToken: tokens.ohToken,
    },
    {
      label: "Oh! Finance Sushiswap LP",
      poolAddress: "",
      escrowAddress: "",
      token: tokens.ohSushiLp,
      rewardToken: tokens.ohToken,
      lpOf: [tokens.weth, tokens.ohToken],
    },
    {
      label: "Oh! USDC",
      poolAddress: "",
      escrowAddress: "",
      token: banks[1][0],
      rewardToken: tokens.ohToken,
    },
  ],
  42: [],
  43114: [
    {
      label: "Oh! Finance",
      poolAddress: "",
      escrowAddress: "",
      token: tokens.ohToken,
      rewardToken: tokens.ohToken,
    },
    {
      label: "Oh! Finance Trader Joe LP",
      poolAddress: "",
      escrowAddress: "",
      token: tokens.ohJoeLp,
      rewardToken: tokens.ohToken,
    },
    {
      label: "Oh! USDC.e",
      poolAddress: "",
      escrowAddress: "",
      token: banks[43114][0],
      rewardToken: tokens.ohToken,
    },
  ],
};
