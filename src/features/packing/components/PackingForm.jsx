import { useState } from "react";
import { useDispatch } from "react-redux";
import { PACKING_CATEGORY, PACKING_PRIORITY, PACKING_STATUS } from "../packingConstants";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToChecklist, updateCheckList } from "../packingSlice";

const defaultForm = {
  name: "",
  category: PACKING_CATEGORY.OTHER,
  quantity: 1,
  requiredStatus: PACKING_PRIORITY.REQUIRED,
  packedStatus: PACKING_STATUS.NOT_PACKED,
};

const defaulterrors = {
  name: "",
  category: "",
  quantity: "",
  requiredStatus: "",
  packedStatus: "",
};

export function PackingForm({ itemToEdit, onClose }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState(itemToEdit || defaultForm);

  const [errors, setErrors] = useState(defaulterrors);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Item name can not be empty."
    if (form.quantity < 1) newErrors.quantity = "Quantity can not be lower than 1."
    if (!Object.values(PACKING_CATEGORY).includes(form.category)) newErrors.category = "Input category is invalid."
    if (!Object.values(PACKING_PRIORITY).includes(form.requiredStatus)) newErrors.requiredStatus = "Input required status is invalid."
    if (!Object.values(PACKING_STATUS).includes(form.packedStatus)) newErrors.packedStatus = "Input packing status is invalid."
    
    if (Object.keys(newErrors).length === 0) {
      if (itemToEdit) {
        dispatch(updateCheckList({
          ...form,
          name: form.name.trim()
        }))
      } else {
        dispatch(addToChecklist({
          ...form,
          name: form.name.trim()
        }))
      }
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs p-2">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden">
        <div >
          <div className="flex justify-between items-center p-5 bg-primary text-white">
            <h2 className="text-xl font-bold">
              {itemToEdit ? "Edit Packing Item" : "Add Packing Item"}
            </h2>
            <Button
              onClick={onClose}
              className="hover:bg-secondary/50 rounded"
            >
              <X className="w-5 h-5"/>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Item Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Passport"
              className={`w-full p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.name ? "border-red-400" : "border-gray-200"
              }`}
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Object.values(PACKING_CATEGORY).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className={`w-full p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.quantity ? "border-red-400" : "border-gray-200"
                }`}
              />

              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Required Status
              </label>

              <select
                name="requiredStatus"
                value={form.requiredStatus}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value={PACKING_PRIORITY.REQUIRED}>{PACKING_PRIORITY.REQUIRED}</option>
                <option value={PACKING_PRIORITY.OPTIONAL}>{PACKING_PRIORITY.OPTIONAL}</option>
              </select>

              {errors.requiredStatus && (
                <p className="text-red-500 text-xs mt-1">{errors.requiredStatus}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Packed Status
            </label>

            <select
              name="packedStatus"
              value={form.packedStatus}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={PACKING_STATUS.NOT_PACKED}>{PACKING_STATUS.NOT_PACKED}</option>
              <option value={PACKING_STATUS.PACKED}>{PACKING_STATUS.PACKED}</option>
            </select>

            {errors.packedStatus && (
                <p className="text-red-500 text-xs mt-1">{errors.packedStatus}</p>
              )}
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={onClose}
              className="px-6 py-5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              size="lg"
              className="px-6 py-5 bg-primary hover:bg-primary/80 text-white rounded-full"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
