import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0
};

export const packingSlice = createSlice({
  name: "packing",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    }
  },
});

export const { increment, decrement } = packingSlice.actions;

export default packingSlice.reducer;
