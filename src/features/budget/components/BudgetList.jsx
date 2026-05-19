import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBudgetItems, selectBudgetTotals } from '../budgetSelectors';
import { deleteBudgetItem } from '../budgetSlice';
import { BudgetItem } from './BudgetItem';
import { formatCurrency } from '../../../utils/formatUtils';
import { BudgetForm } from './BudgetForm';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { Plus } from 'lucide-react';

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

  return (
    <div className="mt-8">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="font-black text-[38px] text-[#2d1a31]">
          Budget Details {selectedCategory && selectedCategory !== 'All' && <span className="text-pink-500 font-medium">({selectedCategory})</span>}
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleOpenForm()}
            className="inline-flex items-center gap-2 rounded-full bg-[#ef11aa] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-[#eadfec] bg-[#f8f3f8]">
        <div className="grid grid-cols-12 gap-3 border-b border-[#e8dbe9] px-8 py-6 text-[10px] font-black uppercase tracking-[0.24em] text-[#ac9bb1]">
          <div className="col-span-4 text-left">Item Name</div>
          <div className="col-span-2 text-left">Category</div>
          <div className="col-span-2 text-left">Estimated</div>
          <div className="col-span-2 text-left">Actual</div>
          <div className="col-span-1 text-left">Status</div>
          <div className="col-span-1 text-left">Actions</div>
        </div>

        <div className="divide-y divide-[#ece0ee]">
          {items.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <p>No budget items found. {selectedCategory !== 'All' ? 'Try selecting a different category.' : 'Add one to get started!'}</p>
            </div>
          ) : (
            items.map(item => (
              <BudgetItem 
                key={item.id} 
                item={item} 
                onEdit={handleOpenForm} 
                onDelete={handleOpenDelete} 
              />
            ))
          )}
        </div>

        <div className="grid grid-cols-12 gap-3 border-t border-[#e8dbe9] bg-[#f5edf5] px-8 py-5 font-black">
          <div className="col-span-8 text-sm uppercase tracking-wider text-[#7f6a87]">Total Summary</div>
          <div className="col-span-2 text-[#7f6a87]">{formatCurrency(totals.totalEstimated)}</div>
          <div className="col-span-2 text-[#ef11aa]">{formatCurrency(totals.totalActual)}</div>
        </div>
      </div>

      {isFormOpen && (
        <BudgetForm 
          itemToEdit={itemToEdit} 
          onClose={handleCloseForm} 
        />
      )}

      {isDeleteModalOpen && itemToDelete && (
        <ConfirmDeleteModal 
          itemName={itemToDelete.name} 
          onConfirm={handleConfirmDelete} 
          onClose={handleCloseDelete} 
        />
      )}
    </div>
  );
}
