import { createSlice } from "@reduxjs/toolkit";

export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number };
  readonly chainId: number | null;
  readonly implements3085: boolean;
}

const initialState: ApplicationState = {
  blockNumber: {},
  chainId: null,
  implements3085: false,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    updateChainId(state, action) {
      const { chainId } = action.payload;
      state.chainId = chainId;
    },
    updateBlockNumber(state, action) {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== "number") {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(
          blockNumber,
          state.blockNumber[chainId]
        );
      }
    },

    setImplements3085(state, { payload: { implements3085 } }) {
      state.implements3085 = implements3085;
    },
  },
});

export const { updateChainId, updateBlockNumber, setImplements3085 } =
  applicationSlice.actions;
export default applicationSlice.reducer;
