import { DeleteConfirmationModal } from '@/components/modals/DeleteConfirmationModal';

export function ConfirmDeleteModal({ isOpen, itemName, onConfirm, onClose }) {
  return (
    <DeleteConfirmationModal
      isOpen={isOpen}
      title="Delete Budget Item"
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <p>
        Are you sure you want to delete{' '}
        <span className="font-semibold text-gray-800">{itemName}</span>? This action cannot be undone.
      </p>
    </DeleteConfirmationModal>
  );
}
