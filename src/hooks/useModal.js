import { useState } from "react";

export function useModal(defaultItem) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [targetItem, setTargetItem] = useState(defaultItem);

  const handleOpenModal = (item = defaultItem) => {
    setTargetItem(item);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setTargetItem(defaultItem);
    setIsOpen(false);
  };

  return [isOpen, handleOpenModal, handleCloseModal, targetItem]
}