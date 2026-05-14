import { calculatePackingProgress } from "@/features/packing/packingUtils";

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

// Redux actions
import { togglePacked, removeFromCheckList, clearAll, setFilter, cycleItemCategory, cycleItemRequired } from "@/features/packing/packingSlice";

import { setActiveTripId } from "@/features/trip/tripSlice";

import { selectFilteredItems } from "@/features/packing/packingSlice";

import PackingProgressBar from "@/features/packing/components/PackingProgressBar";
import PackingFilterBar from "@/features/packing/components/PackingFilterBar";
import PackingList from "@/features/packing/components/PackingList";
import TripSelector from "@/features/packing/components/TripSelector";

// shadcn Button
import { Button } from "@/components/ui/button";
import { Plus, RotateCcw } from "lucide-react";

export default function PackingChecklist() {
  const dispatch = useDispatch();

  // Selectors
  // Raw state
  const checklist = useSelector((s) => s.packing.checklist);
  const filters = useSelector((s) => s.packing.filters);
  const trips = useSelector((s) => s.trip.trips);
  const activeTripId = useSelector((s) => s.trip.activeTripId);
  // Derived state
  const filteredItems = useSelector(selectFilteredItems);
  const progress = Math.round(calculatePackingProgress(checklist));

  // Whether any filter is active (used for empty-state copy and "Clear filters" button)
  const isFiltered =
    filters.category !== "All" || filters.packedStatus !== "All";

  const handleTogglePacked = useCallback((id) => dispatch(togglePacked(id)), [dispatch]);
  const handleDelete = useCallback((id) => dispatch(removeFromCheckList(id)),[dispatch]);
  const handleCycleCategory = useCallback((id) => dispatch(cycleItemCategory(id)),[dispatch]);
  const handleCycleRequired = useCallback((id) => dispatch(cycleItemRequired(id)),[dispatch]);
  const handleFilterChange = useCallback((partial) => dispatch(setFilter(partial)),[dispatch]);
  const handleSelectTrip = useCallback((id) => dispatch(setActiveTripId(id)),[dispatch]);

  // Edit opens a modal — local state is fine here (UI-only, not persisted)
  const handleEdit = useCallback((item) => {
    // TODO (next task): open edit modal, dispatch(openEditModal(item))
    console.log("Edit item:", item);
  }, []);

  const handleAddNew = () => {
    // TODO (next task): dispatch(openAddModal())
    console.log("Open add-item modal");
  };

  const handleClearAll = () => dispatch(clearAll());

  // Render
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* Header row */}
      <div className="flex items-top gap-4 flex-wrap mb-1">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 shrink-0">
          Packing Checklist
        </h1>

        {/* Progress bar — spans available space between title and buttons */}
        <PackingProgressBar
          packed={progress.packed}
          total={progress.total}
          percentage={progress.percentage}
        />

        {/* Trip selector */}
        <TripSelector
          trips={trips}
          activeTripId={activeTripId}
          onSelectTrip={handleSelectTrip}
        />

        {/* Add new item */}
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

      {/* Packing table */}
      <PackingList
        items={filteredItems}
        isFiltered={isFiltered}
        onTogglePacked={handleTogglePacked}
        onCycleCategory={handleCycleCategory}
        onCycleRequired={handleCycleRequired}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
