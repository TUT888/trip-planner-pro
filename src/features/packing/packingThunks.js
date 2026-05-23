import { apiClient } from "@/services/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PACKING_STATUS } from "./packingConstants";

export const fetchPackingItems = createAsyncThunk(
  "packing/fetchPackingItems",
  async (tripId) => apiClient.get(`/packingItems?tripId=${tripId}`),
);

export const addToChecklist = createAsyncThunk(
  "packing/addToChecklist",
  async ({ tripId, item }) => apiClient.post("/packingItems", { ...item, tripId }),
);

export const updateCheckList = createAsyncThunk(
  "packing/updateCheckList",
  async ({ itemId, changes }) => apiClient.patch(`/packingItems/${itemId}`, changes),
);

export const removeFromCheckList = createAsyncThunk(
  "packing/removeFromCheckList",
  async (itemId) => {
    await apiClient.delete(`/packingItems/${itemId}`);
    return itemId;
  },
);

export const togglePacked = createAsyncThunk(
  "packing/togglePacked",
  async (item) => {
    const packedStatus = item.packedStatus === PACKING_STATUS.PACKED
      ? PACKING_STATUS.NOT_PACKED
      : PACKING_STATUS.PACKED;

    return apiClient.patch(`/packingItems/${item.id}`, { packedStatus });
  },
);

export const clearAll = createAsyncThunk(
  "packing/clearAll",
  async (tripId, { getState }) => {
    const items = getState().packing.checklist.filter(
      (item) => item.tripId === tripId,
    );

    // JSON server does not have delete all option -> manually delete one by one
    await Promise.all(items.map((item) => apiClient.delete(`/packingItems/${item.id}`)));

    return tripId;
  },
);