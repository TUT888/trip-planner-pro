
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BudgetBar } from "../../../components/dashboard/BudgetBar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    budgetAll,
    getStatusBadge
}from "@/features/dashboard/dashboardBudgetUtils";
import { useNavigate } from "react-router-dom"



export const TravelBudgetSection = ({ budget = [] }) => {
    const navigate = useNavigate();
    const budgetObject = budgetAll(budget);
    console.log("Dữ liệu budget nhận được tại component con:", budget);    
    
    return (
        <div>
            <Card className="bg-white shadow-sm overflow-hidden">
                <CardHeader className=" flex flex-row items-center justify-between py-4 px-6 space-y-0 border-b border-gray-100">
                    <CardTitle className="text-md font-semibold text-gray-800">Travel Budget</CardTitle>
                    <Button 
                    variant="default"
                    size = "sm"
                    onClick={()=>navigate("/budget")}
                    className="text-xs bg-primary hover:bg-primary/80 transition-colors">
                        View more
                    </Button>
                </CardHeader>

                <CardContent className="p-5 space-y-2 ">
                    {/* 2 Số tiền hiển thị ở đầu và ở cuối*/}
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-xl font-semibold text-gray-800 ">${budgetObject.actual.toLocaleString()}</div>
                            <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">actual</div>
                        </div>
                        <div className="right">
                            <div className="text-xl font-semibold text-gray-800">${budgetObject.remaining.toLocaleString()}</div>
                            <div className="text-[11px] text-gray-500 font-medium text-right uppercase tracking-wider">remaining</div>
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
                        {budgetObject.categories.map((cat)=>{
                            const badge = getStatusBadge(cat.actual, cat.est);
                            return (
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
                                        <Badge 
                                            className={`${badge.className} font-medium`}>
                                            {badge.text}
                                        </Badge>
                                                                                    
                                    </div>
                                    
                                </div>
                            </div>
                            )                
                        })}
                    </div>

                </CardContent>
            </Card>
        </div>
    )

}