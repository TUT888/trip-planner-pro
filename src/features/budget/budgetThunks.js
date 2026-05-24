import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/services/apiClient";

const DEFAULT_BUDGET = 0;

export const fetchBudgetItems = createAsyncThunk(
  "budget/fetchBudgetItems",
  async (tripId) => apiClient.get(`/budgetItems?tripId=${tripId}`),
);

export const addBudgetItem = createAsyncThunk(
  "budget/addBudgetItem",
  async ({ tripId, item }) => apiClient.post("/budgetItems", { ...item, tripId }),
);

export const updateBudgetItem = createAsyncThunk(
  "budget/updateBudgetItem",
  async ({ itemId, changes }) => apiClient.patch(`/budgetItems/${itemId}`, changes),
);

export const deleteBudgetItem = createAsyncThunk(
  "budget/deleteBudgetItem",
  async (itemId) => {
    await apiClient.delete(`/budgetItems/${itemId}`);
    return itemId;
  },
);

export const setInitialBudget = createAsyncThunk(
  "budget/setInitialBudget",
  async ({ tripId, budget }) => apiClient.patch(`/trips/${tripId}`, { budget }),
);

export const resetBudget = createAsyncThunk(
  "budget/resetBudget",
  async (tripId, { getState }) => {
    const items = getState().budget.items.filter(
      (item) => item.tripId === tripId,
    );

    await Promise.all(items.map((item) => apiClient.delete(`/budgetItems/${item.id}`)));
    const trip = await apiClient.patch(`/trips/${tripId}`, { budget: DEFAULT_BUDGET });

    return { tripId, trip };
  },
);
