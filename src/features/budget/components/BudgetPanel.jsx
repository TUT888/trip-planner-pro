import { useSelector } from 'react-redux';
import { selectCategoryBreakdown } from '../budgetSelectors';
import { BUDGET_CATEGORIES } from '../budgetConstants';
import { formatCurrency } from '../../../utils/formatUtils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { BudgetList } from './BudgetList';
import { Card, CardContent } from '@/components/ui/card';

function BudgetCategoryBreakdown({ selectedCategory, onSelectCategory }) {
  const breakdown = useSelector(selectCategoryBreakdown);

  const categoriesList = ["All", ...Object.values(BUDGET_CATEGORIES)];

  const totalActual = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);

  return (
    <div className="space-y-3">
      <h3 className="text-2xl leading-tight font-semibold">Category Breakdown</h3>
      <div className="flex flex-wrap gap-2 pb-2">
        {categoriesList.map((category) => {
          const isSelected = selectedCategory === category;
          const cost = category === 'All' ? totalActual : breakdown[category];
          
          return (
            <Button
              key={category}
              variant={isSelected ? 'default' : 'outline'}
              onClick={() => onSelectCategory(category)}
              className="h-auto min-w-32 justify-between gap-3 px-3 py-2"
            >
              <span className="truncate">{category}</span>
              <span className={`shrink-0 ${isSelected ? 'text-primary-foreground/90' : 'text-gray-600'}`}>{formatCurrency(cost)}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export function BudgetPanel({ canEdit = true, selectedTripId }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <Card>
      <CardContent>
        <BudgetCategoryBreakdown
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        <BudgetList selectedCategory={selectedCategory} canEdit={canEdit} selectedTripId={selectedTripId} />
      </CardContent>
    </Card>
  )
}
