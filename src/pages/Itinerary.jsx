import { ItineraryCard } from "@/features/itinerary/ItineraryCard";
import { SampleItineraryComponent } from "@/features/itinerary/SampleItineraryComponent";
import './Itinerary.css';
import { ItineraryList } from "@/features/itinerary/ItineraryList";

export function Itinerary() {
  return (
    <div className="font-[Ubuntu,sans-serif]"> 
      <ItineraryList/>
    </div>
  )
}