import { useSelector } from 'react-redux';
import { selectBudgetTotals } from '../budgetSelectors';
import { formatCurrency } from '../../../utils/formatUtils';

export function BudgetOverview() {
  const totals = useSelector(selectBudgetTotals);

  return (
    <div className="space-y-4">
      {/* Dashboard Summary Grid (Full Width) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:scale-[1.01] transition-all">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Estimated</p>
          <p className="text-2xl font-black text-gray-900">{formatCurrency(totals.totalEstimated)}</p>
        </div>
        
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:scale-[1.01] transition-all border-l-4 border-l-pink-500">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Actual</p>
          <p className="text-2xl font-black text-pink-600">{formatCurrency(totals.totalActual)}</p>
        </div>
        
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:scale-[1.01] transition-all border-l-4 border-l-red-500">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Remaining Budget</p>
          <p className="text-2xl font-black text-red-600">
            {totals.remainingBudget < 0 ? '-' : ''}{formatCurrency(Math.abs(totals.remainingBudget))}
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:scale-[1.01] transition-all border-l-4 border-l-blue-500">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Est. vs Actual Diff</p>
          <p className="text-2xl font-black text-blue-500">
            {totals.diff > 0 ? '+' : ''}{totals.diffPercentage.toFixed(1)}% {totals.diff > 0 ? 'Over' : 'Under'}
          </p>
        </div>
      </div>
    </div>
  );
}
