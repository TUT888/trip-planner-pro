import { createSlice } from "@reduxjs/toolkit";
import { clearTripData, deleteTrip } from "@/features/trip/tripThunks";
import {
  fetchItineraryItems,
} from "./itineraryThunks";
import { logout } from "../auth/authSlice";

const initialState = {
  items: [],
};

export const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch itinerary
      .addCase(fetchItineraryItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // Clear itinerary
      .addCase(clearTripData.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.tripId !== action.payload.tripId,
        );
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.tripId !== action.payload);
      })
      .addCase(logout, (state) => {
        state.items = [];
      });
  },
});

// Actions 
// export const {} = itinerarySlice.actions;

export default itinerarySlice.reducer;
