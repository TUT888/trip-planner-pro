
// Tính itinerary completed ô 1
 export const calculateItineraryProgress = (itinerary)=>{
    if(!itinerary || itinerary.length==0) return 0;

    const doneCount = itinerary.filter((act)=>(
        act.status?.toLowerCase()==='done'
    )).length;

    const intineraryPercent = (doneCount/itinerary.length) *100;
    return Math.round(intineraryPercent);
 }

 export const calculatePackingProgress = (packing) =>{
    if(!packing || packing.length==0) return 0;

    const packedCount = packing.filter ((pack)=>(
        pack.packedStatus?.toLowerCase()=="packed"
    )).length;

    const packingPercent = (packedCount/packing.length)*100;
    return Math.round(packingPercent);
 }

 export const calculateBudgeProgress = (budgetItems) => {
    if(!budgetItems||budgetItems.length==0) return 0;

    const paidCount = budgetItems.filter((bud)=>
        bud.paymentStatus.toLowerCase()=="paid"
    ).length;
    const paidPercent = (paidCount/budgetItems.length) *100;
    return Math.floor(paidPercent);
 }

 export const calculateUnpaidItems = (budgetItems) => {
    if(!budgetItems||budgetItems.length==0) return 0;

    const unpaidCount = budgetItems.filter((bud)=>(
        bud.paymentStatus.toLowerCase()!=="paid"
    )).length
    return unpaidCount;

 }

 export const calculateOverdueActivities = (initerary)=>{
    if(!initerary||initerary.length==0) return 0;

    const overdueCount = initerary.filter((act)=>(
        act?.status?.toLowerCase()=="overdue"
    )).length;
    
    return overdueCount;
 }
//  "itinerary": [
//         {
//         "id": 1,
//         "title": "Flight to Da Nang",
//         "location": "Tan Son Nhat Airport",
//         "date": "2026-06-10",
//         "time": "08:00",
//         "category": "Transport",
//         "priority": "High",
//         "status": "Planned"
//         }
//     ],

//  "budgetItems": [
        // {
        // "id": 1,
        // "name": "Flight tickets",
        // "category": "Transport",
        // "estimatedCost": 4000000,
        // "actualCost": 4200000,
        // "paymentStatus": "Paid"
        // },