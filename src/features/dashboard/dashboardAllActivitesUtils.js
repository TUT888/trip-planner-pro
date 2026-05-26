export const setFilteredTimeline = (activeTab,activities) =>{
    let rawActivities;
    if(activeTab==="All"){
        rawActivities = activities;
    }
    else{
        rawActivities = activities.filter((act)=>(act.date===activeTab));
    }
    let selectedItems = [];
    rawActivities.forEach(element => {
        const existedGroup = selectedItems.find((group)=>(group.selectedDate===element.date));

        if(!existedGroup){
            selectedItems.push({selectedDate: element.date, act:[element]})
        }
        else{
            existedGroup.act.push(element);
        }

        
    });
    return selectedItems;
}



export const renderStatusBadge = (item) => {
    const currentStatus = item.status?.toLowerCase();
    
    const activityDateTime = new Date(`${item.date}T${item.time}`);
    const now = new Date();
    const isOverdue = activityDateTime < now && currentStatus !== "done";

    if (isOverdue) {
        return { text: "Overdue", className: "border-red-300 text-red-500 bg-red-50 text-[10px] rounded-md h-5 font-bold shadow-none" };
    }
    if (currentStatus === "done") {
        return { text: "Done", className: "border-green-300 text-green-500 bg-green-50 text-[10px] rounded-md h-5 font-bold shadow-none " };
    }
    
    // (Planned v.v...)
    return { text: "Planned", className: "border-foreground-300 text-foreground-500 bg-foreground-50 text-[10px] rounded-md h-5 font-bold shadow-none " };
  };
