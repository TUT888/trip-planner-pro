// Options
export const PACKING_CATEGORY = Object.freeze({
  CLOTHES: "Clothes",
  DOCUMENTS: "Documents",
  ELECTRONICS: "Electronics",
  MEDICINE: "Medicine",
  PERSONAL: "Personal",
  OTHER: "Other",
});

export const PACKING_PRIORITY = Object.freeze({
  REQUIRED: "Required",
  OPTIONAL: "Optional"
});

export const PACKING_STATUS = Object.freeze({
  NOT_PACKED: "Not Packed",
  PACKED: "Packed"
});

// Stylings
export const PACKING_CATEGORY_STYLES = {
  Clothes: "bg-green-100 text-green-800",
  Documents: "bg-blue-100 text-blue-800",
  Electronics: "bg-purple-100 text-purple-800",
  Medicine: "bg-red-100 text-red-800",
  Personal: "bg-amber-100 text-amber-800",
  Other: "bg-gray-100 text-gray-700",
};

export const PACKING_PRIORITY_STYLES = {
  Required: "bg-red-100 text-red-800",
  Optional: "bg-sky-100 text-sky-600"
}