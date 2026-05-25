import { budgetAll } from "./dashboardBudgetUtils"
import { calculatePackingSummaryCards, calculatePackingCategoriesProgress } from "./dashboardPackingSummaryUtils"
import { setFilteredTimeline } from "./dashboardAllActivitesUtils"
import { selectSelectedTripBudget } from "@/features/trip/tripSelector";
import { createSelector } from "@reduxjs/toolkit"; // ✅ thêm import này


import {
    calculateItineraryProgress,
    calculatePackingProgress,
    calculateBudgetProgress,
    calculateUnpaidItems,
    calculateOverdueActivities
}from "./dashboardSummaryUtils"


export const selectDashboardState = (state) => state.dashboard;

export const selectDashboardSummary = createSelector(
    [
        (state) => state.itinerary.items,  
        (state) => state.packing.checklist, 
        (state) => state.budget.items,      
    ],
    (itinerary, packingList, budgetItems) => ({
        tripName: "Trip",
        itineraryPercent: calculateItineraryProgress(itinerary),
        packingPercent: calculatePackingProgress(packingList),
        unpaidItems: calculateUnpaidItems(budgetItems),
        budgetPercent: calculateBudgetProgress(budgetItems),
        overdueActivities: calculateOverdueActivities(itinerary)
    })
);

export const selectDashboardActivitiesSummary = createSelector(
    [(state) => state.itinerary.items, (_, activeTab = "All") => activeTab],
    (activities, activeTab) => setFilteredTimeline(activeTab, activities)
);

export const selectDashboardBudgetSummary = createSelector(
    [(state) => state.budget.items, selectSelectedTripBudget],
    (budgetItems, tripBudget) => budgetAll(budgetItems, tripBudget)
);

export const selectDashboardPackingSummary = createSelector(
    [(state) => state.packing.checklist],
    (packingList) => ({
        cards: calculatePackingSummaryCards(packingList),
        progress: calculatePackingCategoriesProgress(packingList)
    })
);