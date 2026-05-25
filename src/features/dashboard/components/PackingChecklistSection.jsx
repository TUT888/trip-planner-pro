import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GeneralProgressBar from "../../../components/dashboard/GeneralProgressBar"; 
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

import { selectDashboardPackingSummary } from "@/features/dashboard/dashboardSelector";
export function PackingChecklistSection() {

  const navigate = useNavigate();
  const packingSummary = useSelector(selectDashboardPackingSummary);

  



  const { cards: packing, progress: packingCategoriesProgess } = packingSummary;
  const isPackingEmpty = 
    !packingSummary || 
    !packingSummary.cards || 
    packingSummary.cards.length === 0 ||
    packingSummary.cards.every(card => Number(card.value) === 0); 
  if (isPackingEmpty) {
    return (
      <Card className="bg-white shadow-sm overflow-hidden border border-gray-100 flex flex-col h-[500px] max-h-[500px]">
        <CardHeader className="flex flex-row items-center justify-between py-3.5 px-5 border-b border-gray-100 bg-white space-y-0 flex-none">
          <CardTitle className="text-md font-semibold text-gray-800">Packing checklist</CardTitle>
          <Button 
            variant="default"
            size="sm"
            className="text-xs h-7 px-3 bg-gray-400 font-medium text-white cursor-not-allowed"
            disabled 
          >
            View more
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          
          <p className="text-sm font-medium text-gray-500">No items on your checklist</p>
          <p className="text-xs text-gray-400 mt-1">Start organizing your luggage by adding packing items!</p>
        </CardContent>    
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm overflow-hidden border border-gray-100 ">
      
      <CardHeader className="flex flex-row items-center justify-between py-3.5 px-5 space-y-0 border-b border-gray-100 bg-white">
        <CardTitle className="text-md font-semibold text-gray-800">Packing checklist</CardTitle>
        <Button 
        variant="default"
        size="sm"
        onClick={()=>navigate("/packing")}
        className="text-xs h-7 px-3 bg-primary hover:bg-primary/80 transition-colors font-medium text-white">
          View more
        </Button>
      </CardHeader>

      <CardContent className="p-5 space-y-5 flex-1">
        
        {/* 4 ô thống kê */}
        <div className="grid grid-cols-2 gap-2">
          {packing.map((card, i) => (
            <div key={i} className="bg-gray-50/50 border border-gray-100 rounded-lg p-3 text-center">
              <div className="font-semibold text-2xl text-gray-800">{card.value}</div>
              <div className="text-[11px] text-gray-400 font-medium mt-0.5 whitespace-nowrap uppercase tracking-wider">
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
                <div className="flex flex-row justify-between text-xs font-medium text-gray-500">
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