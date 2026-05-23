import { useSelector } from 'react-redux';
import { selectCategoryBreakdown } from '../budgetSelectors';
import { BUDGET_CATEGORIES } from '../budgetConstants';
import { formatCurrency } from '../../../utils/formatUtils';
import { Button } from '@/components/ui/button';

export function BudgetCategoryBreakdown({ selectedCategory, onSelectCategory }) {
  const breakdown = useSelector(selectCategoryBreakdown);

  const categoriesList = [
    'All',
    BUDGET_CATEGORIES.TRANSPORT,
    BUDGET_CATEGORIES.ACCOMMODATION,
    BUDGET_CATEGORIES.FOOD,
    BUDGET_CATEGORIES.SHOPPING,
    BUDGET_CATEGORIES.ACTIVITY,
    BUDGET_CATEGORIES.OTHER,
  ];

  const totalActual = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);

  return (
    <div className="space-y-3">
      <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.22em]">Category Breakdown</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categoriesList.map((category) => {
          const isSelected = selectedCategory === category;
          const cost = category === 'All' ? totalActual : breakdown[category];
          
          return (
            <Button
              key={category}
              variant={isSelected ? 'default' : 'outline'}
              onClick={() => onSelectCategory(category)}
              className="h-auto min-w-[120px] flex-none px-4 py-2.5"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.16em]">
                {category}
              </p>
              <p className={`text-xs font-black ${isSelected ? 'text-primary-foreground/90' : 'text-gray-500'}`}>{formatCurrency(cost)}</p>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
