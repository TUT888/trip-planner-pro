import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from '../features/budget/budgetSlice';
import packingReducer from "@/features/packing/packingSlice";
import itineraryReducer from "@/features/itinerary/itinerarySlice";

export const store = configureStore({
  reducer: {
    budget: budgetReducer,
    packing: packingReducer,
    itinerary: itineraryReducer
  },
});
