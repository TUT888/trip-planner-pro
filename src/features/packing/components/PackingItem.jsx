import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES = {
  Clothes: "bg-green-100 text-green-800",
  Documents: "bg-blue-100 text-blue-800",
  Electronics: "bg-purple-100 text-purple-800",
  Medicine: "bg-red-100 text-red-800",
  Personal: "bg-amber-100 text-amber-800",
  Other: "bg-gray-100 text-gray-700",
};

// Sub-components (defined here, not exported) 

// A clickable badge that cycles its value on click
function CycleBadge({ label, colorClass, onClick, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium",
        "transition-opacity hover:opacity-75 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        colorClass,
      )}
    >
      {label}
      <ChevronUp className="size-3 shrink-0" aria-hidden="true" />
    </button>
  );
}

// Pink quantity pill — display only, quantity is edited via the modal
function QuantityPill({ value }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-pink-50 text-pink-800 text-sm font-medium">
      {value}
    </span>
  );
}

// Main component 
export default function PackingItem({
  item,
  index,
  onTogglePacked,
  onCycleCategory,
  onCycleRequired,
  onEdit,
  onDelete,
}) {
  const categoryStyle = CATEGORY_STYLES[item.category] ?? CATEGORY_STYLES.Other;
  const requiredStyle =
    item.required === "Required"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100  text-gray-600";

  return (
    <tr
      className={cn(
        "border-b border-gray-100 transition-colors",
        item.packed ? "bg-gray-50/60" : "hover:bg-gray-50",
      )}
    >
      <td className="px-3 py-3 text-sm text-gray-400 w-10 select-none">
        {index}
      </td>

      <td
        className={cn(
          "px-3 py-3 text-sm font-medium transition-colors",
          item.packed ? "line-through text-gray-400" : "text-gray-800",
        )}
      >
        {item.name}
      </td>

      <td className="px-3 py-3">
        <CycleBadge
          label={item.category}
          colorClass={categoryStyle}
          onClick={() => onCycleCategory(item.id)}
          ariaLabel={`Category: ${item.category}. Click to change.`}
        />
      </td>

      <td className="px-3 py-3 text-center">
        <QuantityPill value={item.quantity} />
      </td>

      <td className="px-3 py-3">
        <CycleBadge
          label={item.required}
          colorClass={requiredStyle}
          onClick={() => onCycleRequired(item.id)}
          ariaLabel={`Required status: ${item.required}. Click to toggle.`}
        />
      </td>

      <td className="px-3 py-3 text-center">
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => onTogglePacked(item.id)}
          aria-label={`Mark "${item.name}" as ${item.packed ? "not packed" : "packed"}`}
          className="w-5 h-5 cursor-pointer accent-pink-500 rounded"
        />
      </td>

      <td className="px-3 py-3">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(item.id)}
            aria-label={`Delete "${item.name}"`}
            className="text-gray-400 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 aria-hidden="true" />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onEdit(item)}
            aria-label={`Edit "${item.name}"`}
            className="text-gray-400 hover:text-blue-600 hover:bg-blue-50"
          >
            <Pencil aria-hidden="true" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
