import { createSlice } from "@reduxjs/toolkit";
import { addToChecklist, clearAll, fetchPackingItems, removeFromCheckList, togglePacked, updateCheckList } from "./packingThunks";

const initialState = {
  checklist: [],
  status: "idle",
  error: null,
};

export const packingSlice = createSlice({
  name: "packing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch
      .addCase(fetchPackingItems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPackingItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.checklist = action.payload;
      })
      .addCase(fetchPackingItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // Handle add
      .addCase(addToChecklist.fulfilled, (state, action) => {
        state.checklist.push(action.payload);
      })
      
      // Handle update
      .addCase(updateCheckList.fulfilled, (state, action) => {
        const itemIdx = state.checklist.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (itemIdx !== -1) state.checklist[itemIdx] = action.payload;
      })
      
      // Handle remove
      .addCase(removeFromCheckList.fulfilled, (state, action) => {
        state.checklist = state.checklist.filter(
          (item) => item.id !== action.payload,
        );
      })
      
      // Handle toggle checklist
      .addCase(togglePacked.fulfilled, (state, action) => {
        const itemIdx = state.checklist.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (itemIdx !== -1) state.checklist[itemIdx] = action.payload;
      })
      
      // Handle clear all
      .addCase(clearAll.fulfilled, (state, action) => {
        state.checklist = state.checklist.filter(
          (item) => item.tripId !== action.payload,
        );
      });
  },
});

export default packingSlice.reducer;
