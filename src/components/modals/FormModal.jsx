import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title, // Provide a suitable title for this form
  children, // Add your form elements here as the CHILDREN
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-primary uppercase text-xl text-center font-bold pb-2 border-b-2">
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Form content */}
        <form onSubmit={onSubmit}>
          {/* Input section */}
          <div className="px-1 pb-5 space-y-3">{children}</div>

          <DialogFooter className="grid grid-cols-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}