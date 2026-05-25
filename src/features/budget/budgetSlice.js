import { createSlice } from '@reduxjs/toolkit';
import {
  addBudgetItem,
  deleteBudgetItem,
  fetchBudgetItems,
  resetBudget,
  updateBudgetItem,
} from './budgetThunks';
import { clearTripData, deleteTrip } from '@/features/trip/tripThunks';
import { logout } from '../auth/authSlice';

const initialState = {
  items: [],
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch
      .addCase(fetchBudgetItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // Handle add
      .addCase(addBudgetItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Handle update
      .addCase(updateBudgetItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      // Handle delete
      .addCase(deleteBudgetItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      // Handle reset
      .addCase(resetBudget.fulfilled, (state) => {
        // state.items = state.items.filter((item) => item.tripId !== action.payload.tripId);
        state.items = []; // Always fetch budget items with tripId, so we don't need filter
      })

      // Listen to clear trip thunk -> returned data from thunk is action.payload
      .addCase(clearTripData.fulfilled, (state) => {
        // state.items = state.items.filter((item) => item.tripId !== action.payload.tripId);
        state.items = []; // Always fetch budget items with tripId, so we don't need filter
      })
      // Listen to delete trip thunk -> returned data from thunk is action.payload
      .addCase(deleteTrip.fulfilled, (state) => {
        // state.items = state.items.filter((item) => item.tripId !== action.payload);
        state.items = []; // Always fetch budget items with tripId, so we don't need filter
      })
      // Listen to logout -> clear all data when logout
      .addCase(logout, (state) => {
        state.items = [];
      });;
  },
});

export default budgetSlice.reducer;
