import { useSelector } from 'react-redux';
import { selectBudgetTotals } from '../budgetSelectors';
import { formatCurrency } from '../../../utils/formatUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function BudgetOverview() {
  const totals = useSelector(selectBudgetTotals);

  const totalEstimated = Number(totals?.totalEstimated) || 0;
  const totalActual = Number(totals?.totalActual) || 0;
  const diff = Number(totals?.diff) || 0;
  const diffPercentage = Number(totals?.diffPercentage) || 0;
  const isUnder = Number(totals?.diff) > 0;

  return (
    <Card className="h-full">
      <CardContent className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-lg leading-tight text-gray-600 uppercase font-semibold">Total Estimated</p>
          <p className="text-2xl font-black tracking-tight text-gray-600">
            {formatCurrency(totalEstimated)}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-lg leading-tight text-gray-600 uppercase font-semibold">Total Actual</p>
          <p className="text-2xl font-black tracking-tight text-primary">
            {formatCurrency(totalActual)}
          </p>
        </div>

        <div className="flex flex-col justify-center sm:col-span-2 border-t-2">
          <div className="mb-3 flex flex-col items-center gap-2 mx-auto">
            <p className="text-lg leading-tight text-gray-600 uppercase font-semibold">Est. vs Actual</p>
            {isUnder ? (
              <Badge variant="secondary">On Track</Badge>
            ) : (
              <Badge variant="destructive">Over</Badge>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-sm tracking-tight text-gray-600">Difference</p>
              <p className="text-2xl font-black tracking-tight text-primary">
                {formatCurrency(diff)}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-sm tracking-tight text-gray-600">Status</p>
              <p className="text-2xl font-black tracking-tight text-gray-600">
                {diffPercentage.toFixed(1)}% {isUnder ? 'Under' : 'Over'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
