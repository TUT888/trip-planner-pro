import {
    Bus,
    CircleEllipsis,
    Hotel,
    Landmark,
    ShoppingBag,
    Utensils,
} from "lucide-react";
import {
    ITINERARY_CATEGORY,
    normalizeItineraryCategory,
} from "@/features/itinerary/itineraryEnums";

export function ItineraryCategoryIcon({ category, ...props }) {
    const normalizedCategory = normalizeItineraryCategory(category);

    switch (normalizedCategory) {
        case ITINERARY_CATEGORY.TRANSPORT:
            return <Bus {...props} />;
        case ITINERARY_CATEGORY.FOOD:
            return <Utensils {...props} />;
        case ITINERARY_CATEGORY.SIGHTSEEING:
            return <Landmark {...props} />;
        case ITINERARY_CATEGORY.SHOPPING:
            return <ShoppingBag {...props} />;
        case ITINERARY_CATEGORY.HOTEL:
            return <Hotel {...props} />;
        default:
            return <CircleEllipsis {...props} />;
    }
}
