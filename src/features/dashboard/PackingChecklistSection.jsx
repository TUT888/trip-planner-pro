import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GeneralProgressBar from "../../components/dashboard/GeneralProgressBar"; 
import { useNavigate } from "react-router-dom";
import {
  calculatePackingSummaryCards,
  calculatePackingCategoriesProgress
} from "@/utils/dashboardPackingSummaryUtils";

//  prop 
export function PackingChecklistSection({ packingList = [] }) {

  const navigate = useNavigate();
  const packing = calculatePackingSummaryCards(packingList);
  const packingCategoriesProgess = calculatePackingCategoriesProgress(packingList);

  

  return (
    <Card className="border-2 border-black rounded-xl overflow-hidden shadow-none flex flex-col h-full p-0 bg-white">
      
      <CardHeader className="bg-primary flex flex-row items-center justify-between py-2 px-4 text-white space-y-0">
        <CardTitle className="text-md font-bold tracking-wide">Packing checklist</CardTitle>
        <button 
        onClick={()=>navigate("/packing")}
        className="text-xs border border-black bg-transparent text-white px-3 py-0.5 rounded-sm hover:bg-white/10 transition-colors">
          View more
        </button>
      </CardHeader>

      <CardContent className="p-3 space-y-3 flex-1">
        
        {/* 4 ô thống kê */}
        <div className="grid grid-cols-2 gap-2">
          {packing.map((card, i) => (
            <div key={i} className="bg-gray-100 border border-gray-200 rounded-lg p-3 text-center">
              <div className="font-black text-2xl text-gray-900">{card.value}</div>
              <div className="text-[11px] text-gray-500 font-bold mt-0.5 whitespace-nowrap">
                {card.label}
              </div>
            </div>
          ))}
        </div>

        {/* Các thanh tiến độ */}
        <div className="space-y-4 pt-1">
          {packingCategoriesProgess.map((cat, index) => {
            // Tính % để cho thanh ProgressBar
            const percentage = cat.isPercent 
              ? cat.current 
              : cat.total > 0 ? (cat.current / cat.total) * 100 : 0;
              
            return (
              <div key={index} className="space-y-1.5">
                <div className="flex flex-row justify-between text-xs font-bold text-gray-700">
                    <div className="font-semibold">{cat.name}</div>
                    <div>
                      {cat.isPercent ? `${cat.current}%` : `${cat.current}/${cat.total}`}
                    </div>
                </div>
                
                <GeneralProgressBar percentage={percentage} className="h-2.5" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}