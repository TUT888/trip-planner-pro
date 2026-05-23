import { PACKING_CATEGORY, PACKING_PRIORITY } from "./packingConstants";

export const packingListStyle = {
  category: {
    [PACKING_CATEGORY.CLOTHES]: "bg-green-100 text-green-800",
    [PACKING_CATEGORY.DOCUMENTS]: "bg-blue-100 text-blue-800",
    [PACKING_CATEGORY.ELECTRONICS]: "bg-purple-100 text-purple-800",
    [PACKING_CATEGORY.MEDICINE]: "bg-red-100 text-red-800",
    [PACKING_CATEGORY.PERSONAL]: "bg-amber-100 text-amber-800",
    [PACKING_CATEGORY.OTHER]: "bg-gray-100 text-gray-700",
  },
  priority: {
    [PACKING_PRIORITY.REQUIRED]: "bg-red-100 text-red-800",
    [PACKING_PRIORITY.OPTIONAL]: "bg-sky-100 text-sky-600"
  }
};