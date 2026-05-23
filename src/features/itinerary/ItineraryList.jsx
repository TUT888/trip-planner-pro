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
import {
    ITINERARY_CATEGORY_OPTIONS,
    ITINERARY_PRIORITY_OPTIONS,
    ITINERARY_STATUS,
    ITINERARY_STATUS_OPTIONS,
    normalizeItineraryCategory,
    normalizeItineraryPriority,
    normalizeItineraryStatus,
} from "@/features/itinerary/itineraryEnums";



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
    const status = normalizeItineraryStatus(item.status);

    return activityDateTime < now && status !== ITINERARY_STATUS.DONE;
}



export function ItineraryList() {
    const [itineraryItems, setItineraryItems] = useState(
        loadData(TRIP_PROPERTIES.ITINERARY) || []
    );
    const [createOpen, setCreateOpen] = useState(false);
    const [filters, setFilters] = useState({
        date: "",
        category: "",
        status: "",
        priority: "",
    });

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
    function updateFilter(filterName, value) {
        setFilters({
            ...filters,
            [filterName]: value,
        });
    }

    function resetFilters() {
        setFilters({
            date: "",
            category: "",
            status: "",
            priority: "",
        });
    }

    const filteredItineraryItems = itineraryItems.filter((item) => {
        const matchesDate = !filters.date || item.date === filters.date;
        const matchesCategory =
            !filters.category || normalizeItineraryCategory(item.category) === filters.category;
        const matchesStatus =
            !filters.status || normalizeItineraryStatus(item.status) === filters.status;
        const matchesPriority =
            !filters.priority || normalizeItineraryPriority(item.priority) === filters.priority;

        return matchesDate && matchesCategory && matchesStatus && matchesPriority;
    });



    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-3 rounded-2xl border border-[#cff5ea] bg-[#e8faf5] p-4 md:grid-cols-5">
                <input
                    type="date"
                    value={filters.date}
                    onChange={(event) => updateFilter("date", event.target.value)}
                    className="rounded-lg border border-input px-2.5 py-2"
                />

                <select
                    value={filters.category}
                    onChange={(event) => updateFilter("category", event.target.value)}
                    className="rounded-lg border border-input px-2.5 py-2"
                >
                    <option value="">All categories</option>
                    {ITINERARY_CATEGORY_OPTIONS.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.status}
                    onChange={(event) => updateFilter("status", event.target.value)}
                    className="rounded-lg border border-input px-2.5 py-2"
                >
                    <option value="">All statuses</option>
                    {ITINERARY_STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.priority}
                    onChange={(event) => updateFilter("priority", event.target.value)}
                    className="rounded-lg border border-input px-2.5 py-2"
                >
                    <option value="">All priorities</option>
                    {ITINERARY_PRIORITY_OPTIONS.map((priority) => (
                        <option key={priority} value={priority}>
                            {priority}
                        </option>
                    ))}
                </select>

                <Button type="button" variant="outline" onClick={resetFilters}>
                    Reset
                </Button>
            </div>
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

            {filteredItineraryItems.length === 0 ? (
                <ItineraryEmptyState />) : (

                filteredItineraryItems.map((item) => (
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
