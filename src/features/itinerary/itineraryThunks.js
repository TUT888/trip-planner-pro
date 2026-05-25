import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/services/apiClient";

export const fetchItineraryItems = createAsyncThunk(
  "itinerary/fetchItineraryItems",
  async (tripId) => apiClient.get(`/itineraryItems?tripId=${tripId}`),
);