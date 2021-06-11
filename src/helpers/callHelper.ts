import { Contract } from "web3-eth-contract";
import { ERC20 } from "@ohfinance/oh-contracts/types/web3/ERC20";
import { OhBank } from "@ohfinance/oh-contracts/types/web3/OhBank";
import { MAX_UINT256 } from "../utils/bigNumber";
import BigNumber from "bignumber.js";

export const approve = async (
  tokenContract: ERC20,
  spenderContract: Contract,
  account: string
) => {
  return tokenContract.methods
    .approve(spenderContract.options.address, MAX_UINT256.toString())
    .send({ from: account });
};

export const balanceOf = async (tokenContract: ERC20, account: string) => {
  return tokenContract.methods.balanceOf(account).call();
};

export const deposit = async (
  bankContract: OhBank,
  amount: BigNumber,
  account: string
) => {
  return bankContract.methods
    .deposit(amount.toString())
    .send({ from: account });
};

export const withdraw = async (
  bankContract: OhBank,
  amount: BigNumber,
  account: string
) => {
  return bankContract.methods
    .withdraw(amount.toString())
    .send({ from: account });
};
