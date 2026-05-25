import './Itinerary.css';
import { useSelector } from 'react-redux';
import { PageTitle } from "@/components/PageTitle";
import { ItineraryList } from "@/features/itinerary/components/ItineraryList";
import { selectIsSelectedTripOwner, selectSelectedTripId } from "@/features/trip/tripSelector"

export function Itinerary() {
  const selectedTripId = useSelector(selectSelectedTripId);
  const canEdit = useSelector(selectIsSelectedTripOwner) === "owner";

  return (
    <div className="flex flex-col gap-4 font-[Ubuntu,sans-serif]">
      <PageTitle
        title="Itinerary"
        subtitle="Plan and review your trip activities"
      />
      <ItineraryList selectedTripId={selectedTripId} canEdit={canEdit} />
    </div>
  )
}
