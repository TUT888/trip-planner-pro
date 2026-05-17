import { Button } from "@/components/ui/button";
import { PackingProgressBar } from "./PackingProgressBar";
import { Plus, RotateCcw } from "lucide-react";
import { PackingForm } from "./PackingForm";
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import { useModal } from "@/hooks/useModal";
import { addToChecklist, clearAll } from "../packingSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export function PackingHeader() {
  const dispatch = useDispatch();

  const [isFormModalOpen, handleOpenFormModal, handleCloseFormModal] = useModal(null);
  const handleSubmitForm = (newItem) => dispatch(addToChecklist(newItem));

  const [isDeleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal] = useModal(-1);
  const handleConfirmClearAll = () => dispatch(clearAll());

  useEffect(() => {
    if (isFormModalOpen || isDeleteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => document.body.style.overflow = "auto";
  }, [isFormModalOpen, isDeleteModalOpen]);

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
          onClick={handleOpenFormModal}
          className="border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 shrink-0"
        >
          <Plus aria-hidden="true" />
          Add new item
        </Button>

        {/* Clear all */}
        <Button
          variant="destructive"
          size="default"
          onClick={handleOpenDeleteModal}
        >
          <RotateCcw aria-hidden="true" />
          Clear
        </Button>
      </div>

      {/* Modal */}
      {isFormModalOpen && (
        <PackingForm onSubmit={handleSubmitForm} onClose={handleCloseFormModal} />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onConfirm={handleConfirmClearAll}
          onCancel={handleCloseDeleteModal}
        >
          <p>Are you sure you want to <span className="font-bold text-gray-900">clear all packing checklist</span>?</p>
          <p>This action cannot be undone.</p>
        </DeleteConfirmationModal>
      )}
    </div>
  )
}