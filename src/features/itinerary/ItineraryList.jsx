import { CalendarDays } from "lucide-react";
import { ItineraryCard } from "./ItineraryCard";
import {
    loadData,
    saveData,
    TRIP_DATA_CHANGE_EVENT,
    TRIP_PROPERTIES,
} from "@/services/tripDataService";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ItineraryForm } from "@/features/itinerary/components/ItineraryForm";



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

function isItineraryOverdue(item) {
    const activityDateTime = new Date(`${item.date}T${item.time}`);
    const now = new Date();

    return activityDateTime < now && item.status !== "Done";
}



export function ItineraryList() {
    const [itineraryItems, setItineraryItems] = useState(
        loadData(TRIP_PROPERTIES.ITINERARY) || []
    );
    const [createOpen, setCreateOpen] = useState(false);

    useEffect(() => {
        function syncItineraryItems() {
            setItineraryItems(loadData(TRIP_PROPERTIES.ITINERARY) || []);
        }

        window.addEventListener(TRIP_DATA_CHANGE_EVENT, syncItineraryItems);
        window.addEventListener("storage", syncItineraryItems);

        return () => {
            window.removeEventListener(TRIP_DATA_CHANGE_EVENT, syncItineraryItems);
            window.removeEventListener("storage", syncItineraryItems);
        };
    }, []);

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
    function handleCreateItinerary(formData) {
        const newItem = {
            id: Date.now(),
            ...formData,
        };

        const nextItems = [...itineraryItems, newItem];

        setItineraryItems(nextItems);
        saveData(TRIP_PROPERTIES.ITINERARY, nextItems);
        setCreateOpen(false);
    }

    function handleDeleteItinerary(itemId) {
        const nextItems = itineraryItems.filter((item) => item.id !== itemId);

        setItineraryItems(nextItems);
        saveData(TRIP_PROPERTIES.ITINERARY, nextItems);
    }



    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end">
                <Button type="button" onClick={() => setCreateOpen(true)}>
                    Add itinerary
                </Button>
            </div>
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create itinerary</DialogTitle>
                        <DialogDescription className="sr-only">
                            Add a new itinerary activity.
                        </DialogDescription>
                    </DialogHeader>

                    <ItineraryForm onSubmit={handleCreateItinerary} />
                </DialogContent>
            </Dialog>

            {itineraryItems.length === 0 ? (
                <ItineraryEmptyState />) : (

                itineraryItems.map((item) => (
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
                        isOverdue={isItineraryOverdue(item)}
                        onUpdate={handleUpdateItinerary}
                        onDelete={handleDeleteItinerary}
                    />
                ))
            )}

        </div>

    )
}
