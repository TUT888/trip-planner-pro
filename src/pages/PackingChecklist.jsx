import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "@/features/packing/packingSlice";
import { selectFilteredItems, selectPackingFilter } from "@/features/packing/packingSelector";
import { PackingFilterBar } from "@/features/packing/components/PackingFilterBar";
import { PackingList } from "@/features/packing/components/PackingList";
import { PackingHeader } from "@/features/packing/components/PackingHeader";

export function PackingChecklist() {
  const dispatch = useDispatch();
  const filters = useSelector(selectPackingFilter);
  const filteredItems = useSelector(selectFilteredItems);

  // Whether any filter is active (used for empty-state copy and "Clear filters" button)
  const isFiltered = filters.category !== "All" || filters.packedStatus !== "All";

  const handleFilterChange = (partial) => dispatch(setFilter(partial));

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Packing Summary Data */}
      <PackingHeader />

      <div className="flex flex-col gap-3">
        {/* Filter bar section */}
        <PackingFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Packing list section */}
        <PackingList
          items={filteredItems}
          isFiltered={isFiltered}
        />
      </div>
    </div>
  );
}
