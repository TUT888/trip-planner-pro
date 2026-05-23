import { useDispatch, useSelector } from 'react-redux';
import { PageTitle } from "@/components/PageTitle";
import { resetBudget } from '../budgetThunks';
import { selectSelectedTripId } from '@/features/trip/tripSelector';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { DeleteConfirmationModal } from '@/components/modals/DeleteConfirmationModal';
import { useState } from 'react';

export function BudgetHeader() {
  const dispatch = useDispatch();
  const selectedTripId = useSelector(selectSelectedTripId);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleConfirmReset = () => {
    dispatch(resetBudget(selectedTripId));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-row justify-between items-center">
      {/* Title */}
      <PageTitle
        title="Budget Control Center"
        subtitle="Monitor your liquidity status and track real-time expenses for your upcoming adventure"
      />

      {/* Clear all */}
      <Button
        variant="destructive"
        size="default"
        onClick={() => setIsDeleteModalOpen(true)}
        disabled={!selectedTripId}
      >
        <RotateCcw aria-hidden="true" />
        Reset Planning Data
      </Button>

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmReset}
        >
          <p>
            Are you sure you want to reset 
            <span className="font-bold text-gray-900"> all planned budget data? </span>
            This action cannot be undone.
          </p>
        </DeleteConfirmationModal>
      )}
    </div>
  )
}
