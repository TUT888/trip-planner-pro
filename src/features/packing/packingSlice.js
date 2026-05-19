import { loadData, saveData, TRIP_PROPERTIES } from "@/services/tripDataService";
import { createSlice } from "@reduxjs/toolkit";
import { PACKING_STATUS } from "./packingConstants";

const initialState = {
  checklist: loadData(TRIP_PROPERTIES.PACKING_LIST) ?? []
};

export const packingSlice = createSlice({
  name: "packing",
  initialState,
  reducers: {
    addToChecklist: (state, action) => {
      let newId = 1;
      if (state.checklist.length > 0) {
        newId = state.checklist[state.checklist.length-1].id + 1;
      }
      state.checklist.push({
        id: newId,
        ...action.payload
      });
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
    togglePacked: (state, action) => {
      const item = state.checklist.find((i) => i.id === action.payload);
      if (item) {
        item.packedStatus = item.packedStatus === PACKING_STATUS.PACKED
            ? PACKING_STATUS.NOT_PACKED
            : PACKING_STATUS.PACKED;
        saveData(TRIP_PROPERTIES.PACKING_LIST, state.checklist);
      }
    },
    clearAll: (state) => {
      state.checklist = [];
      saveData(TRIP_PROPERTIES.PACKING_LIST, state.checklist);
    }
  },
});

// Actions 
export const {
  addToChecklist,
  updateCheckList,
  removeFromCheckList,
  togglePacked,
  clearAll
} = packingSlice.actions;

export default packingSlice.reducer;