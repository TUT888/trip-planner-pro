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

  const items = selectedCategory && selectedCategory !== 'All' 
    ? allItems.filter(item => item.category === selectedCategory)
    : allItems;

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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg mt-6">
      {/* Table Actions Header */}
      <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
        <h3 className="font-bold text-lg text-gray-900">
          Budget Details {selectedCategory && selectedCategory !== 'All' && <span className="text-pink-500 font-medium">({selectedCategory})</span>}
        </h3>
        <button 
          onClick={() => handleOpenForm()}
          className="flex items-center gap-2 bg-pink-500 text-white px-5 py-2.5 rounded-full hover:bg-pink-600 transition font-bold text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 py-5 px-8 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
        <div className="col-span-2 text-left">Item Name</div>
        <div className="col-span-1 text-center">Category</div>
        <div className="col-span-1 text-center">Estimated</div>
        <div className="col-span-1 text-center">Actual</div>
        <div className="col-span-1 text-center">Status & Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
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

      {/* Table Footer */}
      <div className="grid grid-cols-6 gap-4 py-8 px-8 bg-gray-50 border-t border-gray-200 font-black items-center">
        <div className="col-span-3 text-lg text-gray-900 uppercase tracking-wider">
          TOTAL SUMMARY
        </div>
        <div className="col-span-1 text-center text-lg text-gray-900">
          {formatCurrency(totals.totalEstimated)}
        </div>
        <div className="col-span-1 text-3xl text-pink-500 text-center">
          {formatCurrency(totals.totalActual)}
        </div>
        <div className="col-span-1"></div>
      </div>

      {/* Modals */}
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
