import { useState } from "react";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function TripForm({ open, onOpenChange, onSubmitTrip }) {
  const [newTripName, setNewTripName] = useState("");

  const handleCreateTrip = () => {
    if (newTripName.trim()) {
      const newTrip = {
        id: `trip${Date.now()}`,
        name: newTripName,
      };
      onSubmitTrip(newTrip);

      setNewTripName("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Trip</DialogTitle>
          <DialogDescription>
            Give your new trip a name to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trip-name">Trip Name</Label>
            <Input
              id="trip-name"
              placeholder="e.g., Summer Vacation 2026"
              value={newTripName}
              onChange={(e) => setNewTripName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateTrip();
                }
              }}
            />
          </div>
          <Button onClick={handleCreateTrip} className="w-full">
            Create Trip
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
