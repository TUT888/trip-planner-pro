// Arrow function, direct lookup
export const selectAllTrips = (state) => state.trip.trips;

// Active Trip
export const selectActiveTripId = (state) => state.trip.activeTripId;
export const selectActiveTrip = (state) => {
  return state.trip.trips.find((t) => t.id === state.trip.activeTripId);
};
