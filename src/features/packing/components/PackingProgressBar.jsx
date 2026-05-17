import { useSelector } from "react-redux";
import { selectProgress } from "../packingSelector";

const VARIANT = {
  full: { bar: "bg-green-500", track: "bg-green-100", label: "text-green-800" },
  half: { bar: "bg-primary/50", track: "bg-gray-100", label: "text-primary" },
  base: { bar: "bg-primary/30", track: "bg-gray-100", label: "text-primary" }
}

export function PackingProgressBar() {
  const { packed, total, percentage } = useSelector(selectProgress);
  const variant = percentage === 100 ? VARIANT.full : percentage >= 50 ? VARIANT.half : VARIANT.base;

  return (
    <div className="flex items-center gap-3">
      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Packing progress: ${packed} of ${total} items packed`}
        className={`relative flex-1 h-5 rounded-full overflow-hidden ${variant.track}`}
      >
        {/* Fill */}
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${variant.bar}`}
          style={{ width: `${percentage}%` }}
        />
        
        {/* Inline percentage label */}
        <span
          className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${variant.label}`}
        >
          {percentage}%
        </span>
      </div>

      {/* Fractional count — e.g. "3 / 10" */}
      <span className="text-xs text-gray-800 font-medium whitespace-nowrap shrink-0">
        {packed} / {total}
      </span>
    </div>
  );
}
