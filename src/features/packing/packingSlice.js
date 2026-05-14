import { loadData, saveData, TRIP_PROPERTIES } from "@/services/tripDataService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checklist: loadData(TRIP_PROPERTIES.PACKING_LIST) ?? [],
  filters: {
    category: "All",
    packedStatus: "All",
  },
};

export const packingSlice = createSlice({
  name: "packing",
  initialState,
  reducers: {
    addToChecklist: (state, action) => {
      state.checklist.push(action.payload);
      saveData(TRIP_PROPERTIES.PACKING_LIST, state.checklist);
    },
    updateCheckList: (state, action) => {
      const itemIdx = state.checklist.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (itemIdx !== -1) {
        state.checklist[itemIdx] = {
          ...state.checklist[itemIdx],
          ...action.payload,
        };
      }
      saveData(TRIP_PROPERTIES.PACKING_LIST, state.checklist);
    },
    removeFromCheckList: (state, action) => {
      state.checklist = state.checklist.filter(
        (item) => item.id !== action.payload,
      );
      saveData(TRIP_PROPERTIES.PACKING_LIST, state.checklist);
    },

    togglePacked(state, action) {
      const item = state.checklist.find((i) => i.id === action.payload);
      if (item) {
        item.packedStatus =
          item.packedStatus === PACKING_STATUS.PACKED
            ? PACKING_STATUS.NOT_PACKED
            : PACKING_STATUS.PACKED;
        saveData(TRIP_PROPERTIES.PACKING_LIST, state.checklist);
      }
    },
    cycleItemCategory(state, action) {
      const item = state.checklist.find((i) => i.id === action.payload);
      if (item) {
        const values = Object.values(PACKING_CATEGORY);
        const idx = values.indexOf(item.category);
        item.category = values[(idx + 1) % values.length];
        saveData(TRIP_PROPERTIES.PACKING_LIST, state.checklist);
      }
    },

    cycleItemRequired(state, action) {
      const item = state.checklist.find((i) => i.id === action.payload);
      if (item) {
        const values = Object.values(PACKING_PRIORITY);
        const idx = values.indexOf(item.required);
        item.required = values[(idx + 1) % values.length];
        saveData(TRIP_PROPERTIES.PACKING_LIST, state.checklist);
      }
    },

    // Filter action 
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

// Actions 
export const {
  addToChecklist,
  updateCheckList,
  removeFromCheckList,
  togglePacked,
  cycleItemCategory,
  cycleItemRequired,
  clearAll,
  setFilter,
} = packingSlice.actions;

export default packingSlice.reducer;

// Selectors (derived state - never stored) 

/**
 * Returns items after applying category + packedStatus filters.
 * Progress bar always uses ALL items; this selector is for the table only.
 */
export const selectFilteredItems = (state) => {
  const { checklist, filters } = state.packing;
  return checklist.filter((item) => {
    const catMatch =
      filters.category === "All" || item.category === filters.category;
    const statusMatch =
      filters.packedStatus === "All" ||
      (filters.packedStatus === "Packed" &&
        item.packedStatus === PACKING_STATUS.PACKED) ||
      (filters.packedStatus === "Not Packed" &&
        item.packedStatus === PACKING_STATUS.NOT_PACKED);
    return catMatch && statusMatch;
  });
};

/**
 * Returns packing progress derived from ALL items (not filtered).
 * Use this for the progress bar and summary stats.
 *
 * @returns {{ packed: number, total: number, percentage: number }}
 */
import { calculatePackingProgress } from "@/features/packing/packingUtils";
import { PACKING_CATEGORY, PACKING_PRIORITY, PACKING_STATUS } from "./packingConstants";

export const selectProgress = (state) => {
  const { checklist } = state.packing;
  if (checklist.length === 0) return { packed: 0, total: 0, percentage: 0 };

  const packed = checklist.filter(
    (i) => i.packedStatus === PACKING_STATUS.PACKED,
  ).length;

  return {
    packed,
    total: checklist.length,
    percentage: Math.round(calculatePackingProgress(checklist)),
  };
};
