import { useState } from "react";

export function useFilters(initialFilters) {
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (partial) => {
    setFilters((prev) => ({
      ...prev,
      ...partial,
    }));
  };

  const isFiltered = Object.entries(filters).some(
    ([key, val]) => val !== initialFilters[key],
  );

  const clearFilters = () => setFilters(initialFilters);

  return [filters, handleFilterChange, isFiltered, clearFilters];
}
