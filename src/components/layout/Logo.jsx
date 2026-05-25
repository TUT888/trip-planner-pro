import { Plane } from "lucide-react";
import { Link } from "react-router-dom";

export function AppLogo() {
  return (
    <Link className="flex items-center gap-2 min-w-fit">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
        <Plane className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-lg font-bold drop-shadow-sm text-primary hidden md:inline">
        TripPlannerPro
      </span>
    </Link>
  )
}