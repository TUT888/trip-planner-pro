import { useSelector } from 'react-redux';
import { selectBudgetTotals } from '../budgetSelectors';
import { formatCurrency } from '../../../utils/formatUtils';

export function BudgetOverview() {
  const totals = useSelector(selectBudgetTotals);
  const totalEstimated = Number(totals?.totalEstimated) || 0;
  const totalActual = Number(totals?.totalActual) || 0;
  const diffPercentage = Number(totals?.diffPercentage) || 0;
  const isUnder = Number(totals?.diff) > 0;

  return (
    <div className="rounded-full border border-[#e7d9e8] bg-[#f8f4f7] px-10 py-5">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="border-b border-[#eaddea] pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a493a9]">Total Estimated</p>
          <p className="text-[36px] leading-none font-black text-[#5f4a68]">{formatCurrency(totalEstimated)}</p>
        </div>

        <div className="border-b border-[#eaddea] pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a493a9]">Total Actual</p>
          <p className="text-[36px] leading-none font-black text-[#ef1ca7]">{formatCurrency(totalActual)}</p>
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a493a9]">Est. VS Actual</p>
            <span className="rounded-full bg-[#f9d7f2] px-2 py-0.5 text-[8px] font-black uppercase text-[#df0ea3]">
              {isUnder ? 'On Track' : 'Over'}
            </span>
          </div>
          <p className="text-[36px] leading-none font-black text-[#2c1a30]">
            {diffPercentage.toFixed(1)}% {isUnder ? 'Under' : 'Over'}
          </p>
        </div>
      </div>
    </div>
  );
}
