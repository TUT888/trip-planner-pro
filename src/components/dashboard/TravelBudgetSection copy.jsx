
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BudgetBar } from "./BudgetBar"
import { Badge } from "@/components/ui/badge"
import {

}from "@/utils/dashboardBudgetUtils";
import { useNavigate } from "react-router-dom"


export const TravelBudgetSection = ({ budget = [] }) => {
    const navigate = useNavigate();
    console.log("Dữ liệu budget nhận được tại component con:", budget);
    
    
    return (
        <div>
            <Card className="border-2 border-black rounded-xl overflow-hidden shadow-none p-0 bg-white">
                <CardHeader className="bg-pink-500 flex flex-row items-center justify-between py-2 px-4 text-white space-y-0">
                    <CardTitle className="text-md font-bold tracking-wide">Travel Budget</CardTitle>
                    <button 
                    onClick={()=>navigate("/budget")}
                    className="text-xs border border-black bg-transparent text-white px-3 py-0.5 rounded-sm hover:bg-white/10 transition-colors">
                        View more
                    </button>
                </CardHeader>

                <CardContent className="px-4 space-y-2 ">
                    {/* 2 Số tiền hiển thị ở đầu và ở cuối*/}
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-xl font-black ">${budgetObject.actual}</div>
                            <div className="text-[11px] text-gray-500 font-medium">actual</div>
                        </div>
                        <div className="right">
                            <div className="text-xl font-black text-right">${budgetObject.remaining}</div>
                            <div className="text-[11px] text-gray-500 font-medium text-right">remaining</div>
                        </div>
                    </div>

                    {/* Thanh the hien tien do */}
                    <div>
                        
                        <BudgetBar segments={budgetObject.categories}/>

                        <div className="flex justify-between items-center text-xs font-bold text-gray-700 mt-1 px-1">
                            <span>$0</span>
                            <span className="text-gray-700 font-medium text-[12px]">{budgetObject.percentageUsed}%</span>
                            <span>${budgetObject.total}</span>
                        </div>
                    </div>

                    {/* Cu the cac danh muc */}
                    <div className="space-y-3 pt-2 py-2">
                        {budgetObject.categories.map((cat)=>(
                            // ten + mau
                            
                            <div key={cat.id} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                                    <span className="font-semibold text-gray-800">{cat.name}</span>
                                </div>
                                
                                {/* est + act + badge*/}
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="font-bold text-gray-900">${cat.actual.toLocaleString()}</div>
                                        <div className="text-[10px] text-gray-400">est.${cat.est.toLocaleString()}</div>
                                    </div>

                                    <div className="w-24 flex justify-end">
                                        {getStatusBadge(cat.actual, cat.est)}
                                    </div>
                                    
                                </div>
                            </div>                 
                        ))}
                    </div>

                </CardContent>
            </Card>
        </div>
    )

}