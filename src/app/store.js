import { configureStore } from "@reduxjs/toolkit";
import packingReducer from "@/features/packing/packingSlice";

export const store = configureStore({
  reducer: {
    packing: packingReducer
  },
});
