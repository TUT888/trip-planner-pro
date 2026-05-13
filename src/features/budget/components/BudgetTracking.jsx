import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBudgetTotals, selectInitialBudget, selectBudgetAlerts } from '../budgetSelectors';
import { setInitialBudget } from '../budgetSlice';
import { TriangleAlert, Edit2, Check } from 'lucide-react';

export function BudgetTracking() {
  const dispatch = useDispatch();
  const totals = useSelector(selectBudgetTotals);
  const initialBudget = useSelector(selectInitialBudget);
  const alerts = useSelector(selectBudgetAlerts);

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(initialBudget);

  const percentage = initialBudget > 0 ? Math.min(Math.round((totals.totalActual / initialBudget) * 100), 100) : 0;
  const rawPercentage = initialBudget > 0 ? (totals.totalActual / initialBudget) * 100 : 0;

  const handleSave = () => {
    const val = Number(editValue);
    if (!isNaN(val) && val >= 0) {
      dispatch(setInitialBudget(val));
    } else {
      setEditValue(initialBudget);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditValue(initialBudget);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-[#ffecd6] border border-[#eab308] p-6 shadow-sm mb-6 mt-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-900">Budget Tracking</h2>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <span>{Math.round(totals.totalActual)} /</span>
            {isEditing ? (
              <div className="flex items-center gap-1">
                <input 
                  type="number" 
                  value={editValue} 
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-24 px-2 py-1 text-base border border-orange-300 rounded focus:outline-none"
                  autoFocus
                />
                <button onClick={handleSave} className="text-green-600 hover:text-green-700">
                  <Check className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditing(true)}>
                <span>{initialBudget}</span>
                <Edit2 className="w-4 h-4 text-orange-500 opacity-50 group-hover:opacity-100" />
              </div>
            )}
          </div>
          
          <div className="text-5xl font-black text-gray-900 leading-none">
            {Math.round(rawPercentage)} %
          </div>
        </div>
      </div>

      <div className="w-[80%] h-6 bg-white border border-gray-800 rounded-sm overflow-hidden mb-4 relative">
        <div 
          className="h-full bg-gray-200 border-r border-gray-800 transition-all duration-500" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {alerts.warning && !alerts.critical && (
        <div className="flex items-center gap-2 text-[#d97706]">
          <TriangleAlert className="w-5 h-5" />
          <p className="font-medium">{alerts.message}</p>
        </div>
      )}
      
      {alerts.critical && (
        <div className="flex items-center gap-2 text-red-600">
          <TriangleAlert className="w-5 h-5" />
          <p className="font-bold">{alerts.message}</p>
        </div>
      )}
    </div>
  );
}
