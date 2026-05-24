import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TripForm } from "./TripForm";
import { Download, MoreHorizontal, Plus, RefreshCcw, Share2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setSelectedTrip } from "../tripSlice";
import {
  clearTripData,
  createTrip,
  deleteTrip,
  exportTripData,
  fetchTrips,
  shareTripByEmail,
} from "../tripThunks";
import { selectCurrentUser } from "@/features/auth/authSelector";
import {
  selectSelectedTrip,
  selectSelectedTripAccessRole,
  selectTrips,
} from "../tripSelector";
import { ShareTripForm } from "./ShareTripForm";

export function TripSelector() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const trips = useSelector(selectTrips);
  const selectedTrip = useSelector(selectSelectedTrip);
  const selectedTripAccessRole = useSelector(selectSelectedTripAccessRole); // owner or guest

  const [isTripFormOpen, setTripFormOpen] = useState(false);
  const [isShareFormOpen, setShareFormOpen] = useState(false);
  const [isClearModalOpen, setClearModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchTrips());
    }
  }, [currentUser, dispatch]);

  const handleSelectTrip = (tripId) => {
    dispatch(setSelectedTrip(tripId));
  };

  const handleCreateTrip = (newTrip) => {
    dispatch(createTrip(newTrip));
    setTripFormOpen(false);
  };

  const handleClearTripData = () => {
    setActionError("");
    dispatch(clearTripData())
      .unwrap()
      .then(() => setClearModalOpen(false))
      .catch((error) => setActionError(error?.message || "Something went wrong."));
  };

  const handleDeleteTrip = () => {
    setActionError("");
    dispatch(deleteTrip())
      .unwrap()
      .then(() => setDeleteModalOpen(false))
      .catch((error) => setActionError(error?.message || "Something went wrong."));
  };

  const handleShareTrip = ({ email }) => {
    setActionError("");
    dispatch(shareTripByEmail(email))
      .unwrap()
      .then(() => setShareFormOpen(false))
      .catch((error) => setActionError(error?.message || "Something went wrong."));
  };

  const handleExportTrip = () => {
    setActionError("");
    dispatch(exportTripData())
      .unwrap()
      .catch((error) => setActionError(error?.message || "Something went wrong."));
  };

  const handleOpenShareForm = () => {
    setActionError("");
    setShareFormOpen(true);
  };

  const handleOpenClearModal = () => {
    setActionError("");
    setClearModalOpen(true);
  };

  const handleOpenDeleteModal = () => {
    setActionError("");
    setDeleteModalOpen(true);
  };

  return (
    <div className="flex items-center gap-2">
      {selectedTripAccessRole && (
        <Badge variant={selectedTripAccessRole === "owner" ? "default" : "secondary"}>
          {selectedTripAccessRole === "owner" ? "Owner" : "Guest"}
        </Badge>
      )}

      {/* Trip Select */}
      <div className="w-25 ">
        <Select value={selectedTrip?.id ?? ""} onValueChange={handleSelectTrip}>
          <SelectTrigger className="bg-background w-full">
            <SelectValue placeholder="Select a trip" />
          </SelectTrigger>
          <SelectContent>
            {trips.map((trip) => (
              <SelectItem key={trip.id} value={String(trip.id)}>
                {trip.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Trip Options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline" title="Trip options">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onSelect={() => setTripFormOpen(true)}>
            <Plus className="h-4 w-4" />
            Add trip
          </DropdownMenuItem>

          {selectedTrip && (
            <DropdownMenuItem onSelect={handleExportTrip}>
              <Download className="h-4 w-4" />
              Export JSON
            </DropdownMenuItem>
          )}

          {(selectedTripAccessRole === "owner") && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleOpenShareForm}>
                <Share2 className="h-4 w-4" />
                Share trip
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleOpenClearModal}>
                <RefreshCcw className="h-4 w-4" />
                Reset trip data
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onSelect={handleOpenDeleteModal}
              >
                <Trash className="h-4 w-4" />
                Delete trip
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Form Modal */}
      {isTripFormOpen && (
        <TripForm
          isOpen={isTripFormOpen}
          onClose={() => setTripFormOpen(false)}
          onSubmit={handleCreateTrip}
        />
      )}

      {isShareFormOpen && (
        <ShareTripForm
          isOpen={isShareFormOpen}
          onClose={() => setShareFormOpen(false)}
          onSubmit={handleShareTrip}
          error={actionError}
        />
      )}

      {isClearModalOpen && (
        <DeleteConfirmationModal
          isOpen={isClearModalOpen}
          onClose={() => setClearModalOpen(false)}
          onConfirm={handleClearTripData}
          title="Clear Trip Data"
          confirmLabel="Clear"
        >
          <div className="space-y-2">
            <p>
              Clear all planning data for{" "}
              <span className="font-bold text-gray-900">{selectedTrip?.name}</span>?
            </p>
            <p className="text-sm text-muted-foreground">
              The trip name, owner, and shared users will stay. Budget, itinerary,
              packing, and budget items will be reset.
            </p>
            {actionError && (
              <p className="text-sm font-medium text-destructive">{actionError}</p>
            )}
          </div>
        </DeleteConfirmationModal>
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteTrip}
          title="Delete Trip"
        >
          <div className="space-y-2">
            <p>
              Are you sure you want to delete{" "}
              <span className="font-bold text-gray-900">{selectedTrip?.name}</span>?
            </p>
            <p className="text-sm text-muted-foreground">
              This removes the trip and all related planning data.
            </p>
            {actionError && (
              <p className="text-sm font-medium text-destructive">{actionError}</p>
            )}
          </div>
        </DeleteConfirmationModal>
      )}
    </div>
  );
}
