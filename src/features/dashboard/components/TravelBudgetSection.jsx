
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BudgetBar } from "../../../components/dashboard/BudgetBar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    //budgetAll,
    getStatusBadge
}from "@/features/dashboard/dashboardBudgetUtils";
import { useNavigate } from "react-router-dom"

import { useSelector } from "react-redux"
import { selectDashboardBudgetSummary } from "@/features/dashboard/dashboardSelector"
console.log("selector:", selectDashboardBudgetSummary); // thêm dòng này


export const TravelBudgetSection = () => {
    const navigate = useNavigate();
    const budgetObject = useSelector(selectDashboardBudgetSummary);
    
    if (!budgetObject || !budgetObject.categories || budgetObject.categories.length === 0) {
        return (
            <Card className="bg-white shadow-sm overflow-hidden border border-gray-100 flex flex-col h-[500px] max-h-[500px]">
                <CardHeader className="flex flex-row items-center justify-between py-4 px-6 space-y-0 border-b border-gray-100 bg-white">
                    <CardTitle className="text-md font-semibold text-gray-800">Travel Budget</CardTitle>
                    <Button 
                        variant="default"
                        size="sm"
                        disabled
                        className="text-xs bg-gray-400 font-medium text-white cursor-not-allowed">
                        View more
                    </Button>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    </div>
                    
                    <p className="text-sm font-medium text-gray-500">No budget recorded yet</p>
                    <p className="text-xs text-gray-400 mt-1">Keep track of your expenses by creating budget items.</p>
                </CardContent>
            </Card>
        );
    }

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
                            <div className="text-[11px] text-gray-500 font-medium text-right uppercase tracking-wider">Remaining Wallet</div>
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
                            const badge = getStatusBadge(cat.paidItems, cat.totalItems);
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