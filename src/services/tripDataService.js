const STORAGE_KEY = "trip"

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
  return data ? JSON.parse(data)[property] : null;
}

// Save/load the entire trip object
export const saveTripData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadTripData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};