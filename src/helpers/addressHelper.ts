import { Address } from "config/constants/types";
import contracts from "config/constants/contracts";
import { Tokens } from "config/constants/tokens";

export const getAddress = (address: Address, chainId?: number): string => {
  // console.log(address[chainId]);
  return address[chainId || 1];
};

// contract addresses

export const getForumAddress = (): string => {
  return getAddress(contracts.forum);
};

export const getGovernorAddress = (): string => {
  return getAddress(contracts.governor);
};

export const getLiquidatorAddress = (): string => {
  return getAddress(contracts.liquidator);
};

export const getManagerAddress = (): string => {
  return getAddress(contracts.manager);
};

export const getVestingAddress = (): string => {
  return getAddress(contracts.vesting);
};

// token addresses

export const getOhUsdcAddress = (): string => {
  return getAddress(Tokens.ohUsdc.address);
};

export const getTokenAddress = (chainId?: number): string => {
  return getAddress(Tokens.ohToken.address, chainId || undefined);
};

export const getUsdcAddress = (): string => {
  return getAddress(Tokens.usdc.address);
};
