import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PACKING_STATUS } from "../packingConstants";
import { packingListStyle } from "../packingStyles";
import { TableCell, TableRow } from "@/components/ui/table";

// Main component 
export function PackingItem({ item, index, onTogglePacked, onEdit, onDelete }) {
  const categoryStyle = packingListStyle.category[item.category];
  const requiredStyle = packingListStyle.priority[item.requiredStatus];

  const isPacked = item.packedStatus === PACKING_STATUS.PACKED;

  return (
    <TableRow>
      <TableCell className="text-center">
        {index}
      </TableCell>

      <TableCell
        className={cn(
          "font-medium",
          isPacked ? "line-through text-gray-400" : "text-gray-800",
        )}
      >
        {item.name}
      </TableCell>

      <TableCell className="text-center">
        <Badge className={categoryStyle}>{item.category}</Badge>
      </TableCell>

      <TableCell className="text-center">
        {item.quantity}
      </TableCell>

      <TableCell className="text-center">
        <Badge className={requiredStyle}>{item.requiredStatus}</Badge>
      </TableCell>

      <TableCell className="text-center">
        <Input
          type="checkbox"
          checked={isPacked}
          onChange={onTogglePacked}
          aria-label={`Mark "${item.name}" as ${item.packedStatus}`}
          className="w-5 h-5 cursor-pointer accent-primary rounded"
        />
      </TableCell>
      
      {/* Buttons */}
      <TableCell>
        <div className="flex items-center justify-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(item)}
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
      </TableCell>
    </TableRow>
  );
}
