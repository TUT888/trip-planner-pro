import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatUtils';
import { BUDGET_STATUS } from '../budgetConstants';

export function BudgetItem({ item, onEdit, onDelete }) {
  const isPaid = item.status === BUDGET_STATUS.PAID;
  
  return (
    <div className="grid grid-cols-6 gap-4 py-5 px-8 items-center hover:bg-pink-50/30 transition-colors group">
      <div className="col-span-2 font-bold text-gray-900 text-left">
        {item.name}
      </div>
      
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-[10px] font-black uppercase tracking-tight">
          {item.category}
        </span>
      </div>
      
      <div className="col-span-1 text-center font-medium text-gray-500">
        <span className="border-b border-dashed border-gray-300 group-hover:border-pink-500 transition-colors cursor-text">
          {formatCurrency(item.estimatedCost)}
        </span>
      </div>
      
      <div className="col-span-1 text-center font-bold text-gray-900">
        <span className="border-b border-dashed border-gray-300 group-hover:border-pink-500 transition-colors cursor-text">
          {item.actualCost || item.actualCost === 0 ? formatCurrency(item.actualCost) : <span className="italic text-gray-300">--</span>}
        </span>
      </div>
      
      <div className="col-span-1 flex items-center justify-center gap-4">
        <div className="w-24 flex justify-center">
          {isPaid ? (
            <button className="w-full py-2 bg-pink-500 text-white rounded-full text-xs font-bold shadow-sm cursor-default">Paid</button>
          ) : (
            <button className="w-full py-2 border-2 border-pink-500 text-pink-500 hover:bg-pink-50 rounded-full text-xs font-bold transition-colors cursor-default">Unpaid</button>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-gray-400">
          <button 
            onClick={() => onEdit(item)}
            className="hover:text-pink-500 transition p-2"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(item)}
            className="hover:text-red-500 transition p-2"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
