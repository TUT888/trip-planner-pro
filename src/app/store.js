import { configureStore } from "@reduxjs/toolkit";
import packingReducer from "@/features/packing/packingSlice";
import tripReducer from "@/features/trip/tripSlice";

export const store = configureStore({
  reducer: {
    packing: packingReducer,
    trip: tripReducer,
  },
});
