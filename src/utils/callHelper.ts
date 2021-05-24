import { Contract } from "web3-eth-contract";
import { ethers } from "ethers";

export const approve = async (
  tokenContract: Contract,
  spenderContract: Contract,
  account: string
) => {
  return tokenContract.methods
    .approve(spenderContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account });
};
