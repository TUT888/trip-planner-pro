import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBudgetTotals, selectInitialBudget, selectBudgetAlerts } from '../budgetSelectors';
import { setInitialBudget } from '../budgetSlice';
import { TriangleAlert, AlertCircle, Edit2, Check } from 'lucide-react';

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
    <div className="space-y-4 mb-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all flex items-center justify-between gap-8">
        
        {/* Left Column: Title, Numbers, Progress Bar */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black text-gray-900">Budget Tracking</h2>
            
            <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <span>{Math.round(totals.totalActual)} /</span>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input 
                    type="number" 
                    value={editValue} 
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-24 px-2 py-1 text-base border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-200"
                    autoFocus
                  />
                  <button onClick={handleSave} className="text-green-600 hover:text-green-700 bg-green-50 p-1.5 rounded-full">
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditing(true)}>
                  <span>{initialBudget}</span>
                  <Edit2 className="w-4 h-4 text-gray-400 opacity-50 group-hover:opacity-100 group-hover:text-pink-500 transition-colors" />
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden relative">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${percentage >= 100 ? 'bg-red-500' : percentage >= 80 ? 'bg-yellow-400' : 'bg-pink-500'}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Right Column: Large Percentage */}
        <div className="text-6xl md:text-7xl font-black text-pink-500 leading-none flex-shrink-0">
          {Math.round(rawPercentage)}<span className="text-4xl md:text-5xl ml-1">%</span>
        </div>
      </div>

      {/* Alerts */}
      {alerts.critical && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg flex items-center gap-4 border border-red-200 shadow-sm">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <div className="flex-1">
            <p className="font-bold text-sm">Critical Budget Alert!</p>
            <p className="text-xs opacity-90">{alerts.message}</p>
          </div>
        </div>
      )}
      
      {!alerts.critical && alerts.warning && (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg flex items-center gap-4 border border-yellow-200 shadow-sm">
          <TriangleAlert className="w-6 h-6 text-yellow-500" />
          <div className="flex-1">
            <p className="font-bold text-sm">Approaching Limit</p>
            <p className="text-xs opacity-90">{alerts.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
