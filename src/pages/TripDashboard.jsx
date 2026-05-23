
import { PackingChecklistSection } from "@/features/dashboard/components/PackingChecklistSection.jsx"
import { TravelBudgetSection } from "@/features/dashboard/components/TravelBudgetSection"
import { SummaryCard } from "@/features/dashboard/components/SummaryCard.jsx"
import { MOCK_TRIP_DATA } from "@/data/mockDataDashboard.js"
import { ActivitiesSection } from "@/features/dashboard/components/AllActivitesSection"
import { useState } from "react";


import { 
  calculateItineraryProgress, 
  calculatePackingProgress,
  calculateBudgeProgress,
  calculateUnpaidItems,
  calculateOverdueActivities
  
} from "@/features/dashboard/dashboardSummaryUtils";


export const TripDashboard = () => {
  const [tripData, setTripData] = useState(MOCK_TRIP_DATA);

  const intineraryPercent = calculateItineraryProgress(tripData.itinerary);
  const packingPercent = calculatePackingProgress(tripData.packingList);
  const budgetPercent = calculateBudgeProgress(tripData.budgetItems);
  const unpaidItems = calculateUnpaidItems(tripData.budgetItems);
  const overdueActivities = calculateOverdueActivities(tripData.itinerary);
  return (
    <div className="px-2">

      {/* Hiển thị tên trip */}
      <h1 className="trip-name font-bold text-xl mb-2">{tripData.tripName}</h1>
      
    {/* Hiển thị 5 thẻ hàng ngang đầu tiên */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {/* {MOCK_TRIP_DATA.stats.map((val,i)=>(
          <SummaryCard
            key={i}
            value={val.value}
            title={val.label}
            progress={val.progress}
          />
        ))} */}

        <SummaryCard
          title="itinerary completed"
          value = {`${intineraryPercent}%`}
          progress={intineraryPercent}
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
      <ActivitiesSection activities={tripData.itinerary}/>
      {/* Ô 2: Travel budget */}      
      <TravelBudgetSection budget={tripData.budgetItems}/>
      
      {/* Ô 3: Packing checklist */}
      <PackingChecklistSection packingList={tripData.packingList}/>
      </div>
      
      
      

    </div>
  )
}

