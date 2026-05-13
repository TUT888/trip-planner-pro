import { useSelector } from 'react-redux';
import { selectCategoryBreakdown } from '../budgetSelectors';
import { BUDGET_CATEGORIES } from '../budgetConstants';
import { formatCurrency } from '../../../utils/formatUtils';

export function BudgetCategoryBreakdown() {
  const breakdown = useSelector(selectCategoryBreakdown);

  // We want to preserve the order: Transport, Accommodation, Food, Shopping, Activity, Other
  const categoriesList = [
    BUDGET_CATEGORIES.TRANSPORT,
    BUDGET_CATEGORIES.ACCOMMODATION,
    BUDGET_CATEGORIES.FOOD,
    BUDGET_CATEGORIES.SHOPPING,
    BUDGET_CATEGORIES.ACTIVITY,
    BUDGET_CATEGORIES.OTHER,
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category Breakdown</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {categoriesList.map((category) => (
          <div key={category} className="flex-none bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 min-w-[140px] hover:border-pink-300 transition-colors">
            <p className="text-[10px] font-bold text-purple-700 uppercase">{category}</p>
            <p className="text-lg font-black text-gray-900">{formatCurrency(breakdown[category])}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
