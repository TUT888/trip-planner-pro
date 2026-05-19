import { createSelector } from "@reduxjs/toolkit";
import { PACKING_STATUS } from "./packingConstants";
import { calculatePackingProgress } from "./packingUtils";

// Arrow function, direct lookup
export const selectPackingChecklist = (state) => state.packing.checklist;
export const selectPackingFilter = (state) => state.packing.filters;

// Function declaration for derived values
// input selector must pass in the state as the first argument (state, ...extraArgs) => ...
const selectFilter = (state, filters) => filters;
export const selectFilteredItems = createSelector(
  [selectPackingChecklist, selectFilter],
  (checklist, filters) => {
    return checklist.filter((item) => {
      const categoryMatch = filters.category === "All" || item.category === filters.category;
      const statusMatch = filters.packedStatus === "All" || 
                        (filters.packedStatus === "Packed" && item.packedStatus === PACKING_STATUS.PACKED) ||
                        (filters.packedStatus === "Not Packed" && item.packedStatus === PACKING_STATUS.NOT_PACKED);
      return categoryMatch && statusMatch;
    });
  }
);

export const selectProgress = createSelector(
  [selectPackingChecklist],
  (checklist) => {
    if (checklist.length === 0) return { packed: 0, total: 0, percentage: 0 };

    const packed = checklist.filter((i) => i.packedStatus === PACKING_STATUS.PACKED).length;

    return {
      packed,
      total: checklist.length,
      percentage: Math.round(calculatePackingProgress(checklist)),
    };
  }
);
