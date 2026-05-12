import { Badge } from "@/components/ui/badge";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuShortcut, DropdownMenuSubContent, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Camera, EllipsisVertical, MapPin, Pencil, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";


export function ItineraryCard(props) {
    return (
        <Dialog>
        <DropdownMenu>
            <div className="activity_card flex flex-col gap-15 bg-[#c2f2e4] p-5 rounded-2xl shadow-lg shadow-[#299172]-700 border-2 border-[#cff5ea]">
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
                <div className="itinerary_bottom flex gap-2 items-center">
                    <Camera className="text-[#3DC59D]" />
                    <Badge className="bg-[#3DC59D] text-xs">{props.priority}</Badge>
                    <Badge className="bg-[#3DC59D] text-xs">{props.status}</Badge>
                </div>
            </div>

            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                        Edit
                        <DropdownMenuShortcut><Pencil /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    </DialogTrigger>
                    
                    <DropdownMenuItem className="text-red-500">
                        Delete
                        <DropdownMenuShortcut><Trash2 className="text-red-500" /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
            
                
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>

                <div>
                    <label className="text-sm">Name</label>
                    <Input placeholder="Enter here"/>

                    <label className="text-sm">Location</label>
                    <Input placeholder="Enter here"/>

                    <label className="text-sm">Date</label>
                </div>
                </DialogContent>
            
        </DropdownMenu>
        </Dialog>



    )
}