export const MOCK_TRIP_DATA = {
//   tripName: "Trip 1: UIT -> WeCamp -> StarCamp",
//   stats: [
//     { label: "itinerary completed", value: "30%", progress: 30, subValue: "3/10 activities" },
//     { label: "budget used", value: "40%", progress: 40 },
//     { label: "packing progress", value: "50%", progress: 50 },
//     { label: "unpaid items", value: "4" },
//     { label: "overdue activities", value: "2" },
//   ],
//   budget: {
//     actual: 1000,
//     remaining: 1100,
//     total: 2100, 
//     percentageUsed: 55,
//     categories: [
//       {
//         id: "accommodation",
//         name: "Accommodation",
//         actual: 500,
//         est: 510,
//         status: "Paid",        
//         color: "bg-pink-500",   
//         width: "24%",          
//       },
//       {
//         id: "food",
//         name: "Food",
//         actual: 300,
//         est: 800,
//         status: "Partially paid",
//         color: "bg-blue-400",
//         width: "14%",
//       },
//       {
//         id: "transport",
//         name: "Transport",
//         actual: 300,
//         est: 800,
//         status: "Partially paid",
//         color: "bg-yellow-500",
//         width: "14%",
//       },
//       {
//         id: "tickets",
//         name: "Tickets",
//         actual: 300,
//         est: 800,
//         status: "Unpaid",
//         color: "bg-purple-600",
//         width: "3%",
//       }
//     ]
//   },
  
// activitiesData: {
//         days: ["All", "May 11", "May 12"],
//         timeline: [
//             {
//             date: "Mon, May 11, 2026",
//             items: [
//                 {
//                 id: 1,
//                 time: "6:00",
//                 title: "Information Lorem Ipsum hihi ehhe",
//                 status: "Done",
//                 type: "Transport",
//                 dotColor: "bg-green-500"
//                 },
//                 {
//                 id: 2,
//                 time: "7:00",
//                 title: "Information Lorem Ipsum hihi ehhe",
//                 status: "Done",
//                 type: "Transport",
//                 dotColor: "bg-green-500"
//                 }
//             ]
//             },
//             {
//             date: "Mon, May 12, 2026",
//             items: [
//                 {
//                 id: 3,
//                 time: "6:00",
//                 title: "Information Lorem Ipsum hihi ehhe",
//                 status: "Overdue",
//                 type: "Transport",
//                 dotColor: "bg-red-500"
//                 },
//                 {
//                 id: 4,
//                 time: "7:00",
//                 title: "Information Lorem Ipsum hihi ehhe",
//                 status: "Done",
//                 type: "Transport",
//                 dotColor: "bg-gray-400"
//                 }
//             ]
//             }
//     ]
//     },
//     packingData: {
//         summaryCards: [
//             { value: 20, label: "items packed" },
//             { value: 10, label: "still needed" },
//             { value: 4, label: "required unpacked" },
//             { value: 34, label: "total items" }
//         ],
//         categories: [
//             { name: "Overall progress", current: 70, total: 100, isPercent: true },
//             { name: "Clothes", current: 4, total: 6, isPercent: false },
//             { name: "Documents", current: 1, total: 3, isPercent: false, isRequired: true }
//         ]
//     }

    "tripName": "Da Nang Family Trip",
    "budget": 12000000,
    "itinerary": [
         {
        "id": 1,
        "title": "Eat Ice-cream",
        "location": "An Khanh",
        "date": "2026-06-9",
        "time": "08:00",
        "category": "Food",
        "priority": "Low",
        "status": "Overdue"
        },
        {
        "id": 2,
        "title": "Flight to Da Nang",
        "location": "Tan Son Nhat Airport",
        "date": "2026-06-10",
        "time": "08:00",
        "category": "Transport",
        "priority": "High",
        "status": "Done"
        },
         {
        "id": 3,
        "title": "Eat Bun Bo",
        "location": "Tan Son Nhat Airport",
        "date": "2026-06-11",
        "time": "08:00",
        "category": "Transport",
        "priority": "High",
        "status": "Planned"
        },
        {
        "id": 4,
        "title": "Eat Pho",
        "location": "Tan Son Nhat Airport",
        "date": "2026-06-11",
        "time": "09:00",
        "category": "Food",
        "priority": "High",
        "status": "Planned"
        }
    ],
    "packingList": [
        {
        "id": 1,
        "name": "Passport / ID card",
        "category": "Documents",
        "quantity": 1,
        "requiredStatus": "Required",
        "packedStatus": "Packed"
        },
        {
        "id": 2,
        "name": "T-shirt",
        "category": "Clothes",
        "quantity": 10,
        "requiredStatus": "Required",
        "packedStatus": "Not Packed"
        }
    ],
    "budgetItems": [
        {
        "id": 1,
        "name": "Flight tickets",
        "category": "Transport",
        "estimatedCost": 4000000,
        "actualCost": 4200000,
        "paymentStatus": "Paid"
        },
        {
        "id": 2,
        "name": "Hotel Checkin",
        "category": "Accommodation",
        "estimatedCost": 4000000,
        "actualCost": 4200000,
        "paymentStatus": "Paid"
        },
        {
        "id": 3,
        "name": "Concert tickets",
        "category": "Accommodation",
        "estimatedCost": 4000000,
        "actualCost": 10,
        "paymentStatus": "Partially paid"
        }
    ]
  
};