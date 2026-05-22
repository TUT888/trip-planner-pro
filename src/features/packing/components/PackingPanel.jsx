import { useSelector } from "react-redux";
import { useFilters } from "@/hooks/useFilters";
import { PackingList } from "./PackingList";
import { selectFilteredItems } from "../packingSelector";
import { PACKING_CATEGORY, PACKING_STATUS } from "../packingConstants";
import { Button } from "@/components/ui/button";

export function PackingFilterBar({ filters, onFilterChange }) {
  const categoryOptions = ["All", ...Object.values(PACKING_CATEGORY)];
  const statusOptions = ["All", ...Object.values(PACKING_STATUS)];
  const isAnyFilterActive = filters.category !== "All" || filters.packedStatus !== "All";

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-3">
      {/* Category group */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide shrink-0">
          Category
        </span>
        <div className="flex flex-wrap gap-1.5">
          {categoryOptions.map((cat) => (
            <Button
              key={cat} 
              variant={filters.category === cat ? "default" : "outline"}
              onClick={() => onFilterChange({ category: cat })}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        className="hidden sm:block h-5 w-px bg-gray-200 shrink-0"
        aria-hidden="true"
      />

      {/* Packed status group */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide shrink-0">
          Status
        </span>
        <div className="flex flex-wrap gap-1">
          {statusOptions.map((status) => (
            <Button 
              key={status} 
              variant={filters.packedStatus === status ? "default" : "outline"}
              onClick={() => onFilterChange({ packedStatus: status })}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      <Button
        variant="ghost"
        onClick={() =>
          onFilterChange({ category: "All", packedStatus: "All" })
        }
        className="hover:text-gray-800 ml-auto shrink-0"
        disabled={!isAnyFilterActive}
      >
        Clear filters
      </Button>
    </div>
  );
}

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