const AUTH_USER_STORAGE_KEY = "authUser";
const SELECTED_TRIP_STORAGE_KEY = "selectedTripId";

export const loadAuthUser = () => {
  const storedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const saveAuthUser = (user) => {
  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearAuthUser = () => {
  localStorage.removeItem(AUTH_USER_STORAGE_KEY);
};

export const loadSelectedTripId = () => {
  return localStorage.getItem(SELECTED_TRIP_STORAGE_KEY);
};

export const saveSelectedTripId = (tripId) => {
  localStorage.setItem(SELECTED_TRIP_STORAGE_KEY, String(tripId));
};

export const clearSelectedTripId = () => {
  localStorage.removeItem(SELECTED_TRIP_STORAGE_KEY);
};

export const clearCurrentSessionStorage = () => {
  clearAuthUser();
  clearSelectedTripId();
};
