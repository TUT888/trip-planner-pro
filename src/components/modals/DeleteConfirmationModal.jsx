import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function DeleteConfirmationModal({ onConfirm, onCancel, modalTitle = "Delete Confirmation", children }) {
  const handleConfirmDelete = () => {
    onConfirm();
    onCancel();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-5 bg-red-600 text-white">
            <h2 className="text-xl font-bold">
              {modalTitle}
            </h2>
            <Button onClick={onCancel} className="bg-red-600 hover:bg-red-400 rounded">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {children}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t p-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-6 py-5 text-gray-800 hover:bg-gray-100"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleConfirmDelete}
              className="px-6 py-5 bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
  )
}