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
      .addCase(clearTripData.fulfilled, (state) => {
        // state.items = state.items.filter(
        //   (item) => item.tripId !== action.payload.tripId,
        // );
        state.items = [];
      })
      .addCase(deleteTrip.fulfilled, (state) => {
        // state.items = state.items.filter((item) => item.tripId !== action.payload);
        state.items = [];
      })
      .addCase(logout, (state) => {
        state.items = [];
      });
  },
});

export default itinerarySlice.reducer;
