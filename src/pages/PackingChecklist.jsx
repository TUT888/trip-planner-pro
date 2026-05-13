import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { calculatePackingProgress } from "@/features/packing/packingUtils";
import { SamplePackingComponent } from "@/features/packing/SamplePackingComponent";
import { Plus, RotateCcw } from "lucide-react";
import { useSelector } from "react-redux";

export function PackingChecklist() {
  const checklist = useSelector((state) => state.packing.checklist);

  const progress = calculatePackingProgress(checklist);

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Packing Summary Data */}
      <div className="flex flex-row justify-between items-stretch gap-5 p-2 shadow-sm rounded-sm">
        <h1 className="text-2xl">Packing Checklist</h1>

        <div className="flex-1 py-1 flex flex-row items-center gap-2">
          <Progress className="h-full" value={progress} />
          <span className="font-bold">{progress}%</span>
        </div>

        <div className="flex gap-2">
          <Button size="lg" variant="secondary" onClick={() => alert("Add checklist is being implemented")}>
            <Plus /> Add
          </Button>
          <Button size="lg" variant="destructive" onClick={() => alert("Clear checklist is being implemented")}>
            <RotateCcw /> Clear
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 shadow-sm rounded-sm">
        <SamplePackingComponent />
      </div>
    </div>
  );
}
