export const selectCurrentUser = (state) => state.auth.currentUser;

export const selectAuthStatus = (state) => state.auth.status;

export const selectAuthError = (state) => state.auth.error;

export const selectIsAuthLoading = (state) => selectAuthStatus(state) === "loading";
