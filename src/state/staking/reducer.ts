import { createSlice } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";

export interface StakingState {
  readonly tvlByPool: { readonly [pool: string]: BigNumber };
  readonly userStaked: { readonly [pool: string]: BigNumber };
  readonly userUnclaimedRewards: { readonly [pool: string]: BigNumber };
}

const initialState: StakingState = {
  tvlByPool: {},
  userStaked: {},
  userUnclaimedRewards: {},
};

const stakingSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    addPoolTvl(state, action) {
      const { amount, poolAddress } = action.payload;
      state.tvlByPool[poolAddress] = amount;
    },
    addUserStaked(state, action) {
      const { amount, poolAddress } = action.payload;
      state.userStaked[poolAddress] = amount;
    },
    addUserUnclaimedRewards(state, action) {
      const { amount, poolAddress } = action.payload;
      state.userUnclaimedRewards[poolAddress] = amount;
    },
  },
});

export const { addPoolTvl, addUserStaked, addUserUnclaimedRewards } =
  stakingSlice.actions;
export default stakingSlice.reducer;
