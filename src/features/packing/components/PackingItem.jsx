import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PACKING_STATUS, PACKING_CATEGORY_STYLES, PACKING_PRIORITY_STYLES } from "../packingConstants";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Main component 
export function PackingItem({ item, index, onTogglePacked, onEdit, onDelete }) {
  const categoryStyle = PACKING_CATEGORY_STYLES[item.category] ?? PACKING_CATEGORY_STYLES.Other;
  const requiredStyle = PACKING_PRIORITY_STYLES[item.requiredStatus];

  const isPacked = item.packedStatus === PACKING_STATUS.PACKED;

  return (
    <tr
      className={cn(
        "border-b border-gray-100 transition-colors",
        isPacked ? "bg-gray-100" : "hover:bg-gray-50",
      )}
    >
      <td className="px-3 py-3 text-sm text-gray-400 w-10 select-none">
        {index}
      </td>

      <td
        className={cn(
          "px-3 py-3 text-sm font-medium transition-colors",
          isPacked ? "line-through text-gray-400" : "text-gray-800",
        )}
      >
        {item.name}
      </td>

      <td className="px-3 py-3 text-center">
        <Badge className={categoryStyle}>{item.category}</Badge>
      </td>

      <td className="px-3 py-3 text-center">
        {item.quantity}
      </td>

      <td className="px-3 py-3 text-center">
        <Badge className={requiredStyle}>{item.requiredStatus}</Badge>
      </td>

      <td className="px-3 py-3 flex justify-center">
        <Input
          type="checkbox"
          checked={isPacked}
          onChange={() => onTogglePacked(item.id)}
          aria-label={`Mark "${item.name}" as ${item.packedStatus}`}
          className="w-5 h-5 cursor-pointer accent-primary rounded"
        />
      </td>
      
      {/* Buttons */}
      <td className="px-3 py-3">
        <div className="flex items-center justify-center gap-1">
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
