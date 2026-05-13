import { loadData, saveData, TRIP_PROPERTIES } from "@/services/tripDataService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checklist: loadData(TRIP_PROPERTIES.PACKING_LIST),
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
      const itemIdx = state.checklist.findIndex((item) => item.id === action.payload.id);

      if (itemIdx !== -1) {
        state.checklist[itemIdx] = {
          ...state.checklist[itemIdx],
          ...action.payload
        }
      }
      saveData(TRIP_PROPERTIES.PACKING_LIST, state.checklist);
    },
    removeFromCheckList: (state, action) => {
      state.checklist = state.checklist.filter((item) => item.id !== action.payload);
      saveData(TRIP_PROPERTIES.PACKING_LIST, state.checklist);
    }
  },
});

export const { addToChecklist, updateCheckList, removeFromCheckList } = packingSlice.actions;

export default packingSlice.reducer;
