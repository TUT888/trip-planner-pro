import { useState } from "react";
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

export function TripSelector() {
  const [trips, setTrips] = useState([
    { id: "1", name: "Da Nang Trip" },
    { id: "2", name: "Ha Noi Trip" },
  ]);
  const [isTripFormOpen, setTripFormOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState("1");

  const handleSelectTrip = (tripId) => {
    setSelectedTrip(tripId);
    // onSelectTrip?.(tripId)
  };

  const handleCreateTrip = (newTrip) => {
    setTrips([...trips, newTrip]);
    handleSelectTrip(newTrip.id);

    setTripFormOpen(false);
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

      <Button size="icon" variant="outline" onClick={() => setTripFormOpen(true)}>
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
