import mockTripData from "../data/mockTripData.json" with { type: 'json' }

const STORAGE_KEY = "trip"
export const TRIP_PROPERTIES = Object.freeze({
  NAME: "tripName", 
  INIT_BUDGET: "budget", 
  ITINERARY: "itinerary", 
  PACKING_LIST: "packingList", 
  BUDGET_ITEMS: "budgetItems"
})

export const saveData = (property, value) => {
  // property: one of the values "budgetItems" | "packingList" | "itinerary"
  // value: value of item (it should be a list, for example, list of budget items)
  const currentTrip = loadTripData() || {};
  const updatedTrip = {
    ...currentTrip,
    [property]: value
  };
  saveTripData(updatedTrip);
}

export const loadData = (property) => {
  // property: one of the values "budgetItems" | "packingList" | "itinerary"
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data)[property]

  saveTripData(mockTripData);
  const newData = localStorage.getItem(STORAGE_KEY);
  return newData ? JSON.parse(data)[property] : null;
}

// Save/load the entire trip object
const saveTripData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const loadTripData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};