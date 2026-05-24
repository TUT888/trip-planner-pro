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
import { Badge } from "@/components/ui/badge";
import { setSelectedTripId } from "../tripSlice";
import { createTrip, fetchTrips } from "../tripThunks";
import { selectCurrentUser } from "@/features/auth/authSelector";
import { selectSelectedTripAccessRole, selectSelectedTripId, selectTrips } from "../tripSelector";

export function TripSelector() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const trips = useSelector(selectTrips);
  const selectedTripId = useSelector(selectSelectedTripId);
  const selectedTripAccessRole = useSelector(selectSelectedTripAccessRole);

  const [isTripFormOpen, setTripFormOpen] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchTrips());
    }
  }, [currentUser, dispatch]);

  const handleSelectTrip = (tripId) => {
    dispatch(setSelectedTripId(tripId));
  };

  const handleCreateTrip = (newTrip) => {
    dispatch(createTrip(newTrip));
    setTripFormOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      {selectedTripAccessRole && (
        <Badge variant={selectedTripAccessRole === "owner" ? "default" : "secondary"}>
          {selectedTripAccessRole === "owner" ? "Owner" : "Guest"}
        </Badge>
      )}

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
