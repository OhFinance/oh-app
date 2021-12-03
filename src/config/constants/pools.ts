import tokens from './tokens'
import { Pool } from './types'

export const pools: { [chainId: number]: Pool[] } = {
  1: [
    {
      name: 'Oh! Finance',
      staked: tokens.ohToken
    },
    {
      name: 'Oh! Finance Sushiswap LP',
      staked: tokens.ohSushiLp
    },
  ]
}