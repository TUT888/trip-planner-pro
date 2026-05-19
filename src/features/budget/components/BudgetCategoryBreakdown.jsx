import { useSelector } from 'react-redux';
import { selectCategoryBreakdown } from '../budgetSelectors';
import { BUDGET_CATEGORIES } from '../budgetConstants';
import { formatCurrency } from '../../../utils/formatUtils';

export function BudgetCategoryBreakdown({ selectedCategory, onSelectCategory }) {
  const breakdown = useSelector(selectCategoryBreakdown);

  // We want to preserve the order: Transport, Accommodation, Food, Shopping, Activity, Other
  const categoriesList = [
    'All',
    BUDGET_CATEGORIES.TRANSPORT,
    BUDGET_CATEGORIES.ACCOMMODATION,
    BUDGET_CATEGORIES.FOOD,
    BUDGET_CATEGORIES.SHOPPING,
    BUDGET_CATEGORIES.ACTIVITY,
    BUDGET_CATEGORIES.OTHER,
  ];

  // Calculate total actual for the "All" pill
  const totalActual = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);

  return (
    <div className="space-y-3">
      <h3 className="text-[11px] font-black text-[#a08fa6] uppercase tracking-[0.28em]">Category Breakdown</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categoriesList.map((category) => {
          const isSelected = selectedCategory === category;
          const cost = category === 'All' ? totalActual : breakdown[category];
          
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`flex-none rounded-full border px-4 py-2.5 min-w-[110px] transition-all
                ${isSelected 
                  ? 'bg-[#ef11aa] border-[#ef11aa] text-white shadow-sm' 
                  : 'bg-[#f2eef2] border-[#e3dbe5] text-[#6f5d76] hover:border-[#d2bfd9]'
                }`}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.16em]">
                {category}
              </p>
              <p className={`text-xs font-black ${isSelected ? 'text-white' : 'text-[#b4a7ba]'}`}>{formatCurrency(cost)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
