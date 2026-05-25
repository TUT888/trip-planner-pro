import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunks";
import { clearCurrentSessionStorage, loadAuthUser, saveAuthUser } from "@/services/localStorageService";

const initialState = {
  currentUser: loadAuthUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      clearCurrentSessionStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        saveAuthUser(action.payload);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
