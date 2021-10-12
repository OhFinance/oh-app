import { Address } from "./types";

const contracts: { [contract: string]: Address } = {
  multicall: {
    1: "",
    4: "0xb57aeb9c0c7e0fd39acdbf45fdab26341419a1fd",
    42: "0x7f4c2431b4db2ce9ee2f994064a8840ba614bcec",
  },
  governor: {
    1: "",
  },
  forum: {
    1: "",
  },
  liquidator: {
    1: "",
    4: "0xf8C99aF1169023Ab0CB35D1510Be0f3Cd3789949",
    42: "0x010D805d89D5969Eb877E44b5E4aBfa517239601",
  },
  manager: {
    1: "",
    4: "0xEE858AAa2Aff2d378A82865026Ba032f0e095c7d",
    42: "0xf8C99aF1169023Ab0CB35D1510Be0f3Cd3789949",
  },
  vesting: {
    1: "",
  },
};

export default contracts;
