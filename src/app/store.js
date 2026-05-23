import { configureStore } from "@reduxjs/toolkit";
import packingReducer from "@/features/packing/packingSlice";
import tripReducer from "@/features/trip/tripSlice";
import itineraryReducer from "@/features/itinerary/itinerarySlice";
import budgetReducer from "@/features/budget/budgetSlice";

export const store = configureStore({
  reducer: {
    trips: tripReducer,
    packing: packingReducer,
    itinerary: itineraryReducer,
    budget: budgetReducer,
  },
});
