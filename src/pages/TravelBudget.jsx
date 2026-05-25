import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BudgetTracking } from '../features/budget/components/BudgetTracking';
import { BudgetOverview } from '../features/budget/components/BudgetOverview';
import { BudgetHeader } from '@/features/budget/components/BudgetHeader';
import { BudgetPanel } from '@/features/budget/components/BudgetPanel';
import { fetchBudgetItems } from '@/features/budget/budgetThunks';
import { selectIsSelectedTripOwner, selectSelectedTripId } from '@/features/trip/tripSelector';

export function TravelBudget() {
  const dispatch = useDispatch();
  const selectedTripId = useSelector(selectSelectedTripId);
  const canEdit = useSelector(selectIsSelectedTripOwner);

  useEffect(() => {
    if (selectedTripId) {
      dispatch(fetchBudgetItems(selectedTripId));
    }
  }, [dispatch, selectedTripId]);

  return (
    <div className="flex flex-col h-full gap-3">
      <BudgetHeader canEdit={canEdit} selectedTripId={selectedTripId} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
        <div className="h-full"><BudgetTracking canEdit={canEdit} selectedTripId={selectedTripId} /></div>
        <div className="h-full"><BudgetOverview /></div>
      </div>
      <BudgetPanel canEdit={canEdit} selectedTripId={selectedTripId} />
    </div>
  )
}
