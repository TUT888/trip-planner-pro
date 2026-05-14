import { selectActiveTripId, selectAllTrips } from "@/features/trip/tripSelector";
import { setActiveTripId } from "@/features/trip/tripSlice";
import { MapPin, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export function TripSelector() {
  const dispatch = useDispatch();
  const trips = useSelector(selectAllTrips);
  const activeTripId = useSelector(selectActiveTripId);
  
  const handleSelectTrip = (id) => dispatch(setActiveTripId(id));

  if (trips.length === 0) {
    return (
      <div className="flex items-center gap-1.5 text-sm text-gray-400">
        <MapPin className="size-4" aria-hidden="true" />
        <span>No trips available</span>
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <MapPin
        className="absolute left-2.5 size-4 text-pink-500 pointer-events-none"
        aria-hidden="true"
      />
      <select
        value={activeTripId ?? ""}
        onChange={(e) => handleSelectTrip(e.target.value)}
        aria-label="Select a trip"
        className="
          appearance-none pl-8 pr-8 py-1.5
          text-sm font-medium text-gray-700
          bg-white border border-gray-200 rounded-lg
          hover:border-pink-300 focus:outline-none
          focus:ring-2 focus:ring-pink-300 focus:ring-offset-1
          cursor-pointer transition-colors
        "
      >
        <option value="" disabled>
          Select a trip…
        </option>
        {trips.map((trip) => (
          <option key={trip.id} value={trip.id}>
            {trip.name}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-2.5 size-4 text-gray-400 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
