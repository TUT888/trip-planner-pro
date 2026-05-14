import { useSelector } from "react-redux";
import { selectProgress } from "../packingSelector";

const ACCENT = {
  full: { bar: "bg-green-500", track: "bg-green-100", label: "text-green-800" },
  half: { bar: "bg-pink-500", track: "bg-pink-100", label: "text-pink-900" },
  base: { bar: "bg-pink-400", track: "bg-pink-100", label: "text-pink-900" }
}

export function PackingProgressBar() {
  const { packed, total, percentage } = useSelector(selectProgress);
  const accent = percentage === 100 ? ACCENT.full : percentage >= 50 ? ACCENT.half : ACCENT.base;

  return (
    <div className="flex items-center gap-3 w-64">
      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Packing progress: ${packed} of ${total} items packed`}
        className={`relative flex-1 h-5 rounded-full overflow-hidden ${accent.track}`}
      >
        {/* Fill */}
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${accent.bar}`}
          style={{ width: `${percentage}%` }}
        />
        
        {/* Inline percentage label */}
        <span
          className={`absolute inset-0 flex items-center justify-center text-xs font-medium ${accent.label}`}
        >
          {percentage}%
        </span>
      </div>

      {/* Fractional count — e.g. "3 / 10" */}
      <span className="text-xs text-gray-500 whitespace-nowrap shrink-0">
        {packed} / {total}
      </span>
    </div>
  );
}
