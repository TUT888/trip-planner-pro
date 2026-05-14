import mockTripData from "../data/mockTripData.json" with { type: 'json' }

const STORAGE_KEY = "trip"
export const TRIP_PROPERTIES = Object.freeze({
  NAME: "tripName", 
  INIT_BUDGET: "budget", 
  ITINERARY: "itinerary", 
  PACKING_LIST: "packingList", 
  BUDGET_ITEMS: "budgetItems"
})

// Save/load the entire trip object
export const saveTripData = (property, value) => {
  const currentTrip = loadTripData() || {};
  const updatedTrip = {
    ...currentTrip,
    [property]: value
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrip));
};

export const loadTripData = (property) => {
  const data = localStorage.getItem(STORAGE_KEY);
  const tripData = data ? JSON.parse(data) : mockTripData;
  
  if (property) {
    return tripData[property];
  }
  return tripData;
};

// Save/load specific properties (legacy API)
export const saveData = (property, value) => {
  saveTripData(property, value);
}

export const loadData = (property) => {
  return loadTripData(property);
}