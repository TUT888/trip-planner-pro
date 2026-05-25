import { useSelector } from "react-redux";
import { useFilters } from "@/hooks/useFilters";
import { PackingList } from "./PackingList";
import { selectFilteredItems } from "../packingSelector";
import { PACKING_CATEGORY, PACKING_STATUS } from "../packingConstants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function PackingFilterBar({ filters, onFilterChange }) {
  const categoryOptions = ["All", ...Object.values(PACKING_CATEGORY)];
  const statusOptions = ["All", ...Object.values(PACKING_STATUS)];
  const isAnyFilterActive = filters.category !== "All" || filters.packedStatus !== "All";

  return (
    <div className="flex gap-x-5 gap-y-3 py-3 w-full">
      <div className="space-y-3">
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

export function PackingPanel({ canEdit = true }) {
  const [filters, handleFilterChange, isFiltered] = useFilters({
    category: "All",
    packedStatus: "All",
  })
  const filteredItems = useSelector((state) => selectFilteredItems(state, filters));

  return (
    <Card className="w-full">
      <CardContent>
        {/* Filter bar section */}
        <PackingFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Packing list section */}
        <PackingList
          items={filteredItems}
          isFiltered={isFiltered}
          canEdit={canEdit}
        />
      </CardContent>
    </Card>
  )
}
