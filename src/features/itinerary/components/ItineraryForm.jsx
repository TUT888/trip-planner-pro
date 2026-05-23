import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ITINERARY_CATEGORY_OPTIONS,
    ITINERARY_PRIORITY_OPTIONS,
    ITINERARY_STATUS_OPTIONS,
    normalizeItineraryCategory,
    normalizeItineraryPriority,
    normalizeItineraryStatus,
} from "@/features/itinerary/itineraryEnums";


function parseDateString(dateString) {
    if (!dateString) return undefined;

    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
}
function formatDateForData(date) {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


export function ItineraryForm({ initialValues, onSubmit }) {
    const [formData, setFormData] = useState({
        activityTitle: initialValues?.activityTitle || "",
        location: initialValues?.location || "",
        date: initialValues?.date || "",
        time: initialValues?.time || "12:30:00",
        category: normalizeItineraryCategory(initialValues?.category),
        priority: normalizeItineraryPriority(initialValues?.priority),
        status: normalizeItineraryStatus(initialValues?.status),
    });
    const [errors, setErrors] = useState({});


    const [selectedDate, setSelectedDate] = useState(
        parseDateString(initialValues?.date)
    );
    function updateField(fieldName, value) {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    }
    function validateForm() {
        const newErrors = {};

        if (!formData.activityTitle.trim()) {
            newErrors.activityTitle = "Name is required";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        }

        if (!formData.date) {
            newErrors.date = "Date is required";
        }

        if (!formData.time) {
            newErrors.time = "Time is required";
        }

        if (!formData.category) {
            newErrors.category = "Category is required";
        }

        if (!formData.priority) {
            newErrors.priority = "Priority is required";
        }

        if (!formData.status) {
            newErrors.status = "Status is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const isValid = validateForm();

        if (!isValid) {
            return;
        }
        onSubmit?.(formData);

    }


    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Name</label>
                <input
                    className="rounded-lg border border-input px-2.5 py-2"
                    placeholder="Enter activity name"
                    value={formData.activityTitle}
                    onChange={(event) => updateField("activityTitle", event.target.value)}
                />
                {errors.activityTitle && (
                    <p className="text-sm text-red-500">{errors.activityTitle}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Location</label>
                <input
                    className="rounded-lg border border-input px-2.5 py-2"
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={(event) => updateField("location", event.target.value)}
                />
                {errors.location && (
                    <p className="text-sm text-red-500">{errors.location}</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Date</span>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            type="button"
                            variant="outline"
                            data-empty={!selectedDate}
                            className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                        >
                            <CalendarIcon />
                            {selectedDate ? selectedDate.toLocaleDateString() : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                                setSelectedDate(date);
                                updateField("date", formatDateForData(date));
                            }}

                        />
                    </PopoverContent>
                </Popover>
                {errors.date && (
                    <p className="text-sm text-red-500">{errors.date}</p>
                )}

            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Time</span>

                <Field>
                    <InputGroup>
                        <InputGroupInput
                            type="time"
                            step="1"
                            value={formData.time}
                            onChange={(event) => updateField("time", event.target.value)}
                            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />

                    </InputGroup>
                </Field>
                {errors.time && (
                    <p className="text-sm text-red-500">{errors.time}</p>
                )}

            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Category</span>

                <Select
                    value={formData.category}
                    onValueChange={(value) => updateField("category", value)}
                >

                    <SelectTrigger className="w-full max-w-full">
                        <SelectValue placeholder="Pick category" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {ITINERARY_CATEGORY_OPTIONS.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {errors.category && (
                    <p className="text-sm text-red-500">{errors.category}</p>
                )}

            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Priority</span>

                <Select
                    value={formData.priority}
                    onValueChange={(value) => updateField("priority", value)}
                >

                    <SelectTrigger className="w-full max-w-full">
                        <SelectValue placeholder="Pick priority" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {ITINERARY_PRIORITY_OPTIONS.map((priority) => (
                                <SelectItem key={priority} value={priority}>
                                    {priority}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {errors.priority && (
                    <p className="text-sm text-red-500">{errors.priority}</p>
                )}

            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Status</span>

                <Select
                    value={formData.status}
                    onValueChange={(value) => updateField("status", value)}
                >

                    <SelectTrigger className="w-full max-w-full">
                        <SelectValue placeholder="Pick status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {ITINERARY_STATUS_OPTIONS.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {errors.status && (
                    <p className="text-sm text-red-500">{errors.status}</p>
                )}

            </div>






            <button
                type="submit"
                className="rounded-lg bg-primary px-3 py-2 text-primary-foreground"
            >
                Save
            </button>
        </form>
    );
}
