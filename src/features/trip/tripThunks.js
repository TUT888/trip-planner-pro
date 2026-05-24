import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/services/apiClient";
import { isTripAccessible } from "./tripAuthorization";

export const fetchTrips = createAsyncThunk("trips/fetchTrips", async (_, { getState }) => {
  const currentUser = getState().auth.currentUser;
  if (!currentUser) return [];

  const trips = await apiClient.get("/trips");
  return trips.filter((trip) => isTripAccessible(trip, currentUser));
});

export const createTrip = createAsyncThunk("trips/createTrip", async (trip, { getState }) => {
  const currentUser = getState().auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be logged in to create a trip.");
  }

  return apiClient.post("/trips", {
    ...trip,
    ownerId: currentUser.id,
    sharedWith: [],
  });
});
