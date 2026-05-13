import { createSelector } from '@reduxjs/toolkit';
import { BUDGET_CATEGORIES } from './budgetConstants';

export const selectBudgetItems = (state) => state.budget.items;
export const selectInitialBudget = (state) => Number(state.budget.initialBudget) || 0;

export const selectBudgetTotals = createSelector(
  [selectBudgetItems, selectInitialBudget],
  (items, initialBudget) => {
    let totalEstimated = 0;
    let totalActual = 0;

    items.forEach(item => {
      totalEstimated += Number(item.estimatedCost) || 0;
      totalActual += Number(item.actualCost) || 0;
    });

    const diff = totalActual - totalEstimated;
    const diffPercentage = totalEstimated > 0 ? (diff / totalEstimated) * 100 : 0;
    
    // Remaining Budget is against the Initial Budget
    const remainingBudget = initialBudget - totalActual;

    return {
      totalEstimated,
      totalActual,
      remainingBudget,
      diff,
      diffPercentage,
      isOverBudget: diff > 0
    };
  }
);

export const selectCategoryBreakdown = createSelector(
  [selectBudgetItems],
  (items) => {
    const breakdown = {
      [BUDGET_CATEGORIES.TRANSPORT]: 0,
      [BUDGET_CATEGORIES.ACCOMMODATION]: 0,
      [BUDGET_CATEGORIES.FOOD]: 0,
      [BUDGET_CATEGORIES.SHOPPING]: 0,
      [BUDGET_CATEGORIES.ACTIVITY]: 0,
      [BUDGET_CATEGORIES.OTHER]: 0,
    };

    items.forEach(item => {
      if (item.category && breakdown[item.category] !== undefined) {
        breakdown[item.category] += Number(item.actualCost) || 0;
      }
    });

    return breakdown;
  }
);

export const selectBudgetAlerts = createSelector(
  [selectBudgetTotals, selectInitialBudget],
  ({ totalActual }, initialBudget) => {
    if (initialBudget === 0) return { warning: false, critical: false, message: null };

    const percentage = (totalActual / initialBudget) * 100;
    const diff = totalActual - initialBudget;

    if (percentage >= 100) {
      return {
        warning: false,
        critical: true,
        message: `Your actual spending has exceeded your total estimated budget by $${diff.toFixed(2)}.`
      };
    }

    if (percentage >= 80) {
      return {
        warning: true,
        critical: false,
        message: `Spending has reached ${percentage.toFixed(0)}% of the given budget!`
      };
    }

    return { warning: false, critical: false, message: null };
  }
);
