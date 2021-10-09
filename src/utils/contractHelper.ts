import ERC20Abi from "config/abi/IERC20.json";
import ERC20PermitAbi from "config/abi/IERC20Permit.json";
import OhBankAbi from "config/abi/OhBank.json";
import OhGovernorAbi from "config/abi/OhGovernor.json";
import OhForumAbi from "config/abi/OhForum.json";
import OhLiquidatorAbi from "config/abi/OhLiquidator.json";
import OhManagerAbi from "config/abi/OhManager.json";
import OhTimelockAbi from "config/abi/OhTimelock.json";
import OhTokenAbi from "config/abi/OhToken.json";
import {
  getForumAddress,
  getGovernorAddress,
  getLiquidatorAddress,
  getManagerAddress,
  getTokenAddress,
  getVestingAddress,
} from "./addressHelper";
import { ethers } from "ethers";
import { simpleRpcProvider } from "./web3Providers";

function getContract(
  abi: any,
  address?: string,
  signer?: ethers.Signer | ethers.providers.Provider
) {
  if (!address) return null;
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
}

// ERC-20

export const getERC20Contract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(ERC20Abi, address, signer);
};

export const getERC20PermitContract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(ERC20PermitAbi, address, signer);
};

// Oh! Finance

export const getBankContract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(OhBankAbi, address, signer);
};

export const getGovernorContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(OhGovernorAbi, getGovernorAddress(), signer);
};

export const getForumContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(OhForumAbi, getForumAddress(), signer);
};

export const getLiquidatorContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(OhLiquidatorAbi, getLiquidatorAddress(), signer);
};

export const getManagerContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(OhManagerAbi, getManagerAddress(), signer);
};

export const getTokenContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(OhTokenAbi, getTokenAddress(), signer);
};

export const getVestingContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(OhTimelockAbi, getVestingAddress(), signer);
};
