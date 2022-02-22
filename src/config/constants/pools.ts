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
      poolAddress: "0x5c76aD4764A4607cD57644faA937A8cA16729e39",
      escrowAddress: "0xfeea44bc2161f2fe11d55e557ae4ec855e2d1168",
      token: {
        symbol: "MC",
        address: { 1: "0x949d48eca67b17269629c7194f4b727d4ef9e5d6" },
        decimals: 18,
        image: ohToken,
      },
      rewardToken: {
        symbol: "MC",
        address: { 1: "0x949d48eca67b17269629c7194f4b727d4ef9e5d6" },
        decimals: 18,
        image: ohToken,
      },
    },
    {
      label: "Oh! Finance Sushiswap LP",
      poolAddress: "0x44c01e5e4216f3162538914d9c7f5E6A0d87820e",
      escrowAddress: "0xfeea44bc2161f2fe11d55e557ae4ec855e2d1168",
      token: {
        symbol: "MC",
        address: { 1: "0xccb63225a7b19dcf66717e4d40c9a72b39331d61" },
        decimals: 18,
        image: ohToken,
      },
      rewardToken: {
        symbol: "Oh",
        address: { 1: "0x949d48eca67b17269629c7194f4b727d4ef9e5d6" },
        decimals: 18,
        image: ohToken,
      },
      lpOf: [
        tokens.weth,
        {
          symbol: "MC",
          address: { 1: "0x949d48eca67b17269629c7194f4b727d4ef9e5d6" },
          decimals: 18,
          image: ohToken,
        },
      ],
    },
    // {
    //   label: "Oh! USDC",
    //   poolAddress: "0x5c76aD4764A4607cD57644faA937A8cA16729e39",
    //   escrowAddress: "",
    //   token: banks[1][0],
    //   rewardToken: {
    //     symbol: "Oh",
    //     address: { 1: "0x949d48eca67b17269629c7194f4b727d4ef9e5d6" },
    //     decimals: 18,
    //     image: ohToken,
    //   },
    // },
  ],
  42: [],
  43114: [
    {
      label: "Oh! Finance",
      poolAddress: "",
      escrowAddress: "",
      token: tokens.ohToken,
      rewardToken: {
        symbol: "Oh",
        address: { 1: "0x949d48eca67b17269629c7194f4b727d4ef9e5d6" },
        decimals: 18,
        image: ohToken,
      },
    },
    {
      label: "Oh! Finance Trader Joe LP",
      poolAddress: "",
      escrowAddress: "",
      token: tokens.ohJoeLp,
      rewardToken: {
        symbol: "Oh",
        address: { 1: "0x949d48eca67b17269629c7194f4b727d4ef9e5d6" },
        decimals: 18,
        image: ohToken,
      },
    },
    {
      label: "Oh! USDC.e",
      poolAddress: "",
      escrowAddress: "",
      token: banks[43114][0],
      rewardToken: {
        symbol: "Oh",
        address: { 1: "0x949d48eca67b17269629c7194f4b727d4ef9e5d6" },
        decimals: 18,
        image: ohToken,
      },
    },
  ],
};
