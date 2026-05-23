import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBudgetItems, selectBudgetTotals } from '../budgetSelectors';
import { addBudgetItem, deleteBudgetItem, updateBudgetItem } from '../budgetSlice';
import { BudgetItem } from './BudgetItem';
import { BudgetForm } from './BudgetForm';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function BudgetList({ selectedCategory }) {
  const allItems = useSelector(selectBudgetItems);
  const totals = useSelector(selectBudgetTotals);
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
      dispatch(updateBudgetItem({ ...formValues, id: itemToEdit.id }));
      return;
    }

    dispatch(addBudgetItem({ ...formValues, id: Date.now() }));
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-semibold text-gray-800">Budget Details</h1>
          <p className="text-sm text-gray-500">
            Manage your spending plan {selectedCategory && selectedCategory !== 'All' ? `for ${selectedCategory}` : ''}
          </p>
        </div>

        <Button onClick={() => handleOpenForm()}>
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <Card className="w-full">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Estimated</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
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

        </CardContent>
      </Card>

      {isFormOpen && (
        <BudgetForm
          isOpen={isFormOpen}
          initialValues={itemToEdit}
          remainingBudget={totals.remainingBudget}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen && Boolean(itemToDelete)}
        itemName={itemToDelete?.name}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDelete}
      />
    </div>
  );
}
