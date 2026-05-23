import { createSlice } from "@reduxjs/toolkit";
import { createTrip, fetchTrips } from "./tripThunks";

const initialState = {
  items: [],
  selectedTripId: "1",
  status: "idle",
  error: null,
};

const tripSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setSelectedTripId: (state, action) => {
      state.selectedTripId = String(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        if (!state.selectedTripId && action.payload.length > 0) {
          state.selectedTripId = String(action.payload[0].id);
        }
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.selectedTripId = String(action.payload.id);
      });
  },
});

export const { setSelectedTripId } = tripSlice.actions;

export default tripSlice.reducer;
