import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

// Utils
import { calculatePackingProgress } from "@/features/packing/packingUtils";

// Redux actions
import {
  togglePacked,
  removeFromCheckList,
  clearAll,
  setFilter,
  cycleItemCategory,
  cycleItemRequired,
} from "@/features/packing/packingSlice";
import { setActiveTripId } from "@/features/trip/tripSlice";
import {
  selectFilteredItems,
  selectPackingChecklist,
  selectPackingFilter,
  selectProgress,
} from "@/features/packing/packingSelector";

// Components
import { Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackingProgressBar } from "@/features/packing/components/PackingProgressBar";
import { PackingFilterBar } from "@/features/packing/components/PackingFilterBar";
import { PackingList } from "@/features/packing/components/PackingList";
import { TripSelector } from "@/features/packing/components/TripSelector";
import {
  selectActiveTrip,
  selectActiveTripId,
  selectAllTrips,
} from "@/features/trip/tripSelector";

export default function PackingChecklist() {
  const dispatch = useDispatch();

  // Selectors for raw state
  const filters = useSelector(selectPackingFilter);

  // Selectors derived state
  const filteredItems = useSelector(selectFilteredItems);

  // Whether any filter is active (used for empty-state copy and "Clear filters" button)
  const isFiltered =
    filters.category !== "All" || filters.packedStatus !== "All";

  const handleFilterChange = useCallback(
    (partial) => dispatch(setFilter(partial)),
    [dispatch],
  );

  const handleAddNew = () => {
    // TODO (next task): dispatch(openAddModal())
    console.log("Open add-item modal");
  };

  const handleClearAll = () => dispatch(clearAll());

  // Render
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-top gap-4 flex-wrap mb-1">
        <h1 className="text-2xl font-semibold text-gray-900 shrink-0">
          Packing Checklist
        </h1>

        <PackingProgressBar />

        <TripSelector />

        <Button
          variant="outline"
          size="default"
          onClick={handleAddNew}
          className="border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 shrink-0"
        >
          <Plus aria-hidden="true" />
          Add new item
        </Button>

        {/* Clear all */}
        <Button
          variant="outline"
          size="default"
          onClick={handleClearAll}
          className="border-pink-500 text-pink-700 hover:bg-pink-50 hover:text-pink-800 shrink-0"
        >
          <RotateCcw aria-hidden="true" />
          Clear
        </Button>
      </div>

      {/* Filter bar */}
      <PackingFilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* Packing list */}
      <PackingList items={filteredItems} isFiltered={isFiltered} />
    </div>
  );
}
