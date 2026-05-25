import { PACKING_PRIORITY, PACKING_STATUS } from "./packingConstants";

// Given a checklist, calculate progress for all items (include both required and optional)
export const calculatePackingProgress = (checklist) => {
  if (!checklist || checklist.length === 0) return 0;

  const countPacked = checklist.filter((item) => item.packedStatus === PACKING_STATUS.PACKED).length;
  
  return (countPacked / checklist.length) * 100;
};

// Only calculate packed status for required items
export const calculateRequiredProgress = (checklist) => {
  if (!checklist) return 0;

  const requiredItems = checklist.filter((item) => item.requiredStatus === PACKING_PRIORITY.REQUIRED);
  return calculatePackingProgress(requiredItems);
};

// Only calculate packed status for optional items
export const calculateOptionalProgress = (checklist) => {
  if (!checklist) return 0;

  const optionalItems = checklist.filter(item => item.requiredStatus === PACKING_PRIORITY.OPTIONAL);
  return calculatePackingProgress(optionalItems);
};