import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PACKING_CATEGORY, PACKING_STATUS } from "@/features/packing/packingConstants";

// Filter option definitions 
const CATEGORIES = ["All", ...Object.values(PACKING_CATEGORY)];
const PACKED_STATUSES = ["All", ...Object.values(PACKING_STATUS)];

// Pill button 
function FilterPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
        "border transition-all duration-150 whitespace-nowrap",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        active
          ? "bg-pink-500 text-white border-pink-500 shadow-sm"
          : "bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-700",
      )}
    >
      {label}
    </button>
  );
}

// Main component 
export function PackingFilterBar({ filters, onFilterChange }) {
  const isAnyFilterActive =
    filters.category !== "All" || filters.packedStatus !== "All";

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-3">
      {/* Category group */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide shrink-0">
          Category
        </span>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              active={filters.category === cat}
              onClick={() => onFilterChange({ category: cat })}
            />
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
        <div className="flex flex-wrap gap-1.5">
          {PACKED_STATUSES.map((status) => (
            <FilterPill
              key={status}
              label={status}
              active={filters.packedStatus === status}
              onClick={() => onFilterChange({ packedStatus: status })}
            />
          ))}
        </div>
      </div>

      {/* Clear filters */}
      <Button
        variant="ghost"
        size="sm"
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
