import { ethers } from "ethers";
import getRpcUrl from "utils/getRpcUrl";
import Web3 from "web3";
import { HttpProviderOptions } from "web3-core-helpers";

const RPC_URL = getRpcUrl();

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
