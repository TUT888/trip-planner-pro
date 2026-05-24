import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authThunks";

const AUTH_USER_STORAGE_KEY = "authUser";
const loadCurrentUser = () => {
  const storedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};
const saveCurrentUser = (user) => {
  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
};
const clearCurrentUser = () => {
  localStorage.removeItem(AUTH_USER_STORAGE_KEY);
};

const initialState = {
  currentUser: loadCurrentUser(),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.status = "idle";
      state.error = null;
      clearCurrentUser();
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.error = null;
        saveCurrentUser(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.error = null;
        saveCurrentUser(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearAuthError, logout } = authSlice.actions;

export default authSlice.reducer;
