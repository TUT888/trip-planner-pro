import { Plane } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function GuestWelcomeCard() {
  return (
    <div className="my-auto">
      <Card className="px-8 py-8 text-center">
        <CardContent>
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-white">
            <Plane className="h-8 w-8" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Welcome to Trip Planner</h1>

          <p className="mx-auto mt-3 pb-3 max-w-82.5 text-sm leading-6 text-gray-600">
            Organize your travel with ease, planning itineraries, managing packing, and tracking your budget.
          </p>


          <p className="mx-auto pt-3 max-w-82.5 text-sm leading-6 text-gray-600 border-t-2">
            Sign in to access your trips and start planning your next adventure.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
