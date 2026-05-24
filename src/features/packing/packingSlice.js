import { createSlice } from "@reduxjs/toolkit";
import { addToChecklist, clearAll, fetchPackingItems, removeFromCheckList, togglePacked, updateCheckList } from "./packingThunks";
import { clearTripData, deleteTrip } from "@/features/trip/tripThunks";
import { logout } from "../auth/authSlice";

const initialState = {
  checklist: [],
};

export const packingSlice = createSlice({
  name: "packing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch
      .addCase(fetchPackingItems.fulfilled, (state, action) => {
        state.checklist = action.payload;
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
      })

      // Listen to clear trip thunk -> returned data from thunk is action.payload
      .addCase(clearTripData.fulfilled, (state, action) => {
        state.checklist = state.checklist.filter(
          (item) => item.tripId !== action.payload.tripId,
        );
      })
      // Listen to delete trip thunk -> returned data from thunk is action.payload
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.checklist = state.checklist.filter(
          (item) => item.tripId !== action.payload,
        );
      })
      // Listen to logout -> clear all data when logout
      .addCase(logout, (state) => {
        state.items = [];
      });;
  },
});

export default packingSlice.reducer;
