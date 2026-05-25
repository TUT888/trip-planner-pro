import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/services/apiClient";
import { isTripAccessible, isTripOwner } from "./tripAuthorization";

// Helpers
const getTripItems = (collection, tripId) => {
  return apiClient.get(`/${collection}?tripId=${tripId}`);
};

const deleteTripItems = async (collection, tripId) => {
  const items = await getTripItems(collection, tripId);
  await Promise.all(
    items.map((item) => apiClient.delete(`/${collection}/${item.id}`)),
  );
};

// Async Thunks
export const fetchTrips = createAsyncThunk("trips/fetchTrips", async (_, { getState }) => {
  const currentUser = getState().auth.currentUser;
  if (!currentUser) return [];

  // Since json-server is not a real backend, it supports limited feature
  // => As a workaround, we fetch all trips and filter them
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

export const clearTripData = createAsyncThunk(
  "trips/clearTripData",
  async (_, { getState }) => {
    const state = getState();
    const currentUser = state.auth.currentUser;
    const trip = state.trips.selectedTrip;

    if (!isTripOwner(trip, currentUser)) {
      throw new Error("Only the trip owner can clear trip data.");
    }

    // Remove all related data from the server for the selected trip.
    await deleteTripItems("packingItems", trip.id);
    await deleteTripItems("itineraryItems", trip.id);
    await deleteTripItems("budgetItems", trip.id);
    
    const updatedTrip = await apiClient.patch(`/trips/${trip.id}`, {
      budget: 0,
    });

    return { tripId: trip.id, trip: updatedTrip };
  },
);

export const deleteTrip = createAsyncThunk(
  "trips/deleteTrip",
  async (_, { getState }) => {
    const state = getState();
    const currentUser = state.auth.currentUser;
    const trip = state.trips.selectedTrip;

    if (!isTripOwner(trip, currentUser)) {
      throw new Error("Only the trip owner can delete this trip.");
    }

    // Remove all related data from the server for the selected trip.
    await deleteTripItems("packingItems", trip.id);
    await deleteTripItems("itineraryItems", trip.id);
    await deleteTripItems("budgetItems", trip.id);

    await apiClient.delete(`/trips/${trip.id}`);

    return trip.id;
  },
);

// Share trip by email
export const shareTripByEmail = createAsyncThunk(
  "trips/shareTripByEmail",
  async (email, { getState }) => {
    const state = getState();
    const currentUser = state.auth.currentUser;
    const trip = state.trips.selectedTrip;

    if (!isTripOwner(trip, currentUser)) {
      throw new Error("Only the trip owner can share this trip.");
    }

    // Check target user
    const users = await apiClient.get(`/users?email=${email}`);
    if (users.length === 0) {
      throw new Error("No registered user was found with that email.");
    }

    const sharedUser = users[0];
    if (String(sharedUser.id) === String(currentUser.id)) {
      throw new Error("You already own this trip.");
    }

    const sharedWith = trip.sharedWith ?? [];
    if (trip.sharedWith.includes(String(sharedUser.id))) {
      throw new Error("This user already has access to this trip.");
    }

    // Patch and return the patched user
    return apiClient.patch(`/trips/${trip.id}`, {
      sharedWith: [...sharedWith, sharedUser.id],
    });
  },
);

// Export JSON function
const downloadJson = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  // Clean up the object URL and element
  link.remove();
  URL.revokeObjectURL(url);
};

export const exportTripData = createAsyncThunk(
  "trips/exportTripData",
  async (_, { getState }) => {
    const state = getState();
    const currentUser = state.auth.currentUser;
    const trip = state.trips.selectedTrip;

    if (!isTripAccessible(trip, currentUser)) {
      throw new Error("You do not have access to export this trip.");
    }

    const [itineraryItems, budgetItems, packingItems] = await Promise.all([
      getTripItems("itineraryItems", trip.id),
      getTripItems("budgetItems", trip.id),
      getTripItems("packingItems", trip.id),
    ]);

    const exportData = {
      tripId: trip.id,
      tripName: trip.name || "",
      budget: Number(trip.budget) || 0,
      itineraryItems,
      budgetItems,
      packingItems,
      exportedAt: new Date().toISOString(),
    };

    downloadJson(exportData, `trip-${trip.id}.json`);
    return exportData;
  },
);
