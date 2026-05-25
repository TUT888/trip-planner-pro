// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchDashboardData = createAsyncThunk(
//   "dashboard/fetchDashboardData",
//   async (tripId, { rejectWithValue }) => {
//     try {
//       if (!tripId) return rejectWithValue("No trip ID provided");

//       const [itineraryRes, budgetRes, packingRes] = await Promise.all([
//         fetch(`http://localhost:3001/itineraryItems?tripId=${tripId}`).then(r => r.json()),
//         fetch(`http://localhost:3001/budgetItems?tripId=${tripId}`).then(r => r.json()),
//         fetch(`http://localhost:3001/packingItems?tripId=${tripId}`).then(r => r.json())
//       ]);

//         console.log("dashboard fetch result:", { itineraryRes, budgetRes, packingRes });

//       return {
//         itinerary: itineraryRes,
//         budgetItems: budgetRes,
//         packingList: packingRes
//       };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );