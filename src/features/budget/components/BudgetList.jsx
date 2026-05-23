import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBudgetItems, selectBudgetTotals } from '../budgetSelectors';
import { addBudgetItem, deleteBudgetItem, updateBudgetItem } from '../budgetThunks';
import { selectSelectedTripId } from '@/features/trip/tripSelector';
import { BudgetItem } from './BudgetItem';
import { BudgetForm } from './BudgetForm';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DeleteConfirmationModal } from '@/components/modals/DeleteConfirmationModal';

export function BudgetList({ selectedCategory }) {
  const allItems = useSelector(selectBudgetItems);
  const totals = useSelector(selectBudgetTotals);
  const selectedTripId = useSelector(selectSelectedTripId);
  const dispatch = useDispatch();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const filteredByCategory = selectedCategory && selectedCategory !== 'All'
    ? allItems.filter(item => item.category === selectedCategory)
    : allItems;
  const items = filteredByCategory;

  const handleOpenForm = (item = null) => {
    setItemToEdit(item);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setItemToEdit(null);
  };

  const handleOpenDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteBudgetItem(itemToDelete.id));
      handleCloseDelete();
    }
  };

  const handleFormSubmit = (formValues) => {
    if (itemToEdit) {
      dispatch(updateBudgetItem({
        itemId: itemToEdit.id,
        changes: formValues,
      }));
      return;
    }

    dispatch(addBudgetItem({
      tripId: selectedTripId,
      item: formValues,
    }));
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-semibold text-gray-800">Budget Details</h3>
          <p className="text-sm text-gray-500">
            Manage spending plan {selectedCategory && selectedCategory !== 'All' ? `for ${selectedCategory.toLowerCase()}` : 'for entire trip'}
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => handleOpenForm()}
          disabled={!selectedTripId}
          className="bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <Table className="w-full min-w-190 table-fixed border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-500 text-center">Item Name</TableHead>
            <TableHead className="text-gray-500 text-center">Category</TableHead>
            <TableHead className="text-gray-500 text-center">Estimated</TableHead>
            <TableHead className="text-gray-500 text-center">Actual</TableHead>
            <TableHead className="text-gray-500 text-center">Status</TableHead>
            <TableHead className="text-gray-500 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-gray-500">
                No budget items found. {selectedCategory !== 'All' ? 'Try selecting a different category.' : 'Add one to get started!'}
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <BudgetItem
                key={item.id}
                item={item}
                onEdit={handleOpenForm}
                onDelete={handleOpenDelete}
              />
            ))
          )}
        </TableBody>
      </Table>

      {isFormOpen && (
        <BudgetForm
          isOpen={isFormOpen}
          initialValues={itemToEdit}
          remainingBudget={totals.remainingBudget}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal 
          isOpen={isDeleteModalOpen && Boolean(itemToDelete)}
          title="Delete Budget Item"
          onClose={handleCloseDelete}
          onConfirm={handleConfirmDelete}
        >
          Are you sure you want to delete{' '}
          <span className="font-semibold text-gray-800">{itemToDelete?.name}</span>? 
          This action cannot be undone.
        </DeleteConfirmationModal>
      )}
    </div>
  );
}
