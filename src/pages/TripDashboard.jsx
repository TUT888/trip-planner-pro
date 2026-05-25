import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItineraryItems } from "@/features/itinerary/itineraryThunks";
import { fetchBudgetItems } from "@/features/budget/budgetThunks";
import { fetchPackingItems } from "@/features/packing/packingThunks";
import { selectSelectedTripId } from "@/features/trip/tripSelector";
import { SummaryCard } from "@/features/dashboard/components/SummaryCard";
import { AllActivitiesSection } from "@/features/dashboard/components/AllActivitiesSection";
import { TravelBudgetSection } from "@/features/dashboard/components/TravelBudgetSection";
import { PackingChecklistSection } from "@/features/dashboard/components/PackingChecklistSection";
import { selectDashboardSummary } from "@/features/dashboard/dashboardSelector"
import { PageTitle } from "@/components/PageTitle";
//import { fetchDashboardData } from "@/features/dashboard/dashboardThunks";
export function TripDashboard() {
  const dispatch = useDispatch();
  const selectedTripId = useSelector(selectSelectedTripId);

  console.log("tripId:", selectedTripId);

   useEffect(() => {
    if (!selectedTripId) return;

    dispatch(fetchItineraryItems(selectedTripId));
    dispatch(fetchPackingItems(selectedTripId));
    dispatch(fetchBudgetItems(selectedTripId));
  }, [dispatch, selectedTripId]);

  const { 
    tripName, 
    itineraryPercent, 
    packingPercent, 
    budgetPercent, 
    unpaidItems, 
    overdueActivities 
  } = useSelector(selectDashboardSummary);

  return (
    <div className="px-2">

      {/* Hiển thị tên trip */}
      <PageTitle 
        title={tripName} 
        subtitle="Overview of your planned trip"
      />
      
    {/* Hiển thị 5 thẻ hàng ngang đầu tiên */}
      <div className="grid grid-cols-5 gap-4 mb-8 uppercase">
        
        <SummaryCard
          title="itinerary completed"
          value = {`${itineraryPercent}%`}
          progress={itineraryPercent}
          />
        <SummaryCard
          title = "packing completed"
          value = {`${packingPercent}%`}
          progress = {packingPercent}
          />

         <SummaryCard
          title= "budget used"
          value = {`${budgetPercent}%`}
          progress={budgetPercent}
          /> 

          <SummaryCard
            title="unpaid budget items"
            value={unpaidItems}
          />

          <SummaryCard
            title= "overdue activities"
            value={overdueActivities}
          />
      </div>

      {/* Hiện thị 3 ô lớn hàng ngang thứ 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Ô 1: All acitvities */}
      <AllActivitiesSection />
      {/* Ô 2: Travel budget */}      
      <TravelBudgetSection />
      
      {/* Ô 3: Packing checklist */}
      <PackingChecklistSection />
      </div>
      
      
      

    </div>
  )
}
