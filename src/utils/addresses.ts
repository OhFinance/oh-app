import { Address } from "../config/constants/types"

export const getAddress = (address: Address): string => {
  const chainId = process.env.CHAIN_ID
  return address[chainId || 1]
}