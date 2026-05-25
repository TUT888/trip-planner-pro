import { createSlice } from "@reduxjs/toolkit";
import {
  clearTripData,
  createTrip,
  deleteTrip,
  fetchTrips,
  shareTripByEmail,
} from "./tripThunks";
import { resetBudget, setInitialBudget } from "@/features/budget/budgetThunks";
import { clearSelectedTripId, loadSelectedTripId, saveSelectedTripId } from "@/services/localStorageService";

const initialState = {
  items: [],
  selectedTrip: null,
};

const replaceTrip = (state, updatedTrip) => {
  const tripIdx = state.items.findIndex(
    (trip) => String(trip.id) === String(updatedTrip.id),
  );

  if (tripIdx !== -1) state.items[tripIdx] = updatedTrip;
  if (String(state.selectedTrip?.id) === String(updatedTrip.id)) {
    state.selectedTrip = updatedTrip;
  }
};

const tripSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setSelectedTrip: (state, action) => {
      const selectedTrip = state.items.find(
        (trip) => String(trip.id) === String(action.payload),
      );

      state.selectedTrip = selectedTrip || null;

      if (state.selectedTrip) {
        saveSelectedTripId(state.selectedTrip.id);
      } else {
        clearSelectedTripId();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.items = action.payload;

        if (action.payload.length === 0) {
          // If don't have any trips, clear selected trip to avoid wrong authorization
          state.selectedTrip = null;
          clearSelectedTripId();
        } else {
          const savedTripId = loadSelectedTripId();
          const selectedTrip = action.payload.find(
            (trip) => String(trip.id) === String(savedTripId),
          ) || action.payload[0];

          state.selectedTrip = selectedTrip;
          saveSelectedTripId(selectedTrip.id);
        }
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        // Switch to new trip
        state.items.push(action.payload);
        state.selectedTrip = action.payload;
        saveSelectedTripId(action.payload.id);
      })
      .addCase(clearTripData.fulfilled, (state, action) => {
        replaceTrip(state, action.payload.trip);
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        // Remove from trips
        state.items = state.items.filter(
          (trip) => String(trip.id) !== String(action.payload),
        );
        // If the deleted trip is the selected trip (default in current implementation)
        // Reset to first trip or null if there isn't any trip left
        if (String(state.selectedTrip?.id) === String(action.payload)) {
          const nextTrip = state.items[0] || null;
          state.selectedTrip = nextTrip;

          if (nextTrip) {
            saveSelectedTripId(state.selectedTrip.id);
          } else {
            clearSelectedTripId();
          }
        }
      })
      .addCase(shareTripByEmail.fulfilled, (state, action) => {
        replaceTrip(state, action.payload);
      })
      .addCase(setInitialBudget.fulfilled, (state, action) => {
        replaceTrip(state, action.payload);
      })
      .addCase(resetBudget.fulfilled, (state, action) => {
        replaceTrip(state, action.payload.trip);
      });
  },
});

export const { setSelectedTrip } = tripSlice.actions;

export default tripSlice.reducer;
