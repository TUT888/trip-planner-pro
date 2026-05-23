import { useDispatch } from "react-redux";
import { Luggage } from "lucide-react";
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import { PackingItem } from "./PackingItem";
import { PackingForm } from "./PackingForm";
import { useModal } from "@/hooks/useModal";
import {
  removeFromCheckList,
  togglePacked,
  updateCheckList,
} from "../packingThunks";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    <TableRow>
      <TableCell colSpan={COLUMNS.length} className="py-16 text-center">
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
      </TableCell>
    </TableRow>
  );
}

// Main component
export function PackingList({ items = [], isFiltered = false }) {
  const dispatch = useDispatch();

  const handleTogglePacked = (item) => dispatch(togglePacked(item));
  
  const editModal = useModal(null);
  const handleConfirmEdit = (updatedItem) => {
    editModal.handleClose();
    dispatch(updateCheckList({
      itemId: updatedItem.id,
      changes: updatedItem,
    }));
  }

  const deleteModal = useModal({ id: "", name: "" });
  const handleConfirmDelete = () => {
    if (!deleteModal.targetItem) return;
    deleteModal.handleClose();
    dispatch(removeFromCheckList(deleteModal.targetItem.id));
  }

  return (
    <div className="w-full overflow-x-auto rounded-sm shadow-sm border border-gray-100">
      <Table className="w-full min-w-190 table-fixed border-collapse">
        {/* Table head */}
        <TableHeader>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableHead
                key={col.key}
                className={`text-gray-500 ${col.className}`}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Table body */}
        <TableBody>
          {items.length === 0 ? (
            <EmptyState isFiltered={isFiltered} />
          ) : (
            items.map((item, idx) => (
              <PackingItem
                key={item.id}
                item={item}
                index={idx + 1}
                onTogglePacked={() => handleTogglePacked(item)}
                onEdit={editModal.handleOpen}
                onDelete={deleteModal.handleOpen}
              />
            ))
          )}
        </TableBody>
      </Table>

      {/* Form Modal */}
      {editModal.isOpen && (
        <PackingForm 
          isOpen={editModal.isOpen} 
          onClose={editModal.handleClose}
          onSubmit={handleConfirmEdit}
          itemToEdit={editModal.targetItem}
        />
      )}

      {/* Delete Modal */}
      {deleteModal.isOpen && (
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.handleClose}
          onConfirm={handleConfirmDelete}
          title="Delete Packing Item"
        >
          <p>Are you sure you want to delete <span className="font-bold text-gray-900">{deleteModal.targetItem.name}</span> from checklist?</p>
          <p>This action cannot be undone.</p>
        </DeleteConfirmationModal>
      )}
    </div>
  );
}
