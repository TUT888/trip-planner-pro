import { useState } from "react";

// The reusable hook for forms and delete confirmation modals
// that requires initial data (itemToEdit or itemToDelete)
export function useModal(defaultItem) {
  const [isOpen, setIsOpen] = useState(false);
  const [targetItem, setTargetItem] = useState(defaultItem);

  const handleOpen = (item = defaultItem) => {
    setTargetItem(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setTargetItem(defaultItem);
    setIsOpen(false);
  };

  return { isOpen, handleOpen, handleClose, targetItem }
}