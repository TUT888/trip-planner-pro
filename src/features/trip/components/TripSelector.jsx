import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TripForm } from "./TripForm";

export function TripSelector() {
  const [trips, setTrips] = useState([
    { id: "1", name: "Da Nang Trip" },
    { id: "2", name: "Ha Noi Trip" },
  ]);
  const [newTripOpen, setNewTripOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState("1");

  const handleSelectTrip = (tripId) => {
    setSelectedTrip(tripId);
    // onSelectTrip?.(tripId)
  };

  const handleCreateTrip = (newTrip) => {
    setTrips([...trips, newTrip]);
    handleSelectTrip(newTrip.id);
  };

  return (
    <div className="flex gap-2">
      <div className="w-25 ">
        <Select value={selectedTrip} onValueChange={handleSelectTrip}>
          <SelectTrigger className="bg-background w-full">
            <SelectValue placeholder="Select a trip" />
          </SelectTrigger>
          <SelectContent>
            {trips.map((trip) => (
              <SelectItem key={trip.id} value={trip.id}>
                {trip.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <TripForm
        open={newTripOpen}
        onOpenChange={setNewTripOpen}
        onSubmitTrip={handleCreateTrip}
      />
    </div>
  );
}
