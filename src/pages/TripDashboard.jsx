import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SampleDashboardComponent } from "@/features/dashboard/SampleDashboardComponent";
import { fetchItineraryItems } from "@/features/itinerary/itineraryThunks";
import { selectSelectedTripId } from "@/features/trip/tripSelector";

export function TripDashboard() {
  const dispatch = useDispatch();
  const selectedTripId = useSelector(selectSelectedTripId);

  // Workaround since itinerary will not use Redux
  useEffect(() => {
    if (selectedTripId) {
      dispatch(fetchItineraryItems(selectedTripId));
    }
  }, [dispatch, selectedTripId]);

  return (
    <>
      <h1 className="text-2xl">Hello from DashBoard</h1>
      <SampleDashboardComponent />
    </>
  )
}
