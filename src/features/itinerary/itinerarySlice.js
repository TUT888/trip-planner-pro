import { loadData, TRIP_PROPERTIES } from "@/services/tripDataService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: loadData(TRIP_PROPERTIES.ITINERARY) ?? []
};

export const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {},
});

// Actions 
// export const {} = itinerarySlice.actions;

export default itinerarySlice.reducer;