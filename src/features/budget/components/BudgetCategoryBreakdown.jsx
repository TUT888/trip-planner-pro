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
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category Breakdown</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {categoriesList.map((category) => {
          const isSelected = selectedCategory === category;
          const cost = category === 'All' ? totalActual : breakdown[category];
          
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`flex-none text-left px-4 py-3 rounded-lg border min-w-[140px] transition-all
                ${isSelected 
                  ? 'bg-purple-100 border-purple-300 shadow-sm ring-1 ring-purple-300' 
                  : 'bg-gray-50 border-gray-200 hover:border-pink-300'
                }`}
            >
              <p className={`text-[10px] font-bold uppercase ${isSelected ? 'text-purple-800' : 'text-purple-700'}`}>
                {category}
              </p>
              <p className="text-lg font-black text-gray-900">{formatCurrency(cost)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
