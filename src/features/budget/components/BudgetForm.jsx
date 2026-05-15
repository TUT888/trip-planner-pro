import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBudgetItem, updateBudgetItem } from '../budgetSlice';
import { BUDGET_CATEGORIES, BUDGET_STATUS } from '../budgetConstants';
import { selectBudgetTotals } from '../budgetSelectors';
import { X } from 'lucide-react';

export function BudgetForm({ itemToEdit, onClose }) {
  const dispatch = useDispatch();
  const totals = useSelector(selectBudgetTotals);
  
  const [formData, setFormData] = useState({
    name: '',
    category: BUDGET_CATEGORIES.TRANSPORT,
    estimatedCost: '',
    actualCost: '',
    status: BUDGET_STATUS.UNPAID
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name || '',
        category: itemToEdit.category || BUDGET_CATEGORIES.TRANSPORT,
        estimatedCost: itemToEdit.estimatedCost || '',
        actualCost: itemToEdit.actualCost || '',
        status: itemToEdit.status || BUDGET_STATUS.UNPAID
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      let nextState = { ...prev, [name]: value };

      if (name === 'actualCost') {
        const hasActual = value !== '' && !isNaN(value);
        nextState.status = hasActual ? BUDGET_STATUS.PAID : BUDGET_STATUS.UNPAID;
      }

      if (name === 'status' && value === BUDGET_STATUS.PAID && (formData.actualCost === '' || isNaN(formData.actualCost))) {
        return { ...prev, status: BUDGET_STATUS.UNPAID };
      }

      return nextState;
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Item name is required';
    
    if (formData.estimatedCost === '' || isNaN(formData.estimatedCost)) {
      newErrors.estimatedCost = 'Estimated cost is required';
    } else if (Number(formData.estimatedCost) <= 0) {
      newErrors.estimatedCost = 'Estimated cost must be greater than 0';
    }

    if (formData.actualCost !== '') {
      if (isNaN(formData.actualCost)) {
        newErrors.actualCost = 'Actual cost must be a number';
      } else if (Number(formData.actualCost) <= 0) {
        newErrors.actualCost = 'Actual cost must be greater than 0';
      }
    }

    if (formData.status === BUDGET_STATUS.PAID && (formData.actualCost === '' || isNaN(formData.actualCost))) {
      newErrors.actualCost = 'Actual cost is required if status is Paid';
    }

    const estimated = Number(formData.estimatedCost);
    const remaining = totals.remainingBudget;
    if (!itemToEdit && !isNaN(estimated) && estimated >= remaining) {
      newErrors.estimatedCost = `Estimated cost must be less than remaining budget ($${remaining.toFixed(2)}).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        id: itemToEdit ? itemToEdit.id : Date.now(), // Generate ID
        name: formData.name.trim(),
        category: formData.category,
        estimatedCost: Number(formData.estimatedCost),
        actualCost: formData.actualCost !== '' ? Number(formData.actualCost) : '',
        status: formData.status
      };

      if (itemToEdit) {
        dispatch(updateBudgetItem(payload));
      } else {
        dispatch(addBudgetItem(payload));
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 bg-pink-400 text-white">
          <h2 className="text-xl font-bold">{itemToEdit ? 'Edit Budget Item' : 'Add Budget Item'}</h2>
          <button onClick={onClose} className="hover:bg-pink-500 rounded-full p-1 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Item Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className={`w-full p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="e.g. Paris Airfare"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              {Object.values(BUDGET_CATEGORIES).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Estimated Cost ($)</label>
              <input 
                type="number" 
                step="0.01"
                name="estimatedCost" 
                value={formData.estimatedCost} 
                onChange={handleChange} 
                className={`w-full p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 ${errors.estimatedCost ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.estimatedCost && <p className="text-red-500 text-xs mt-1">{errors.estimatedCost}</p>}
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Actual Cost ($)</label>
              <input 
                type="number" 
                step="0.01"
                name="actualCost" 
                value={formData.actualCost} 
                onChange={handleChange} 
                className={`w-full p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 ${errors.actualCost ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.actualCost && <p className="text-red-500 text-xs mt-1">{errors.actualCost}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value={BUDGET_STATUS.UNPAID}>Unpaid</option>
              <option value={BUDGET_STATUS.PAID} disabled={formData.actualCost === '' || isNaN(formData.actualCost)}>
                Paid
              </option>
            </select>
            {formData.actualCost === '' && formData.status === BUDGET_STATUS.PAID && (
              <p className="text-red-500 text-xs mt-1">Status cannot be Paid without actual cost.</p>
            )}
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 font-medium transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-pink-500 text-white rounded-full hover:bg-pink-600 font-medium transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
