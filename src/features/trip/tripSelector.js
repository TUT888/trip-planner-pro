import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentUser } from "@/features/auth/authSelector";
import { isTripOwner, isTripSharedWithUser } from "./tripAuthorization";

export const selectTrips = (state) => state.trips.items;

export const selectSelectedTripId = (state) => state.trips.selectedTripId;

export const selectSelectedTrip = createSelector(
  [selectTrips, selectSelectedTripId],
  (trips, selectedTripId) =>
    trips.find((trip) => String(trip.id) === selectedTripId),
);

export const selectSelectedTripBudget = createSelector(
  [selectSelectedTrip],
  (selectedTrip) => Number(selectedTrip?.budget) || 0,
);

export const selectSelectedTripAccessRole = createSelector(
  [selectSelectedTrip, selectCurrentUser],
  (trip, user) => {
    if (isTripOwner(trip, user)) return "owner";
    if (isTripSharedWithUser(trip, user)) return "guest";
    return null;
  },
);

export const selectIsSelectedTripOwner = createSelector(
  [selectSelectedTrip, selectCurrentUser],
  (trip, user) => {
    if (isTripOwner(trip, user)) return "owner";
    return null;
  },
);
