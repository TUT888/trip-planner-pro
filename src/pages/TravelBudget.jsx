import { useDispatch } from 'react-redux';
import { BudgetTracking } from '../features/budget/components/BudgetTracking';
import { BudgetOverview } from '../features/budget/components/BudgetOverview';
import { BudgetCategoryBreakdown } from '../features/budget/components/BudgetCategoryBreakdown';
import { BudgetList } from '../features/budget/components/BudgetList';
import { resetBudget } from '../features/budget/budgetSlice';

export function TravelBudget() {
  const dispatch = useDispatch();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all budget data?")) {
      dispatch(resetBudget());
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto p-6 space-y-6 w-full bg-[#fef7ff] text-[#2e1a28] rounded-xl shadow-sm min-h-[calc(100vh-100px)]">
      {/* Mobile Title (visible on small screens) */}
      <div className="flex justify-between items-center lg:hidden mb-2">
        <h2 className="font-black text-2xl text-[#2e1a28]">Budget Control Center</h2>
        <button 
          onClick={handleReset}
          className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-red-200 transition"
        >
          Reset Data
        </button>
      </div>

      {/* Desktop Title & Button */}
      <div className="hidden lg:flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
            <span className="hover:text-pink-500 cursor-pointer transition-colors">My Trips</span>
            <span className="text-[10px]">&gt;</span>
            <span className="text-pink-500">Europe Summer 2024</span>
          </div>
          <h2 className="font-black text-2xl text-[#2e1a28]">Budget Control Center</h2>
        </div>
        <button 
          onClick={handleReset}
          className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-red-200 transition"
        >
          Reset Data
        </button>
      </div>
      
      <BudgetTracking />
      <BudgetOverview />
      <BudgetCategoryBreakdown />
      <BudgetList />
    </div>
  )
}