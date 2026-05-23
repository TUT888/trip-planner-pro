import { createSlice } from '@reduxjs/toolkit';
import {
  addBudgetItem,
  deleteBudgetItem,
  fetchBudgetItems,
  resetBudget,
  updateBudgetItem,
} from './budgetThunks';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgetItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBudgetItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBudgetItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBudgetItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateBudgetItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteBudgetItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(resetBudget.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.tripId !== action.payload.tripId);
      });
  },
});

export default budgetSlice.reducer;
