import { useDispatch, useSelector } from "react-redux";
import { Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackingForm } from "./PackingForm";
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import { useModal } from "@/hooks/useModal";

import { addToChecklist, clearAll } from "../packingSlice";
import { selectProgress } from "../packingSelector";

// Styling variants
const progressVariant = {
  full: { bar: "bg-green-500", track: "bg-green-100", label: "text-green-800" },
  half: { bar: "bg-primary/50", track: "bg-gray-100", label: "text-primary" },
  base: { bar: "bg-primary/30", track: "bg-gray-100", label: "text-primary" }
}

function PackingProgressBar() {
  const { packed, total, percentage } = useSelector(selectProgress);
  const variant = percentage === 100 ? progressVariant.full : percentage >= 50 ? progressVariant.half : progressVariant.base;

  return (
    <div className="flex items-center gap-3">
      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Packing progress: ${packed} of ${total} items packed`}
        className={`relative flex-1 h-5 rounded-full overflow-hidden ${variant.track}`}
      >
        {/* Fill */}
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${variant.bar}`}
          style={{ width: `${percentage}%` }}
        />
        
        {/* Inline percentage label */}
        <span
          className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${variant.label}`}
        >
          {percentage}%
        </span>
      </div>

      {/* Fractional count — e.g. "3 / 10" */}
      <span className="text-xs text-gray-800 font-medium whitespace-nowrap shrink-0">
        {packed} / {total}
      </span>
    </div>
  );
}

export function PackingHeader() {
  const dispatch = useDispatch();

  const formModal = useModal(null);
  const handleSubmitForm = (newItem) => {
    formModal.handleClose();
    dispatch(addToChecklist(newItem));
  };

  const deleteModal = useModal({ id: "", name: "" });
  const handleConfirmClearAll = () => {
    deleteModal.handleClose();
    dispatch(clearAll());
  };

  return (
    <div className="flex flex-row gap-5 p-2 shadow-sm rounded-sm items-center">
      <h1 className="text-2xl font-semibold">Packing Checklist</h1>

      <div className="flex-1">
        <PackingProgressBar />
      </div>

      <div className="flex flex-row items-center gap-2">
        <Button
          variant="outline"
          size="default"
          onClick={() => formModal.handleOpen()}
          className="border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 shrink-0"
        >
          <Plus aria-hidden="true" />
          Add new item
        </Button>

        {/* Clear all */}
        <Button
          variant="destructive"
          size="default"
          onClick={() => deleteModal.handleOpen()}
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
