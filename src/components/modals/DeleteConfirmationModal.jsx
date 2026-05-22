import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title, // Optional, it is "Delete Confirmation" by default
  children, // Optional, but you SHOULD add a specific message as its CHILDREN
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {/* Header */}
        <DialogHeader>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
              <Trash className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle className="text-destructive font-bold">
                {title || "Delete Confirmation"}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-1">
          {children || (
            <span>
              Are you sure you want to delete this? This action can not be
              undone.
            </span>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="grid grid-cols-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            variant="destructive"
            onClick={() => onConfirm()}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
