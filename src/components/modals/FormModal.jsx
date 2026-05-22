import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
  description, // Optional, provide description for this form
  submitLabel, // Optional, it will be used as button's name
  children, // Add your form elements here as the CHILDREN
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {/* Header */}
        <DialogHeader className="pb-2 border-b-2 text-center">
          <DialogTitle className="text-primary uppercase text-xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {description}
          </DialogDescription>
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

            <Button variant="default" type="submit" className="hover:bg-primary/80">{submitLabel || "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}