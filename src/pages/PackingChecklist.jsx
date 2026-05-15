import { useSelector, useDispatch } from "react-redux";

import { clearAll, setFilter } from "@/features/packing/packingSlice";
import { selectFilteredItems, selectPackingFilter } from "@/features/packing/packingSelector";

import { Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackingProgressBar } from "@/features/packing/components/PackingProgressBar";
import { PackingFilterBar } from "@/features/packing/components/PackingFilterBar";
import { PackingList } from "@/features/packing/components/PackingList";
import { TripSelector } from "@/features/packing/components/TripSelector";
import { useState } from "react";
import { PackingForm } from "@/features/packing/components/PackingForm";

export default function PackingChecklist() {
  const dispatch = useDispatch();
  const filters = useSelector(selectPackingFilter);
  const filteredItems = useSelector(selectFilteredItems);

  const [formOpen, setFormOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null)

  // Whether any filter is active (used for empty-state copy and "Clear filters" button)
  const isFiltered = filters.category !== "All" || filters.packedStatus !== "All";

  const handleFilterChange = (partial) => dispatch(setFilter(partial));
  const handleClearAll = () => {
    dispatch(clearAll());
  };

  const handleOpenForm = (selectedItem = null) => {
    setItemToEdit(selectedItem);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setItemToEdit(null);
    setFormOpen(false);
  };

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Packing Summary Data */}
      <div className="flex flex-row gap-5 p-2 shadow-sm rounded-sm items-center">
        <h1 className="text-2xl font-semibold">Packing Checklist</h1>

        <div className="flex-1">
          <PackingProgressBar />
        </div>

        <div className="flex flex-row items-center gap-2">
          <TripSelector />
          <Button
            variant="outline"
            size="default"
            onClick={() => handleOpenForm()}
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
      </div>

      <div className="flex flex-col gap-3">
        {/* Filter bar section */}
        <PackingFilterBar filters={filters} onFilterChange={handleFilterChange} />

        {/* Packing list section */}
        <PackingList items={filteredItems} isFiltered={isFiltered} onEditItem={handleOpenForm}/>
      </div>

      {/* Modal */}
      {formOpen && (
        <PackingForm itemToEdit={itemToEdit} onClose={handleCloseForm} />
      )}
    </div>
  );
}
