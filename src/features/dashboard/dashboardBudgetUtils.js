
export const budgetAll = (budget, tripBudget = 0)=>{
    const totalActual = budget.reduce((sum, item) => sum + Number(item.actualCost), 0);
    const totalEstimated = budget.reduce((sum, item) => sum + Number(item.estimatedCost), 0);
    const remainingMoney = tripBudget - totalActual;
    const percentUsed = totalEstimated > 0 ? Math.round((totalActual / tripBudget) * 100) : 0;

    const staticCategories = [
        { name: "Accommodation", color: "bg-pink-500" },
        { name: "Food", color: "bg-blue-400" },
        { name: "Transport", color: "bg-yellow-400" },
        { name: "Shopping", color: "bg-purple-400" },
        { name: "Activity", color: "bg-green-400" },
        { name: "Other", color: "bg-teal-400" },

    ];

    const processedCategories = staticCategories.map((cat, index) => {
        const itemsInGroup = budget.filter(item => item.category === cat.name);
        
        const actSum = itemsInGroup.reduce((sum, item) =>  sum + Number(item.actualCost), 0);
        const estSum = itemsInGroup.reduce((sum, item) => sum + Number(item.estimatedCost), 0);
        const catPercentage = totalEstimated > 0 ? (actSum / totalEstimated) * 100 : 0;
        return {
            id: index,
            name: cat.name,
            color: cat.color,
            actual: actSum,
            est: estSum,
            percentage: catPercentage,
            width: `${catPercentage}%` 
        };
    });
    const segmentsForBar = processedCategories.filter(cat => cat.est > 0);

    const budgetObject = {
        actual: totalActual,
        remaining: remainingMoney,
        total: tripBudget,
        percentageUsed: percentUsed,
        categories: segmentsForBar, 
        //category: processedCategories    
    };
    return budgetObject;
}




export const getStatusBadge = (actual, est) => {
        if (actual == 0) {
            return {className: "border-red-300 text-red-500 bg-red-50 text-[10px] rounded-md h-5 font-bold shadow-none",
                    text: "Not Paid" }
        }
        if (actual > 0 && actual < est) {
            return {className:"border-yellow-300 text-yellow-500 bg-yellow-50 text-[10px] rounded-md h-5 font-bold shadow-none ",
                    text: "Partially Paid" }
        }
        return { className: "border-green-300 text-green-500 bg-green-50 text-[10px] rounded-md h-5 font-bold shadow-none ",
                text: "Paid"}
    
    }