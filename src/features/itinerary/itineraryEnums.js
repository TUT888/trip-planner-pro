export const ITINERARY_CATEGORY = Object.freeze({
    TRANSPORT: "Transport",
    FOOD: "Food",
    SIGHTSEEING: "Sightseeing",
    SHOPPING: "Shopping",
    HOTEL: "Hotel",
    OTHER: "Other",
});

export const ITINERARY_PRIORITY = Object.freeze({
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
});

export const ITINERARY_STATUS = Object.freeze({
    PLANNED: "Planned",
    IN_PROGRESS: "In Progress",
    DONE: "Done",
});

export const ITINERARY_CATEGORY_OPTIONS = Object.values(ITINERARY_CATEGORY);
export const ITINERARY_PRIORITY_OPTIONS = Object.values(ITINERARY_PRIORITY);
export const ITINERARY_STATUS_OPTIONS = Object.values(ITINERARY_STATUS);

function normalizeKey(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\s+/g, " ");
}

function normalizeEnumValue(value, options) {
    const normalizedValue = normalizeKey(value);

    return options.find((option) => normalizeKey(option) === normalizedValue) || "";
}

export function normalizeItineraryCategory(value) {
    return normalizeEnumValue(value, ITINERARY_CATEGORY_OPTIONS);
}

export function normalizeItineraryPriority(value) {
    return normalizeEnumValue(value, ITINERARY_PRIORITY_OPTIONS);
}

export function getItineraryPriorityClassName(value) {
    const priority = normalizeItineraryPriority(value);

    switch (priority) {
        case ITINERARY_PRIORITY.MEDIUM:
            return "bg-yellow-100 text-yellow-900 border border-yellow-300";
        case ITINERARY_PRIORITY.HIGH:
            return "bg-red-100 text-red-900 border border-red-300";
        case ITINERARY_PRIORITY.LOW:
        default:
            return "bg-[#3DC59D] text-white";
    }
}

export function normalizeItineraryStatus(value) {
    return normalizeEnumValue(value, ITINERARY_STATUS_OPTIONS);
}
