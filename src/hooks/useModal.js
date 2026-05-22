import { useState } from "react";

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