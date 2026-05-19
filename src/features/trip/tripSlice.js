import { createSlice } from "@reduxjs/toolkit";
import { loadTripData } from "../../services/tripDataService";
import mockTripData from "../../data/mockTripData.json" ;

// Initial state 

// Try to load existing trip data from localStorage, fallback to mock data
const loadInitialTrips = () => {
  try {
    const allData = loadTripData();
    if (allData && allData.tripName) {
      // If data exists, wrap it as a trip object
      return [
        {
          id: 1,
          name: allData.tripName || "Trip",
          budget: allData.budget || 0,
          itinerary: allData.itinerary || [],
          packingList: allData.packingList || [],
          budgetItems: allData.budgetItems || [],
        },
      ];
    }
  } catch (e) {
    console.warn("Failed to load trip data:", e);
  }

  // Fallback to mock data
  return [
    {
      id: 1,
      name: mockTripData.tripName || "Sample Trip",
      budget: mockTripData.budget || 0,
      itinerary: mockTripData.itinerary || [],
      packingList: mockTripData.packingList || [],
      budgetItems: mockTripData.budgetItems || [],
    },
  ];
};

const initialState = {
  trips: loadInitialTrips(),
  activeTripId: 1,
};

// Slice 
const tripSlice = createSlice({
  name: "trip",
  initialState,

  reducers: {
    setActiveTripId(state, action) {
      state.activeTripId = action.payload;
    },

    addTrip(state, action) {
      state.trips.push(action.payload);
    },

    updateTrip(state, action) {
      const idx = state.trips.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) {
        state.trips[idx] = action.payload;
      }
    },

    deleteTrip(state, action) {
      state.trips = state.trips.filter((t) => t.id !== action.payload);
      if (state.activeTripId === action.payload && state.trips.length > 0) {
        state.activeTripId = state.trips[0].id;
      }
    },
  },
});

// Actions 
export const { setActiveTripId, addTrip, updateTrip, deleteTrip } = tripSlice.actions;

export default tripSlice.reducer;