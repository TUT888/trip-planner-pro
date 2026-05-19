import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AlertTriangle, Check, Pencil } from 'lucide-react';
import { setInitialBudget } from '../budgetSlice';
import { selectBudgetTotals, selectInitialBudget, selectBudgetAlerts } from '../budgetSelectors';

const BudgetTracking = () => {
  const dispatch = useDispatch();
  const totals = useSelector(selectBudgetTotals);
  const initialBudget = useSelector(selectInitialBudget);
  const alerts = useSelector(selectBudgetAlerts);
  const [isEditing, setIsEditing] = useState(false);
  const [newBalance, setNewBalance] = useState(initialBudget);

  const handleSaveClick = () => {
    dispatch(setInitialBudget(Number(newBalance) || 0));
    setIsEditing(false);
  };

  const progressPercentage = (initialBudget > 0 ? ((totals.remainingBudget / initialBudget) * 100) : 0).toFixed(1);

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] bg-gradient-to-r from-[#f7e9f5] to-[#eae8f6] px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <p className="max-w-xl text-lg text-[#7e6d85]">
              Monitor your liquidity status and track real-time expenses for your upcoming European adventure.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="pr-6 lg:border-r lg:border-[#dcc9de]">
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#9d86a1]">Starting Balance</p>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <input
                      type="number"
                      value={newBalance}
                      onChange={(e) => setNewBalance(e.target.value)}
                      className="w-44 rounded-md border border-[#d5c0d9] bg-white px-2 py-1 text-xl font-black text-[#2d1931]"
                    />
                  ) : (
                    <span className="text-[42px] font-black tracking-tight text-[#2d1931]">${initialBudget.toFixed(2)}</span>
                  )}
                  <button
                    onClick={isEditing ? handleSaveClick : () => setIsEditing(true)}
                    className="rounded-full p-1 text-[#cc91cf] hover:bg-white/70"
                    aria-label={isEditing ? 'Save starting balance' : 'Edit starting balance'}
                  >
                    {isEditing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#9d86a1]">Remaining Wallet</p>
                <p className="text-[42px] font-black tracking-tight text-[#f013a9]">${totals.remainingBudget.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-end">
            <div className="relative h-52 w-[320px]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 100">
                <path d="M 20 90 A 80 80 0 0 1 180 90" fill="none" stroke="rgba(130,95,150,0.12)" strokeLinecap="round" strokeWidth="14"></path>
                <path
                  d="M 20 90 A 80 80 0 0 1 180 90"
                  fill="none"
                  stroke="url(#gauge_gradient)"
                  strokeLinecap="round"
                  strokeWidth="14"
                  style={{ strokeDasharray: 251, strokeDashoffset: 251 - (251 * progressPercentage) / 100 }}
                ></path>
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="gauge_gradient" x1="20" x2="180" y1="90" y2="90">
                    <stop stopColor="#ec10ad"></stop>
                    <stop offset="1" stopColor="#6f39cb"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
                <div className="text-[56px] leading-none font-black text-[#29162f]">{Math.round(Number(progressPercentage))}%</div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#9d86a1]">Funds Remaining</div>
              </div>
            </div>
            <div className="flex w-full justify-between text-[9px] font-black uppercase tracking-[0.12em] text-[#9f90a5]">
              <span>Safe Zone</span>
              <span>Critical</span>
            </div>
          </div>
        </div>
      </div>

      {(alerts.warning || alerts.critical) && (
        <div
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 ${
            alerts.critical
              ? 'border-[#f3b8c6] bg-[#fff1f4] text-[#9f2245]'
              : 'border-[#f3dfb1] bg-[#fff8e8] text-[#8b5b00]'
          }`}
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-sm font-semibold">{alerts.message}</p>
        </div>
      )}
    </div>
  );
};

export default BudgetTracking;
