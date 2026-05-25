import { createSlice } from "@reduxjs/toolkit";
import { clearTripData, deleteTrip } from "@/features/trip/tripThunks";
import {
  fetchItineraryItems,
} from "./itineraryThunks";

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
      });
  },
});

export default itinerarySlice.reducer;
