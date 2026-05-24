import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AlertTriangle, Check, Pencil } from 'lucide-react';
import { setInitialBudget } from '../budgetThunks';
import { selectBudgetTotals, selectInitialBudget, selectBudgetAlerts } from '../budgetSelectors';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { formatCurrency } from '@/utils/formatUtils';

export function BudgetTracking({ canEdit = true, selectedTripId }) {
  const dispatch = useDispatch();
  const totals = useSelector(selectBudgetTotals);
  const initialBudget = useSelector(selectInitialBudget);
  const alerts = useSelector(selectBudgetAlerts);

  const [isEditing, setIsEditing] = useState(false);
  const [newBalance, setNewBalance] = useState(initialBudget);

  const handleSaveClick = () => {
    dispatch(setInitialBudget({
      tripId: selectedTripId,
      budget: Number(newBalance) || 0,
    }));
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setNewBalance(initialBudget);
    setIsEditing(true);
  };

  const progressPercentage = (initialBudget > 0 ? ((totals.remainingBudget / initialBudget) * 100) : 0).toFixed(1);

  return (
    <div className="flex h-full flex-col gap-3">
      {(alerts.warning || alerts.critical) && (
        <Alert
          className={
            alerts.critical
              ? 'border-[#f3b8c6] bg-[#fff1f4] text-[#9f2245]'
              : 'border-[#f3dfb1] bg-[#fff8e8] text-[#8b5b00]'
          }
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <AlertTitle>{alerts.message}</AlertTitle>
        </Alert>
      )}

      <Card className="flex-1">
        <CardContent className="flex h-full flex-row items-center">
          {/* Data */}
          <div className="mx-auto w-full sm:w-2/5 md:w-3/5">
            <div className="flex flex-col justify-between gap-10">
              {/* Starting */}
              <div>
                <p className="text-lg leading-tight text-gray-600 uppercase font-semibold">Starting Balance</p>
                <div className="flex items-center gap-2">
                  {/* Edit field */}
                  {isEditing ? (
                    <Input
                      type="number"
                      value={newBalance}
                      onChange={(e) => setNewBalance(e.target.value)}
                      className="text-2xl"
                    />
                  ) : (
                    <span className="text-2xl font-black tracking-tight text-gray-600">{formatCurrency(initialBudget.toFixed(2))}</span>
                  )}

                  {/* Edit button */}
                  {canEdit && (
                    <Button
                      variant="ghost"
                      onClick={isEditing ? handleSaveClick : handleEditClick}
                      disabled={!selectedTripId || !canEdit}
                      className="rounded-full p-1 text-primary hover:bg-primary/20"
                      aria-label={isEditing ? 'Save starting balance' : 'Edit starting balance'}
                    >
                      {isEditing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Remaining */}
              <div>
                <p className="text-lg leading-tight text-gray-600 uppercase font-semibold">Remaining Wallet</p>
                <p className="text-2xl font-black tracking-tight text-primary">{formatCurrency(totals.remainingBudget.toFixed(2))}</p>
              </div>
            </div>
          </div>
          
          {/* Monitor */}
          <div className="flex flex-col items-center">
            <div className="relative h-52 w-[280px]">
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
                    <stop stopColor="#9ca3af"></stop>
                    <stop offset="1" stopColor="#00786f"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
                <div className="text-4xl leading-none font-black text-[#29162f]">{Math.round(Number(progressPercentage))}%</div>
                <div className="mt-1 text-xs font-black uppercase text-gray-600">Funds Remaining</div>
              </div>
            </div>
            <div className="flex w-full justify-between text-xs font-black uppercase text-gray-600">
              <span>Critical</span>
              <span>Safe Zone</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
