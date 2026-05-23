import { createSlice } from "@reduxjs/toolkit";
import { createTrip, fetchTrips } from "./tripThunks";
import { resetBudget, setInitialBudget } from "@/features/budget/budgetThunks";

const SELECTED_TRIP_STORAGE_KEY = "selectedTripId";

const loadSelectedTripId = () => localStorage.getItem(SELECTED_TRIP_STORAGE_KEY);

const saveSelectedTripId = (tripId) => {
  localStorage.setItem(SELECTED_TRIP_STORAGE_KEY, String(tripId));
};

const initialState = {
  items: [],
  selectedTripId: loadSelectedTripId(),
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
        const hasSelectedTrip = action.payload.some(
          (trip) => String(trip.id) === state.selectedTripId,
        );

        if (!hasSelectedTrip && action.payload.length > 0) {
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
