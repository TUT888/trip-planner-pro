import { useDispatch } from "react-redux";
import { Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackingForm } from "./PackingForm";
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import { useModal } from "@/hooks/useModal";

import { addToChecklist, clearAll } from "../packingThunks";
import { PageTitle } from "@/components/PageTitle";

export function PackingHeader({ canEdit = true, selectedTripId }) {
  const dispatch = useDispatch();

  const formModal = useModal(null);
  const handleSubmitForm = (newItem) => {
    formModal.handleClose();
    dispatch(addToChecklist({ tripId: selectedTripId, item: newItem }));
  };

  const deleteModal = useModal(null);
  const handleConfirmClearAll = () => {
    deleteModal.handleClose();
    dispatch(clearAll(selectedTripId));
  };

  return (
    <div className="flex flex-row justify-between items-center">
      {/* Title */}
      <PageTitle 
        title="Packing Checklist"
        subtitle="Manage your packing progress"
      />

      {/* Button */}
      {canEdit && (
        <div className="flex flex-row items-center gap-2">
          <Button
            variant="ghost"
            size="default"
            onClick={() => formModal.handleOpen()}
            disabled={!selectedTripId || !canEdit}
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
            disabled={!selectedTripId || !canEdit}
          >
            <RotateCcw aria-hidden="true" />
            Clear
          </Button>
        </div>
      )}

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
