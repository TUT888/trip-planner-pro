import { Plane } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { selectSelectedTrip } from "@/features/trip/tripSelector";
import { selectCurrentUser } from "@/features/auth/authSelector";

export function Home() {
  const selectedTrip = useSelector(selectSelectedTrip);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="my-auto">
      <Card className="px-8 py-8 text-center">
        <CardContent>
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-white">
            <Plane className="h-8 w-8" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser?.name}!</h1>

          {selectedTrip ? (
            <p className="mx-auto pt-3 max-w-82.5 text-sm leading-6 text-gray-600">
              Use Navigation Bar to start manage your trip plan.
            </p>
          ) : (
            <p className="mx-auto mt-3 pb-3 max-w-82.5 text-sm leading-6 text-gray-600">
              You haven't selected any trip yet, or create one to get started.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
