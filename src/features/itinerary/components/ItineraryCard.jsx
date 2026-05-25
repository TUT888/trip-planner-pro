import { Badge } from "@/components/ui/badge";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, MapPin, Pencil, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { ItineraryForm } from "@/features/itinerary/components/ItineraryForm";
import {
    getItineraryPriorityClassName,
    ITINERARY_STATUS_OPTIONS,
    normalizeItineraryCategory,
    normalizeItineraryPriority,
    normalizeItineraryStatus,
} from "@/features/itinerary/itineraryEnums";
import { ItineraryCategoryIcon } from "@/features/itinerary/components/ItineraryCategoryIcon";



export function ItineraryCard(props) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const canEdit = props.canEdit ?? true;
    const isOverdue = Boolean(props.isOverdue);
    const category = normalizeItineraryCategory(props.category) || props.category;
    const priority = normalizeItineraryPriority(props.priority) || props.priority;
    const priorityClassName = getItineraryPriorityClassName(priority);
    const status = normalizeItineraryStatus(props.status) || props.status;

    function handleStatusChange(nextStatus) {
        if (!canEdit) return;

        props.onUpdate?.({
            id: props.id,
            activityTitle: props.activityTitle,
            location: props.location,
            date: props.date,
            time: props.time,
            category,
            priority,
            status: nextStatus,
        });
    }

    return (
        <>
            <DropdownMenu>
                <div
                    className={cn(
                        "activity_card flex flex-col gap-15 bg-[#c2f2e4] p-5 rounded-2xl shadow-lg shadow-[#299172]-700 border-2 border-[#cff5ea]",
                        isOverdue &&
                        "border-4 border-red-800 bg-gradient-to-b from-red-800 via-30% to-red-800/50"
                    )}
                    data-overdue={isOverdue ? "true" : undefined}
                >
                    <div className="itinerary_top flex flex-col gap-2">
                        <div className="card_title flex justify-between">
                            <h1 className="text-4xl font-bold text-black">{props.activityTitle}</h1>
                            {canEdit && (
                                <DropdownMenuTrigger>
                                    <EllipsisVertical className="text-[#3DC59D]" />
                                </DropdownMenuTrigger>
                            )}
                        </div>
                        <div className="card_location flex gap-2">
                            <MapPin className="text-[#3DC59D]" />
                            <span className="text-sm font-light text-gray-800">{props.location}</span>
                            <span>•</span>

                            <div className="card_date_time text-sm flex gap-1.5">
                                <span className="text-sm font-light text-gray-800">{props.date}</span>
                                <span className="text-sm font-light text-black">{props.time}</span>
                            </div>
                        </div>
                    </div>
                    <div className="itinerary_bottom flex flex-wrap gap-2 items-center">
                        <Badge className="gap-1.5 bg-[#3DC59D] text-xs">
                            <ItineraryCategoryIcon
                                category={category}
                                className="size-3.5"
                                aria-hidden
                            />
                            {category}
                        </Badge>
                        {isOverdue && (
                            <Badge
                                variant="outline"
                                className="border-red-600 bg-pink-100 text-red-900 text-xs"
                            >
                                Overdue
                            </Badge>
                        )}
                        <Badge className={cn("text-xs", priorityClassName)}>{priority}</Badge>
                        {canEdit ? (
                            <div
                                className="flex flex-wrap gap-1 rounded-full bg-white/65 p-1"
                                role="group"
                                aria-label={`Change status for ${props.activityTitle}`}
                            >
                                {ITINERARY_STATUS_OPTIONS.map((statusOption) => {
                                    const isSelected = statusOption === status;

                                    return (
                                        <button
                                            key={statusOption}
                                            type="button"
                                            aria-pressed={isSelected}
                                            onClick={() => handleStatusChange(statusOption)}
                                            className={cn(
                                                "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DC59D]/40",
                                                isSelected
                                                    ? "bg-[#3DC59D] text-white shadow-sm"
                                                    : "text-gray-700 hover:bg-[#dff8f0] hover:text-gray-950"
                                            )}
                                        >
                                            {statusOption}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <Badge className="bg-[#3DC59D] text-xs">{status}</Badge>
                        )}
                    </div>
                </div>

                {canEdit && (
                    <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onSelect={(event) => {
                                    event.preventDefault();
                                    setEditOpen(true);
                                }}
                            >
                                Update
                                <DropdownMenuShortcut>
                                    <Pencil />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                variant="destructive"
                                className="text-red-500 focus:text-red-500"
                                onSelect={(event) => {
                                    event.preventDefault();
                                    setDeleteOpen(true);
                                }}
                            >
                                Delete
                                <DropdownMenuShortcut>
                                    <Trash2 className="text-red-500" />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                )}
            </DropdownMenu>

            {canEdit && (
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Update itinerary</DialogTitle>
                            <DialogDescription className="sr-only">
                                Edit activity details for this itinerary item.
                            </DialogDescription>
                        </DialogHeader>

                        <ItineraryForm
                            initialValues={{
                                activityTitle: props.activityTitle,
                                location: props.location,
                                date: props.date,
                                time: props.time,
                                category: props.category,
                                priority: props.priority,
                                status: props.status,
                            }}
                            onSubmit={(formData) => {
                                props.onUpdate?.({
                                    id: props.id,
                                    ...formData,
                                });
                                setEditOpen(false);
                            }}
                        />
                    </DialogContent>
                </Dialog>
            )}

            {canEdit && (
                <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete itinerary item?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently remove "{props.activityTitle}" from your itinerary.
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                variant="destructive"
                                onClick={() => props.onDelete?.(props.id)}
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}
