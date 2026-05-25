import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { selectDashboardState } from "@/features/dashboard/dashboardSelector";
import { useState } from "react";
import {
    renderStatusBadge,
    setFilteredTimeline
} from "@/features/dashboard/dashboardAllActivitesUtils";
//import { Itinerary } from "@/pages/Itinerary";

export function AllActivitiesSection() {
    const navigate = useNavigate(); 
    const [activeTab, setActiveTab] = useState("All");
    
    // const dashboardData = useSelector(selectDashboardState);
    // const activities = dashboardData.itinerary || [];

    const activities = useSelector((state) => state.itinerary.items || []);

    const filteredTimeline = setFilteredTimeline(activeTab, activities);

    const uniqueDate = ["All",...new Set(activities.map((act)=>act.date))]

  
  return (
    <Card className="bg-white shadow-sm overflow-hidden border border-gray-100 flex flex-col max-h-[500px]">
      
      <CardHeader className="flex flex-row items-center justify-between py-3.5 px-5  border-b border-gray-100 bg-white space-y-0">
        <CardTitle className="text-md font-semibold text-gray-800">All Activities</CardTitle>
        <Button 
        variant="default"
        size="sm"
        onClick={() => navigate("/itinerary")}
        className="text-xs h-7 px-3 bg-primary hover:bg-primary/80 transition-colors font-medium text-white">
          View all
        </Button>
      </CardHeader>

      <CardContent className="px-5 py-0.5 space-y-4 flex-1 overflow-y-auto">
        {/* Hàng chọn Tabs*/}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {uniqueDate.map((day) => (
            <Button
              key={day}
              variant={activeTab === day ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(day)}
              className={`text-xs h-7 px-3 transition-all ${
                activeTab === day
                  ? "bg-primary hover:bg-primary/80 text-white border-transparent"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 font-medium"
              }`}
            >
              {day}
            </Button>
          ))}
          {/* <button className="text-xs px-2 py-1 rounded-md border border-gray-300 font-bold">···</button> */}
        </div>

          {/* Timeline */}
        <div className="space-y-4">
        
        {filteredTimeline.map((dayGroup, groupIndex) => (
            <div key={groupIndex} className="space-y-3">
            {/* Tiêu đề ngày */}
            <div className="text-xs font-bold text-primary upercase tracking-wider">
                {dayGroup.selectedDate}
            </div>

            {/* Khối chứa danh sách các hoạt động trong ngày */}
            <div className="space-y-2 pl-1 relative">
                {/* Đường thẳng chạy dọc nối các cột mốc */}
                <div className="absolute left-[51px] top-2 bottom-6 w-[1.5px] bg-gray-400" />

                {dayGroup.act.map((item) => {
                const badge = renderStatusBadge(item.status);
                let dotColor="bg-blue-500";
                if(item.status?.toLowerCase()=="done") dotColor = "bg-green-500"
                else if(item.status?.toLowerCase()=="overdue") dotColor="bg-red-500"


                return (
                    <div key={item.id} className="flex items-start relative group">
                    
                    {/* Cột mốc thời gian */}
                    <div className="w-10 text-xs font-bold text-gray-700 pt-0.5">
                        {item.time}
                    </div>

                    {/* Dấu chấm tròn  */}
                    <div className="flex flex-col items-center mx-3 absolute left-10 top-0 bottom-0">
                        <div className={`w-1.5 h-1.5 rounded-full ${dotColor || 'bg-gray-400'} z-10 mt-1.5`} />
                    </div>

                    {/* nội dung chi tiết hoạt động */}
                    <div className="pl-6 pb-2 flex-1 space-y-1.5">
                        <p className="text-xs font-semibold text-gray-800 leading-tight">
                        {item.title}
                        </p>
                        <div className="flex items-center gap-2">
                       
                        <Badge variant="outline" className={badge.className}>
                            {item.status}
                        </Badge>
                        </div>
                    </div>

                    </div>
                );
                })}
            </div>
            </div>
        ))}
        </div>
      </CardContent>
    </Card>
  );
}