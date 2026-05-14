import { loadData, saveData, TRIP_PROPERTIES } from "@/services/tripDataService";
import { createSlice } from "@reduxjs/toolkit";
import { PACKING_CATEGORY, PACKING_PRIORITY, PACKING_STATUS } from "./packingConstants";

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
        item.packedStatus = item.packedStatus === PACKING_STATUS.PACKED
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
