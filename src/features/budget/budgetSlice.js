import { createSlice } from '@reduxjs/toolkit';
import { loadData, saveData } from '../../services/tripDataService';

const BUDGET_PROPERTY = 'budgetItems';
const INITIAL_BUDGET_PROPERTY = 'initialTripBudget';

// Initial state from local storage or empty array
const initialState = {
  items: loadData(BUDGET_PROPERTY) || [],
  initialBudget: loadData(INITIAL_BUDGET_PROPERTY) || 5000, // Default to 5000 as per example
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setInitialBudget: (state, action) => {
      state.initialBudget = action.payload;
      saveData(INITIAL_BUDGET_PROPERTY, state.initialBudget);
    },
    addBudgetItem: (state, action) => {
      state.items.push(action.payload);
      saveData(BUDGET_PROPERTY, state.items);
    },
    updateBudgetItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        saveData(BUDGET_PROPERTY, state.items);
      }
    },
    deleteBudgetItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveData(BUDGET_PROPERTY, state.items);
    },
    resetBudget: (state) => {
      state.items = [];
      state.initialBudget = 5000;
      saveData(BUDGET_PROPERTY, state.items);
      saveData(INITIAL_BUDGET_PROPERTY, state.initialBudget);
    }
  }
});

export const { setInitialBudget, addBudgetItem, updateBudgetItem, deleteBudgetItem, resetBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
