import { createSlice } from "@reduxjs/toolkit";
import { createTrip, fetchTrips } from "./tripThunks";
import { resetBudget, setInitialBudget } from "@/features/budget/budgetThunks";
import { clearSelectedTripId, loadSelectedTripId, saveSelectedTripId } from "@/services/localStorageService";

const initialState = {
  items: [],
  selectedTripId: loadSelectedTripId() || null,
  status: "idle",
  error: null,
};

const tripSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setSelectedTripId: (state, action) => {
      state.selectedTripId = String(action.payload);
      saveSelectedTripId(state.selectedTripId);
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

        if (action.payload.length === 0) {
          // If don't have any trips, clear slected trip id to avoid wrong authorization
          state.selectedTripId = null;
          clearSelectedTripId();
        } else if (!state.selectedTripId) {
          // If hasn't select any trip, choose the first one by default
          state.selectedTripId = String(action.payload[0].id);
          saveSelectedTripId(state.selectedTripId);
        }
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.selectedTripId = String(action.payload.id);
        saveSelectedTripId(state.selectedTripId);
      })
      .addCase(setInitialBudget.fulfilled, (state, action) => {
        const tripIdx = state.items.findIndex(
          (trip) => String(trip.id) === String(action.payload.id),
        );

        if (tripIdx !== -1) state.items[tripIdx] = action.payload;
      })
      .addCase(resetBudget.fulfilled, (state, action) => {
        const tripIdx = state.items.findIndex(
          (trip) => String(trip.id) === String(action.payload.trip.id),
        );

        if (tripIdx !== -1) state.items[tripIdx] = action.payload.trip;
      });
  },
});

export const { setSelectedTripId } = tripSlice.actions;

export default tripSlice.reducer;
