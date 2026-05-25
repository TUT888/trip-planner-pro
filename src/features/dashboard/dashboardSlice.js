// import { createSlice } from "@reduxjs/toolkit";
// import { fetchDashboardData } from "./dashboardThunks";

// // Import các thunk của Budget
// import { 
//   addBudgetItem, 
//   updateBudgetItem, 
//   deleteBudgetItem,
//   resetBudget 
// } from "@/features/budget/budgetThunks";

// // Import các thunk của Packing
// import { 
//   addToChecklist, 
//   updateCheckList, 
//   togglePacked, 
//   removeFromCheckList,
//   clearAll 
// } from "@/features/packing/packingThunks";

// // Hàm trợ giúp bóc tách dữ liệu an toàn phòng trường hợp apiClient bọc trong biến .data
// const getPayloadData = (payload) => {
//   if (!payload) return null;
//   return payload.data !== undefined ? payload.data : payload;
// };

// const initialState = {
//   tripName: "",
//   itinerary: [],
//   budgetItems: [],
//   packingList: [],
// };

// const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder

//       .addCase(fetchDashboardData.fulfilled, (state, action) => {
//         const data = getPayloadData(action.payload) || {};
        
//         // Array.isArray check
//         state.itinerary = Array.isArray(data.itinerary) ? data.itinerary : [];
//         state.budgetItems = Array.isArray(data.budgetItems) ? data.budgetItems : [];
//         state.packingList = Array.isArray(data.packingList) ? data.packingList : [];
//         })

//       .addCase(addBudgetItem.fulfilled, (state, action) => {
//         const item = getPayloadData(action.payload);
//         if (item) state.budgetItems.push(item);
//       })
//       .addCase(updateBudgetItem.fulfilled, (state, action) => {
//         const item = getPayloadData(action.payload);
//         if (item) {
//           const idx = state.budgetItems.findIndex(b => b.id === item.id);
//           if (idx !== -1) state.budgetItems[idx] = item;
//         }
//       })
//       .addCase(deleteBudgetItem.fulfilled, (state, action) => {
//         const itemId = getPayloadData(action.payload);
//         if (itemId) {
//           state.budgetItems = state.budgetItems.filter(item => item.id !== itemId);
//         }
//       })
//       .addCase(resetBudget.fulfilled, (state) => {
//         state.budgetItems = [];
//       })

//       .addCase(addToChecklist.fulfilled, (state, action) => {
//         const item = getPayloadData(action.payload);
//         if (item) state.packingList.push(item);
//       })
//       .addCase(updateCheckList.fulfilled, (state, action) => {
//         const item = getPayloadData(action.payload);
//         if (item) {
//           const idx = state.packingList.findIndex(p => p.id === item.id);
//           if (idx !== -1) state.packingList[idx] = item;
//         }
//       })
//       .addCase(togglePacked.fulfilled, (state, action) => {
//         const item = getPayloadData(action.payload);
//         if (item) {
//           const idx = state.packingList.findIndex(p => p.id === item.id);
//           if (idx !== -1) state.packingList[idx] = item;
//         }
//       })
//       .addCase(removeFromCheckList.fulfilled, (state, action) => {
//         const itemId = getPayloadData(action.payload);
//         if (itemId) {
//           state.packingList = state.packingList.filter(item => item.id !== itemId);
//         }
//       })
//       .addCase(clearAll.fulfilled, (state) => {
//         state.packingList = [];
//       });
//   }
// });

// export default dashboardSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tripName: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;