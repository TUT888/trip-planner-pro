import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormModal } from "@/components/modals/FormModal";
import { Field } from "@/components/ui/field";

export function TripForm({ isOpen, onClose, onSubmit }) {
  const [newTripName, setNewTripName] = useState("");

  const handleSubmit = () => {
    if (newTripName.trim()) {
      const newTrip = {
        id: `trip${Date.now()}`,
        name: newTripName,
      };
      onSubmit(newTrip);

      setNewTripName("");
      onClose();
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Create New Trip"
    >
      <Field>
        <Label htmlFor="trip-name">Trip Name</Label>
        <Input
          id="trip-name"
          placeholder="e.g., Summer Vacation 2026"
          value={newTripName}
          onChange={(e) => setNewTripName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </Field>
    </FormModal>
  );
}
