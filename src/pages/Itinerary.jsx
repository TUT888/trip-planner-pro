import './Itinerary.css';
import { useSelector } from 'react-redux';
import { ItineraryList } from "@/features/itinerary/components/ItineraryList";
import { selectSelectedTripId } from "@/features/trip/tripSelector"

export function Itinerary() {
  const selectedTripId = useSelector(selectSelectedTripId);

  return (
    <div className="font-[Ubuntu,sans-serif]"> 
      <ItineraryList selectedTripId={selectedTripId} />
    </div>
  )
}
