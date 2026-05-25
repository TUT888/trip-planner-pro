import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentUser } from "@/features/auth/authSelector";
import { isTripOwner, isTripSharedWithUser } from "./tripAuthorization";

export const selectTrips = (state) => state.trips.items;

export const selectSelectedTrip = (state) => state.trips.selectedTrip;

export const selectSelectedTripId = createSelector(
  [selectSelectedTrip],
  (selectedTrip) => selectedTrip?.id || null,
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
