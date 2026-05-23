import { useDispatch, useSelector } from "react-redux";
import { Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackingForm } from "./PackingForm";
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import { useModal } from "@/hooks/useModal";

import { addToChecklist, clearAll } from "../packingThunks";

export function PackingHeader() {
  const dispatch = useDispatch();
  const selectedTripId = useSelector((state) => state.trips.selectedTripId);

  const formModal = useModal(null);
  const handleSubmitForm = (newItem) => {
    formModal.handleClose();
    dispatch(addToChecklist({ tripId: selectedTripId, item: newItem }));
  };

  const deleteModal = useModal({ id: "", name: "" });
  const handleConfirmClearAll = () => {
    deleteModal.handleClose();
    dispatch(clearAll(selectedTripId));
  };

  return (
    <div className="flex flex-row justify-between items-center">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-semibold text-gray-800">
          Packing Checklist
        </h1>
        <p className="text-sm text-gray-500">Manage your packing progress</p>
      </div>

      {/* Button */}
      <div className="flex flex-row items-center gap-2">
        <Button
          variant="ghost"
          size="default"
          onClick={() => formModal.handleOpen()}
          disabled={!selectedTripId}
          className="bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary"
        >
          <Plus aria-hidden="true" />
          Add new item
        </Button>

        {/* Clear all */}
        <Button
          variant="destructive"
          size="default"
          onClick={() => deleteModal.handleOpen()}
          disabled={!selectedTripId}
        >
          <RotateCcw aria-hidden="true" />
          Clear
        </Button>
      </div>

      {/* Form Modal */}
      {formModal.isOpen && (
        <PackingForm
          isOpen={formModal.isOpen}
          onClose={formModal.handleClose}
          onSubmit={handleSubmitForm}
        />
      )}

      {/* Delete Modal */}
      {deleteModal.isOpen && (
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.handleClose}
          onConfirm={handleConfirmClearAll}
        >
          <p>
            Are you sure you want to 
            <span className="font-bold text-gray-900"> clear all packing checklist? </span>
            This action cannot be undone.
          </p>
        </DeleteConfirmationModal>
      )}
    </div>
  );
}
