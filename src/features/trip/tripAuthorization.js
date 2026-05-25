export const isTripOwner = (trip, user) => {
  return Boolean(trip && user && String(trip.ownerId) === String(user.id));
};

export const isTripSharedWithUser = (trip, user) => {
  if (!trip || !user || !Array.isArray(trip.sharedWith)) return false;
  return trip.sharedWith.some((userId) => String(userId) === String(user.id));
};

export const isTripAccessible = (trip, user) => {
  return isTripOwner(trip, user) || isTripSharedWithUser(trip, user);
};
