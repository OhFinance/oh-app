import Web3 from "web3";
import { AbiItem } from "web3-utils";
import web3NoAccount from "../utils/web3-default";
import { BaseContract } from "@ohfinance/oh-contracts/types/web3/types";
import { ERC20 } from "@ohfinance/oh-contracts/types/web3/ERC20";
import ERC20Abi from "@ohfinance/oh-contracts/abi/ERC20.json";
import { OhBank } from "@ohfinance/oh-contracts/types/web3/OhBank";
import OhBankAbi from "@ohfinance/oh-contracts/abi/OhBank.json";

function getContract<T extends BaseContract>(
  abi: any,
  address: string,
  web3?: Web3
): T {
  const _web3 = web3 ?? web3NoAccount;
  return new _web3.eth.Contract(abi as AbiItem[], address) as BaseContract as T;
}

export const getErc20Contract = (address: string, web3?: Web3) => {
  return getContract<ERC20>(ERC20Abi, address, web3);
};

export const getTokenContract = (web3?: Web3) => {
  return getContract<OhToken>(OhBankAbi, addresses);
};
