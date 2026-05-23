import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/services/apiClient";

export const fetchTrips = createAsyncThunk("trips/fetchTrips", async () => {
  return apiClient.get("/trips");
});

export const createTrip = createAsyncThunk("trips/createTrip", async (trip) => {
  return apiClient.post("/trips", trip);
});