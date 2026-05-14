export default function PackingProgressBar({ packed = 0, total = 0, percentage = 0 }) {
  /**
   * Derive a colour accent based on progress so the bar gives
   * immediate feedback: red → amber → green as the user packs.
   * All logic is local to this component; the parent only passes
   * the raw numbers.
   */
  const accent =
    percentage === 100
      ? { bar: "bg-green-500", track: "bg-green-100", label: "text-green-800" }
      : percentage >= 50
      ? { bar: "bg-pink-500", track: "bg-pink-100", label: "text-pink-900" }
      : { bar: "bg-pink-400", track: "bg-pink-100", label: "text-pink-900" };

  return (
    <div className="flex items-center gap-3  w-64">
      {/* Track */}
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
