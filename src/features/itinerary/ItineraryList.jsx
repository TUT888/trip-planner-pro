import { ItineraryCard } from "./ItineraryCard";

const itineraryList = [
    {
        id: 1,
        activityTitle: "Airport Pickup",
        location: "Da Nang International Airport",
        date: "2026-05-10",
        time: "09:00",
        category: "Transport",
        priority: "High",
        status: "Done",
        isOverdue: false,
    },
    {
        id: 2,
        activityTitle: "Check in at Hotel",
        location: "Hoi An Ancient Town",
        date: "2026-05-10",
        time: "14:00",
        category: "Hotel",
        priority: "High",
        status: "Done",
        isOverdue: false,
    },
    {
        id: 3,
        activityTitle: "Cau Pagoda Visit",
        location: "Hoi An, Quang Nam",
        date: "2026-05-11",
        time: "15:00",
        category: "Sightseeing",
        priority: "Medium",
        status: "Planned",
        isOverdue: true,
    },
    {
        id: 4,
        activityTitle: "Dinner at Local Restaurant",
        location: "Morning Glory Restaurant",
        date: "2026-05-11",
        time: "19:00",
        category: "Food",
        priority: "Medium",
        status: "In Progress",
        isOverdue: true,
    },
    {
        id: 5,
        activityTitle: "Lantern Shopping",
        location: "Hoi An Night Market",
        date: "2026-05-12",
        time: "20:00",
        category: "Shopping",
        priority: "Low",
        status: "Planned",
        isOverdue: false,
    },
    {
        id: 6,
        activityTitle: "Basket Boat Tour",
        location: "Cam Thanh Coconut Village",
        date: "2026-05-13",
        time: "08:30",
        category: "Sightseeing",
        priority: "High",
        status: "Planned",
        isOverdue: false,
    },
    {
        id: 7,
        activityTitle: "Coffee Break",
        location: "Faifo Coffee",
        date: "2026-05-13",
        time: "15:30",
        category: "Food",
        priority: "Low",
        status: "Planned",
        isOverdue: false,
    },
    {
        id: 8,
        activityTitle: "Move to Da Nang",
        location: "Hoi An to Da Nang",
        date: "2026-05-14",
        time: "10:00",
        category: "Transport",
        priority: "High",
        status: "Planned",
        isOverdue: false,
    },
    {
        id: 9,
        activityTitle: "Visit My Khe Beach",
        location: "My Khe Beach, Da Nang",
        date: "2026-05-14",
        time: "16:00",
        category: "Sightseeing",
        priority: "Medium",
        status: "Planned",
        isOverdue: false,
    },
    {
        id: 10,
        activityTitle: "Pack Luggage",
        location: "Hotel Room",
        date: "2026-05-15",
        time: "21:00",
        category: "Other",
        priority: "Medium",
        status: "Planned",
        isOverdue: false,
    },
];
const test = itineraryList[1]

export function ItineraryList() {
    return (
        <div>
            <ItineraryCard activityTitle={test.activityTitle} location={test.location} date={test.date}
            time={test.time} category={test.category} priority={test.priority} status={test.status}/>
        </div>
    )

}