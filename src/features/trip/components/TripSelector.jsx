import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TripForm } from "./TripForm";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setSelectedTripId } from "../tripSlice";
import { createTrip, fetchTrips } from "../tripThunks";

export function TripSelector() {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips.items);
  const selectedTripId = useSelector((state) => state.trips.selectedTripId);
  const tripStatus = useSelector((state) => state.trips.status);
  const [isTripFormOpen, setTripFormOpen] = useState(false);

  useEffect(() => {
    if (tripStatus === "idle") {
      dispatch(fetchTrips());
    }
  }, [dispatch, tripStatus]);

  const handleSelectTrip = (tripId) => {
    dispatch(setSelectedTripId(tripId));
  };

  const handleCreateTrip = (newTrip) => {
    dispatch(createTrip(newTrip));
    setTripFormOpen(false);
  };

  return (
    <div className="flex gap-2">
      <div className="w-25 ">
        <Select value={selectedTripId ?? ""} onValueChange={handleSelectTrip}>
          <SelectTrigger className="bg-background w-full">
            <SelectValue placeholder="Select a trip" />
          </SelectTrigger>
          <SelectContent>
            {trips.map((trip) => (
              <SelectItem key={trip.id} value={String(trip.id)}>
                {trip.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        size="icon"
        variant="outline"
        onClick={() => setTripFormOpen(true)}
      >
        <Plus className="h-4 w-4" />
      </Button>

      {/* Form Modal */}
      {isTripFormOpen && (
        <TripForm
          isOpen={isTripFormOpen}
          onClose={() => setTripFormOpen(false)}
          onSubmit={handleCreateTrip}
        />
      )}
    </div>
  );
}
