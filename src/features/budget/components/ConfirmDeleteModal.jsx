import { X, AlertTriangle } from 'lucide-react';

export function ConfirmDeleteModal({ itemName, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Budget Item</h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete <span className="font-semibold text-gray-700">{itemName}</span>? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 font-medium transition"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 font-medium transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
