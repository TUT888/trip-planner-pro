import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatUtils';
import { BUDGET_STATUS } from '../budgetConstants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

export function BudgetItem({ item, onEdit, onDelete }) {
  const isPaid = item.status === BUDGET_STATUS.PAID;

  return (
    <TableRow>
      <TableCell className="font-medium text-gray-800">{item.name}</TableCell>
      <TableCell>
        <Badge className="border-primary/30 bg-primary/10 text-primary">{item.category}</Badge>
      </TableCell>
      <TableCell className="text-gray-700">{formatCurrency(item.estimatedCost)}</TableCell>
      <TableCell className="font-semibold text-primary">
        {item.actualCost || item.actualCost === 0 ? formatCurrency(item.actualCost) : <span className="text-gray-400">--</span>}
      </TableCell>
      <TableCell>
        <Badge className={isPaid ? 'border-primary/20 bg-primary text-primary-foreground' : 'border-border bg-muted text-gray-700'}>
          {isPaid ? 'Paid' : 'Unpaid'}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" onClick={() => onEdit(item)} title="Edit" aria-label="Edit item">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => onDelete(item)} title="Delete" aria-label="Delete item">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}