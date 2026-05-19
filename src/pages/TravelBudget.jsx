import { useState } from 'react';
import { useDispatch } from 'react-redux';
import BudgetTracking from '../features/budget/components/BudgetTracking';
import { BudgetOverview } from '../features/budget/components/BudgetOverview';
import { BudgetCategoryBreakdown } from '../features/budget/components/BudgetCategoryBreakdown';
import { BudgetList } from '../features/budget/components/BudgetList';
import { resetBudget } from '../features/budget/budgetSlice';

export function TravelBudget() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all budget data?")) {
      dispatch(resetBudget());
      setSelectedCategory('All');
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] rounded-[28px] border border-[#e8d7ea] bg-[#f6eef8] p-6 text-[#311d34] shadow-[0_16px_40px_rgba(130,71,132,0.08)]">
      <div className="flex justify-between items-center lg:hidden mb-2">
        <h2 className="font-black text-2xl text-[#2e1a28]">Budget Control Center</h2>
        <button 
          onClick={handleReset}
          className="rounded-full border border-[#e7d7ea] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6f6074] hover:border-[#d4bfd8]"
        >
          Reset Data
        </button>
      </div>

      <div className="hidden lg:flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#99839d] uppercase tracking-[0.28em] mb-1">
            <span className="cursor-pointer transition-colors">My Trips</span>
            <span className="text-[10px]">&gt;</span>
            <span className="text-[#ef1ca7]">Europe Summer 2024</span>
          </div>
          <h2 className="font-black text-6xl leading-[1.05] text-[#2b1830]">Budget Control Center</h2>
        </div>
        <button 
          onClick={handleReset}
          className="rounded-full border border-[#e7d7ea] bg-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#6f6074] hover:border-[#d4bfd8]"
        >
          Reset Data
        </button>
      </div>
      
      <BudgetTracking />
      <BudgetOverview />
      <BudgetCategoryBreakdown 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      <BudgetList selectedCategory={selectedCategory} />
    </div>
  )
}
