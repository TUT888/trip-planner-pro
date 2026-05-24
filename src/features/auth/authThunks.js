import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services/authService";

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials) => {
  return authService.login(credentials);
});

export const registerUser = createAsyncThunk("auth/registerUser", async (userData) => {
  return authService.register(userData);
});
