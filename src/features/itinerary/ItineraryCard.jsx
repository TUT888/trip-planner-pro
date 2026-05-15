import { Badge } from "@/components/ui/badge";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Camera, EllipsisVertical, MapPin, Pencil, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
} from "@/features/itinerary/components/ui/alert-dialog";
import { useState } from "react";
import { ItineraryForm } from "@/features/itinerary/components/ItineraryForm";



export function ItineraryCard(props) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const isOverdue = Boolean(props.isOverdue);
    return (
        <>
            <DropdownMenu>
                <div
                    className={cn(
                        "activity_card flex flex-col gap-15 bg-[#c2f2e4] p-5 rounded-2xl shadow-lg shadow-[#299172]-700 border-2 border-[#cff5ea]",
                        isOverdue &&
                        "border-red-500 bg-gradient-to-br from-red-50/95 to-pink-100/85 ring-2 ring-pink-400/60 shadow-[0_4px_20px_rgb(244_114_182/0.28)]"
                    )}
                    data-overdue={isOverdue ? "true" : undefined}
                >
                    <div className="itinerary_top flex flex-col gap-2">
                        <div className="card_title flex justify-between">
                            <h1 className="text-4xl font-bold text-black">{props.activityTitle}</h1>
                            <DropdownMenuTrigger>
                                <EllipsisVertical className="text-[#3DC59D]" />
                            </DropdownMenuTrigger>
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
                        <Camera className="text-[#3DC59D]" />
                        {isOverdue && (
                            <Badge
                                variant="outline"
                                className="border-red-600 bg-pink-100 text-red-900 text-xs"
                            >
                                Overdue
                            </Badge>
                        )}
                        <Badge className="bg-[#3DC59D] text-xs">{props.priority}</Badge>
                        <Badge className="bg-[#3DC59D] text-xs">{props.status}</Badge>
                    </div>
                </div>

                <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onSelect={() => {
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
                            onSelect={() => {
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
            </DropdownMenu>

            {/* DialogContent is a sibling of DropdownMenu so portals/focus behave correctly */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent
                    showCloseButton
                    className={cn(
                        "top-0 right-0 bottom-0 left-auto h-full max-h-dvh w-full max-w-md translate-x-0 translate-y-0 rounded-none border-l sm:max-w-lg",
                        "flex flex-col gap-0 overflow-hidden p-0 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
                    )}
                >
                    <DialogHeader className="border-b px-6 py-4 text-left">
                        <DialogTitle>Update itinerary</DialogTitle>
                        <DialogDescription className="sr-only">
                            Edit activity details for this itinerary item.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-5 overflow-y-auto px-6 py-4">
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
                    </div>

                    <div className="mt-auto flex justify-end gap-2 border-t px-6 py-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="button">Update</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
