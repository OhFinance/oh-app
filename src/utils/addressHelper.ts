import { Address } from "config/constants/types";
import contracts from "config/constants/contracts";
import { Tokens } from "config/constants/tokens";

const getAddress = (address: Address, chainId?: number): string => {
  return address[chainId || 1];
};

// contract addresses

export const getForumAddress = (chainId?: number): string => {
  return getAddress(contracts.forum, chainId);
};

export const getGovernorAddress = (chainId?: number): string => {
  return getAddress(contracts.governor, chainId);
};

export const getLiquidatorAddress = (chainId?: number): string => {
  return getAddress(contracts.liquidator, chainId);
};

export const getManagerAddress = (chainId?: number): string => {
  return getAddress(contracts.manager, chainId);
};

export const getVestingAddress = (chainId?: number): string => {
  return getAddress(contracts.vesting, chainId);
};

// token addresses

export const getOhUsdcAddress = (chainId?: number): string => {
  return getAddress(Tokens.ohUsdc.address, chainId);
};

export const getTokenAddress = (chainId?: number): string => {
  return getAddress(Tokens.ohToken.address, chainId);
};

export const getUsdcAddress = (chainId?: number): string => {
  return getAddress(Tokens.usdc.address, chainId);
};
