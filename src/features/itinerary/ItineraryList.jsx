import { CalendarDays } from "lucide-react";
import { ItineraryCard } from "./ItineraryCard";
import { loadData, saveData, TRIP_PROPERTIES } from "@/services/tripDataService";
import { useState } from "react";


function ItineraryEmptyState() {
    return (
        <div
            className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-[#cff5ea] bg-[#e8faf5] px-6 py-12 text-center"
            role="status"
            aria-live="polite"
        >
            <div className="flex size-14 items-center justify-center rounded-full bg-[#c2f2e4] text-[#3DC59D]">
                <CalendarDays className="size-7" aria-hidden />
            </div>
            <div className="max-w-sm space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">No activities yet</h2>
                <p className="text-sm text-gray-600">
                    When you add trip activities, they will show up here. You can plan your day
                    step by step.
                </p>
            </div>
        </div>
    );
}


export function ItineraryList() {
    const [itineraryItems, setItineraryItems] = useState(
        loadData(TRIP_PROPERTIES.ITINERARY) || []
    );
    if (itineraryItems.length === 0) {
        return <ItineraryEmptyState />;
    }
    function handleUpdateItinerary(updatedItem) {
        const nextItems = itineraryItems.map((item) => {
            if (item.id === updatedItem.id) {
                return updatedItem;
            }

            return item;
        });

        setItineraryItems(nextItems);
        saveData(TRIP_PROPERTIES.ITINERARY, nextItems);
    }


    return (
        <div className="flex flex-col gap-4">
            {itineraryItems.map((item) => (
                <ItineraryCard
                    key={item.id}
                    id={item.id}
                    activityTitle={item.activityTitle}
                    location={item.location}
                    date={item.date}
                    time={item.time}
                    category={item.category}
                    priority={item.priority}
                    status={item.status}
                    isOverdue={item.isOverdue}
                    onUpdate={handleUpdateItinerary}
                />
            ))}
        </div>
    );
}
