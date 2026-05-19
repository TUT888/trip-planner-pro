import { useSelector } from "react-redux";
import { useFilters } from "@/hooks/useFilters";
import { PackingFilterBar } from "./PackingFilterBar";
import { PackingList } from "./PackingList";
import { selectFilteredItems } from "../packingSelector";

export function PackingPanel() {
  const [filters, handleFilterChange, isFiltered] = useFilters({
    category: "All",
    packedStatus: "All",
  })
  const filteredItems = useSelector((state) => selectFilteredItems(state, filters));

  return (
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
  )
}