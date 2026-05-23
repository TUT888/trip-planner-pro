import { createSelector } from '@reduxjs/toolkit';
import { BUDGET_CATEGORIES, BUDGET_STATUS } from './budgetConstants';

export const selectBudgetItems = (state) => state.budget.items;
export const selectInitialBudget = (state) => Number(state.budget.initialBudget) || 0;

export const selectBudgetTotals = createSelector(
  [selectBudgetItems, selectInitialBudget],
  (items, initialBudget) => {
    let totalEstimated = 0;
    let totalActual = 0;
    let totalPaidActual = 0;

    items.forEach(item => {
      const estimatedCost = Number(item.estimatedCost) || 0;
      const actualCost = Number(item.actualCost) || 0;
      totalEstimated += estimatedCost;
      totalActual += actualCost;
      if (item.status === BUDGET_STATUS.PAID) {
        totalPaidActual += actualCost;
      }
    });

    const diff = totalEstimated - totalActual;
    const diffPercentage = totalEstimated > 0 ? (diff / totalEstimated) * 100 : 0;
    const remainingBudget = initialBudget - totalPaidActual;
    const usagePercentage = initialBudget > 0 ? (totalPaidActual / initialBudget) * 100 : 0;

    return {
      totalEstimated,
      totalActual,
      totalPaidActual,
      remainingBudget,
      usagePercentage,
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
  ({ totalPaidActual }, initialBudget) => {
    if (initialBudget === 0) return { warning: false, critical: false, message: null };

    const percentage = (totalPaidActual / initialBudget) * 100;
    const diff = totalPaidActual - initialBudget;

    if (percentage >= 100) {
      return {
        warning: false,
        critical: true,
        message: `Your actual spending has exceeded your total estimated budget by $${Math.abs(diff).toFixed(2)}.`
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
