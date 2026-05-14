import { useDispatch } from "react-redux";
import { PackingItem } from "./PackingItem";
import { Luggage } from "lucide-react";
import { cycleItemCategory, cycleItemRequired, removeFromCheckList, togglePacked } from "../packingSlice";

// Column header config
const COLUMNS = [
  { key: "index", label: "#", className: "w-10" },
  { key: "name", label: "Item name", className: "min-w-[120px]" },
  { key: "category", label: "Category", className: "w-36" },
  { key: "quantity", label: "Quantity", className: "w-24 text-center" },
  { key: "required", label: "Required Status", className: "w-36" },
  { key: "packed", label: "Packed Status", className: "w-28 text-center" },
  { key: "actions", label: "", className: "w-20" },
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
  const handleDelete = (id) => dispatch(removeFromCheckList(id));
  const handleCycleCategory = (id) => dispatch(cycleItemCategory(id));
  const handleCycleRequired = (id) => dispatch(cycleItemRequired(id));

  // Edit opens a modal — local state is fine here (UI-only, not persisted)
  const handleEdit = (item) => {
    // TODO (next task): open edit modal, dispatch(openEditModal(item))
    console.log("Edit item:", item);
  };

  return (
    <div className="overflow-x-auto rounded-sm shadow-sm border border-gray-100">
      <table className="w-full border-collapse">
        {/* Table head */}
        <thead>
          <tr className="border-b border-gray-200 bg-white">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`px-3 pb-3 pt-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 ${col.className}`}
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
                onCycleCategory={handleCycleCategory}
                onCycleRequired={handleCycleRequired}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
