import { configureStore } from "@reduxjs/toolkit";
import packingReducer from "@/features/packing/packingSlice";
import tripReducer from "@/features/trip/tripSlice";
import itineraryReducer from "@/features/itinerary/itinerarySlice";
import budgetReducer from "@/features/budget/budgetSlice";
import authReducer from "@/features/auth/authSlice";
import dashboardReducer from "@/features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripReducer,
    packing: packingReducer,
    itinerary: itineraryReducer,
    budget: budgetReducer,
    dashboard: dashboardReducer
  },
});
