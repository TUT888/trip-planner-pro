import { PackingHeader } from "@/features/packing/components/PackingHeader";
import { PackingPanel } from "@/features/packing/components/PackingPanel";

export function PackingChecklist() {
  return (
    <div className="flex flex-col h-full gap-3">
      <PackingHeader />

      <PackingPanel />
    </div>
  );
}
