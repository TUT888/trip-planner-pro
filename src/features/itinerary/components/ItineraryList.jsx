import { CalendarDays } from "lucide-react";
import { ItineraryCard } from "./ItineraryCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { ItineraryCategoryIcon } from "@/features/itinerary/components/ItineraryCategoryIcon";


const FILTER_ALL_VALUE = "all";


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
    const activityDateTime = getItineraryDateTime(item);
    const now = new Date();
    const status = normalizeItineraryStatus(item.status);

    return Boolean(activityDateTime) && activityDateTime < now && status !== ITINERARY_STATUS.DONE;
}

function getItineraryDateTime(item) {
    const dateTime = new Date(`${item.date}T${item.time || "00:00"}`);

    return Number.isNaN(dateTime.getTime()) ? null : dateTime;
}

function compareItineraryDateTime(firstItem, secondItem) {
    const firstDateTime = getItineraryDateTime(firstItem);
    const secondDateTime = getItineraryDateTime(secondItem);
    const now = Date.now();

    if (!firstDateTime && !secondDateTime) return 0;
    if (!firstDateTime) return 1;
    if (!secondDateTime) return -1;

    const firstDistance = Math.abs(firstDateTime.getTime() - now);
    const secondDistance = Math.abs(secondDateTime.getTime() - now);

    if (firstDistance !== secondDistance) {
        return firstDistance - secondDistance;
    }

    return firstDateTime.getTime() - secondDateTime.getTime();
}

export function ItineraryList({ selectedTripId, canEdit = true }) {
    const [createOpen, setCreateOpen] = useState(false);
    const [filters, setFilters] = useState({
        date: "",
        category: "",
        status: "",
        priority: "",
    });
    const [list, setList] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const res = await fetch(`http://localhost:3001/itineraryItems?tripId=${selectedTripId}`);
            setList(await res.json());
        }

        if (selectedTripId) {
            getItems();
        }
    }, [selectedTripId])

    function handleUpdateItinerary(updatedItem) {
        if (!canEdit) return;

        const update = async function () {
            await fetch(`http://localhost:3001/itineraryItems/${updatedItem.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    { ...updatedItem, tripId: selectedTripId }
                ),
            });

            const res = await fetch(`http://localhost:3001/itineraryItems?tripId=${selectedTripId}`);

            setList(await res.json());
        }

        update();
    }
    function handleCreateItinerary(formData) {
        if (!canEdit) return;

        const newItem = {
            id: Date.now(),
            ...formData,
        };

        const create = async () => {
            await fetch(`http://localhost:3001/itineraryItems`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...newItem,
                    tripId: selectedTripId,
                }),
            });

            const res = await fetch(`http://localhost:3001/itineraryItems?tripId=${selectedTripId}`);

            setList(await res.json());
            setCreateOpen(false);
        }
        create();
    }

    function handleDeleteItinerary(itemId) {
        if (!canEdit) return;

        const remove = async () => {
            await fetch(`http://localhost:3001/itineraryItems/${itemId}`, {
                method: "DELETE",
            });

            const res = await fetch(`http://localhost:3001/itineraryItems?tripId=${selectedTripId}`);

            setList(await res.json());
        }

        remove();
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

    const filteredItineraryItems = list
        .filter((item) => {
            const matchesDate = !filters.date || item.date === filters.date;
            const matchesCategory =
                !filters.category || normalizeItineraryCategory(item.category) === filters.category;
            const matchesStatus =
                !filters.status || normalizeItineraryStatus(item.status) === filters.status;
            const matchesPriority =
                !filters.priority || normalizeItineraryPriority(item.priority) === filters.priority;

            return matchesDate && matchesCategory && matchesStatus && matchesPriority;
        })
        .sort(compareItineraryDateTime);

    function updateSelectFilter(filterName, value) {
        updateFilter(filterName, value === FILTER_ALL_VALUE ? "" : value);
    }



    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-3 rounded-2xl border border-[#cff5ea] bg-[#e8faf5] p-4 md:grid-cols-5">
                <input
                    type="date"
                    value={filters.date}
                    onChange={(event) => updateFilter("date", event.target.value)}
                    className="rounded-lg border border-input px-2.5 py-2"
                />

                <Select
                    value={filters.category || FILTER_ALL_VALUE}
                    onValueChange={(value) => updateSelectFilter("category", value)}
                >
                    <SelectTrigger className="h-auto w-full max-w-full rounded-lg border-input bg-white px-2.5 py-2">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={FILTER_ALL_VALUE}>All categories</SelectItem>
                            {ITINERARY_CATEGORY_OPTIONS.map((category) => (
                                <SelectItem key={category} value={category} textValue={category}>
                                    <CategoryOption category={category} />
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.status || FILTER_ALL_VALUE}
                    onValueChange={(value) => updateSelectFilter("status", value)}
                >
                    <SelectTrigger className="h-auto w-full max-w-full rounded-lg border-input bg-white px-2.5 py-2">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={FILTER_ALL_VALUE}>All statuses</SelectItem>
                            {ITINERARY_STATUS_OPTIONS.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.priority || FILTER_ALL_VALUE}
                    onValueChange={(value) => updateSelectFilter("priority", value)}
                >
                    <SelectTrigger className="h-auto w-full max-w-full rounded-lg border-input bg-white px-2.5 py-2">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={FILTER_ALL_VALUE}>All priorities</SelectItem>
                            {ITINERARY_PRIORITY_OPTIONS.map((priority) => (
                                <SelectItem key={priority} value={priority}>
                                    {priority}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button type="button" variant="outline" onClick={resetFilters}>
                    Reset
                </Button>
            </div>
            {canEdit && (
                <>
                    <div className="flex justify-end">
                        <Button type="button" onClick={() => setCreateOpen(true)}>
                            Add itinerary
                        </Button>
                    </div>
                    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                        <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Create itinerary</DialogTitle>
                                <DialogDescription className="sr-only">
                                    Add a new itinerary activity.
                                </DialogDescription>
                            </DialogHeader>

                            <ItineraryForm onSubmit={handleCreateItinerary} />
                        </DialogContent>
                    </Dialog>
                </>
            )}

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
                        canEdit={canEdit}
                        onUpdate={handleUpdateItinerary}
                        onDelete={handleDeleteItinerary}
                    />
                ))
            )}

        </div>

    )
}

function CategoryOption({ category }) {
    return (
        <span className="flex items-center gap-2">
            <ItineraryCategoryIcon
                category={category}
                className="size-4 text-[#3DC59D]"
                aria-hidden
            />
            <span>{category}</span>
        </span>
    );
}
