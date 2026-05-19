import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatUtils';
import { BUDGET_STATUS } from '../budgetConstants';

export function BudgetItem({ item, onEdit, onDelete }) {
  const isPaid = item.status === BUDGET_STATUS.PAID;
  
  return (
    <div className="grid grid-cols-12 gap-3 px-8 py-6 items-center transition-colors hover:bg-[#f6ecf6]">
      <div className="col-span-4 font-bold text-[#2f1b34]">
        {item.name}
      </div>
      
      <div className="col-span-2">
        <span className="inline-flex items-center rounded-full border border-[#dac8df] bg-[#f0e9f3] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#9d6ab0]">
          {item.category}
        </span>
      </div>
      
      <div className="col-span-2 font-black text-[#a18da8]">
        {formatCurrency(item.estimatedCost)}
      </div>
      
      <div className="col-span-2 font-black text-[#ef11aa]">
        {item.actualCost || item.actualCost === 0 ? formatCurrency(item.actualCost) : <span className="italic text-gray-300">--</span>}
      </div>
      
      <div className="col-span-1">
        <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${isPaid ? 'bg-[#ef11aa] text-white' : 'bg-[#f9d7f0] text-[#df169f]'}`}>
          {isPaid ? 'Paid' : 'Unpaid'}
        </span>
      </div>

      <div className="col-span-1 flex items-center gap-2 text-[#94849b]">
        <button onClick={() => onEdit(item)} className="rounded-full p-2 hover:bg-[#efe2ef] hover:text-[#d81ca2]" title="Edit">
          <Edit2 className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(item)} className="rounded-full p-2 hover:bg-[#efe2ef] hover:text-[#cf3a72]" title="Delete">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
