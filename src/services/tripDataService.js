import mockTripData from "../data/mockTripData.json" with { type: 'json' }

const STORAGE_KEY = "trip"
const MOCK_DATA_VERSION_KEY = "tripMockDataVersion"
const MOCK_DATA_VERSION = "hoi-an-sample-data-v1"
export const TRIP_DATA_CHANGE_EVENT = "trip-data-change"

export const TRIP_PROPERTIES = Object.freeze({
  NAME: "tripName", 
  INIT_BUDGET: "budget", 
  ITINERARY: "itinerary", 
  PACKING_LIST: "packingList", 
  BUDGET_ITEMS: "budgetItems"
})
const saveTripData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(TRIP_DATA_CHANGE_EVENT, { detail: data }));
};

const loadTripData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveData = (property, value) => {
  const currentTrip = loadTripData() || {};

  const updatedTrip = {
    ...currentTrip,
    [property]: value
  };

  saveTripData(updatedTrip);
}

export const loadData = (property) => {
  // property: one of the values "budgetItems" | "packingList" | "itinerary"
  let tripData = loadTripData();

  if (!tripData || shouldRefreshMockData()) {
    saveTripData(mockTripData);
    saveMockDataVersion();
    tripData = mockTripData;
  }

  return tripData[property];
}

const shouldRefreshMockData = () => {
  return localStorage.getItem(MOCK_DATA_VERSION_KEY) !== MOCK_DATA_VERSION;
}

const saveMockDataVersion = () => {
  localStorage.setItem(MOCK_DATA_VERSION_KEY, MOCK_DATA_VERSION);
}
