export const selectSelectedTripId = (state) => state.trips.selectedTripId;

export const selectSelectedTrip = (state) =>
  state.trips.items.find(
    (trip) => String(trip.id) === state.trips.selectedTripId,
  );

export const selectSelectedTripBudget = (state) =>
  Number(selectSelectedTrip(state)?.budget) || 0;
