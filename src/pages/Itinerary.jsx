import { SampleItineraryComponent } from "@/features/itinerary/SampleItineraryComponent";
import { selectIsSelectedTripOwner, selectSelectedTripId } from "@/features/trip/tripSelector";
import { useSelector } from "react-redux";

export function Itinerary() {
  const selectedTripId = useSelector(selectSelectedTripId);
  const canEdit = useSelector(selectIsSelectedTripOwner);

  return (
    <>
      <h1 className="text-2xl">Hello from Itinerary</h1>
      <SampleItineraryComponent 
        selectedTripId={selectedTripId} 
        canEdit={canEdit}
      />
    </>
  )
}