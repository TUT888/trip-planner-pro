import { useDispatch } from "react-redux";
import { PackingItem } from "./PackingItem";
import { Luggage } from "lucide-react";
import {
  removeFromCheckList,
  togglePacked,
  updateCheckList,
} from "../packingSlice";
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import { useModal } from "@/hooks/useModal";
import { PackingForm } from "./PackingForm";

// Column header config
const COLUMNS = [
  { key: "index", label: "#", className: "w-10 text-center" },
  { key: "name", label: "Item name", className: "min-w-[120px] text-left" },
  { key: "category", label: "Category", className: "w-36 text-center" },
  { key: "quantity", label: "Quantity", className: "w-24 text-center" },
  { key: "required", label: "Required", className: "w-36 text-center" },
  { key: "packed", label: "Packed", className: "w-28 text-center" },
  { key: "actions", label: "Action", className: "w-20 text-center" },
];

// Empty states
function EmptyState({ isFiltered }) {
  return (
    <tr>
      <td colSpan={COLUMNS.length} className="py-16 text-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <Luggage className="size-10 stroke-1" aria-hidden="true" />
          {isFiltered ? (
            <>
              <p className="text-sm font-medium text-gray-600">
                No items match your filters
              </p>
              <p className="text-xs text-gray-400">
                Try adjusting the category or status filter.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-600">
                Your packing list is empty
              </p>
              <p className="text-xs text-gray-400">
                Click &ldquo;+ Add new item&rdquo; to start packing!
              </p>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

// Main component
export function PackingList({ items = [], isFiltered = false }) {
  const dispatch = useDispatch();

  const handleTogglePacked = (id) => dispatch(togglePacked(id));
  
  const [isEditModalOpen, handleOpenEditModal, handleCloseEditModal, itemToEdit] = useModal(null);
  const handleConfirmEdit = (updatedItem) => dispatch(updateCheckList(updatedItem));

  const [isDeleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal, deleteItemId] = useModal(-1);
  const handleConfirmDelete = () => dispatch(removeFromCheckList(deleteItemId));

  return (
    <div className="overflow-x-auto rounded-sm shadow-sm border border-gray-100">
      <table className="w-full border-collapse">
        {/* Table head */}
        <thead>
          <tr className="border-b border-gray-200 bg-white">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wide text-gray-500 ${col.className}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-50">
          {items.length === 0 ? (
            <EmptyState isFiltered={isFiltered} />
          ) : (
            items.map((item, idx) => (
              <PackingItem
                key={item.id}
                item={item}
                index={idx + 1}
                onTogglePacked={handleTogglePacked}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteModal}
              />
            ))
          )}
        </tbody>
      </table>

      {/* Modals */}
      {isEditModalOpen && (
        <PackingForm itemToEdit={itemToEdit} onSubmit={handleConfirmEdit} onClose={handleCloseEditModal} />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDeleteModal}
        >
          <p>Are you sure you want to delete <span className="font-bold text-gray-900">{}</span>from checklist?</p>
          <p>This action cannot be undone.</p>
        </DeleteConfirmationModal>
      )}
    </div>
  );
}
