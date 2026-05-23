import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PackingHeader } from "@/features/packing/components/PackingHeader";
import { PackingPanel } from "@/features/packing/components/PackingPanel";
import { PackingProgressBar } from "@/features/packing/components/PackingProgressBar";
import { fetchPackingItems } from "@/features/packing/packingThunks";
import { selectSelectedTripId } from "@/features/trip/tripSelector";

export function PackingChecklist() {
  const dispatch = useDispatch();
  const selectedTripId = useSelector(selectSelectedTripId);

  useEffect(() => {
    if (selectedTripId) {
      dispatch(fetchPackingItems(selectedTripId));
    }
  }, [dispatch, selectedTripId]);

  return (
    <div className="flex flex-col h-full gap-3">
      <PackingHeader />
      <PackingProgressBar />
      <PackingPanel />
    </div>
  );
}
