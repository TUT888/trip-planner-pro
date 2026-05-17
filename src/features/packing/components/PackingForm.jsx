import { useState } from "react";
import { PACKING_CATEGORY_STYLES, PACKING_CATEGORY, PACKING_PRIORITY, PACKING_STATUS, PACKING_PRIORITY_STYLES } from "../packingConstants";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const defaultForm = {
  name: "",
  category: PACKING_CATEGORY.OTHER,
  quantity: 1,
  requiredStatus: PACKING_PRIORITY.REQUIRED,
  packedStatus: PACKING_STATUS.NOT_PACKED,
};

const defaultErrors = {
  name: "",
  category: "",
  quantity: "",
  requiredStatus: "",
  packedStatus: "",
};

export function PackingForm({ itemToEdit, onSubmit, onClose }) {
  const [form, setForm] = useState(itemToEdit || defaultForm);
  const [errors, setErrors] = useState(defaultErrors);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Item name can not be empty.";
    if (form.quantity < 1)
      newErrors.quantity = "Quantity can not be lower than 1.";
    if (!Object.values(PACKING_CATEGORY).includes(form.category))
      newErrors.category = "Input category is invalid.";
    if (!Object.values(PACKING_PRIORITY).includes(form.requiredStatus))
      newErrors.requiredStatus = "Input required status is invalid.";
    if (!Object.values(PACKING_STATUS).includes(form.packedStatus))
      newErrors.packedStatus = "Input packing status is invalid.";

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        ...form,
        name: form.name.trim(),
      });
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  // For change event (normal input text and number)
  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    updateFormValue(name, value);
  };

  // Update value (shadcn's selector provide value directly instead of event object)
  const updateFormValue = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    
    if (errors[key] !== "") {
      console.log("Reset key");
      setErrors((prev) => ({
        ...prev,
        [key]: ""
      }))
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-5 bg-primary text-white">
          <h2 className="text-xl font-bold">
            {itemToEdit ? "Edit Packing Item" : "Add Packing Item"}
          </h2>
          <Button onClick={onClose} className="hover:bg-secondary/50 rounded">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form content */}
        <form onSubmit={handleSubmit}>
          {/* Input section */}
          <div className="p-6 space-y-6 bg-white">
            <Field data-invalid={errors.name ? true : false}>
              <FieldLabel
                htmlFor="input-name"
                className="uppercase text-gray-500"
              >
                Item Name
              </FieldLabel>
              <Input
                id="input-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChangeEvent}
                placeholder="e.g. Passport"
                className="h-10"
              />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>

            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field data-invalid={errors.category ? true : false}>
                <FieldLabel
                  htmlFor="input-category"
                  className="uppercase text-gray-500"
                >
                  Category
                </FieldLabel>
                <Select
                  id="input-category"
                  name="category"
                  value={form.category}
                  onValueChange={(value) =>
                    updateFormValue("category", value)
                  }
                >
                  <SelectTrigger size="lg" className={PACKING_CATEGORY_STYLES[form.category]}>
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(PACKING_CATEGORY).map(
                        (category, index) => (
                          <SelectItem key={index} value={category}>
                            {category}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.category && <FieldError>{errors.category}</FieldError>}
              </Field>

              <Field data-invalid={errors.quantity ? true : false}>
                <FieldLabel
                  htmlFor="input-quantity"
                  className="uppercase text-gray-500"
                >
                  Quantity
                </FieldLabel>
                <Input
                  id="input-quantity"
                  type="number"
                  min="1"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChangeEvent}
                  className="h-10"
                />
                {errors.quantity && <FieldError>{errors.quantity}</FieldError>}
              </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field data-invalid={errors.requiredStatus ? true : false}>
                <FieldLabel
                  id="input-required-status"
                  className="uppercase text-gray-500"
                >
                  Required Status
                </FieldLabel>
                <Select
                  id="input-required-status"
                  name="requiredStatus"
                  value={form.requiredStatus}
                  onValueChange={(value) =>
                    updateFormValue("requiredStatus", value)
                  }
                >
                  <SelectTrigger size="lg" className={PACKING_PRIORITY_STYLES[form.requiredStatus]}>
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(PACKING_PRIORITY).map(
                        (reqStatus, index) => (
                          <SelectItem key={index} value={reqStatus}>
                            {reqStatus}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.requiredStatus && (
                  <FieldError>{errors.requiredStatus}</FieldError>
                )}
              </Field>

              <Field data-invalid={errors.packedStatus ? true : false}>
                <FieldLabel
                  htmlFor="input-packed-status"
                  className="uppercase text-gray-500"
                >
                  Packed Status
                </FieldLabel>
                <Select
                  id="input-packed-status"
                  name="packedStatus"
                  value={form.packedStatus}
                  onValueChange={(value) =>
                    updateFormValue("packedStatus", value)
                  }
                >
                  <SelectTrigger size="lg">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(PACKING_STATUS).map(
                        (packStatus, index) => (
                          <SelectItem key={index} value={packStatus}>
                            {packStatus}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.packedStatus && (
                  <FieldError>{errors.packedStatus}</FieldError>
                )}
              </Field>
            </FieldGroup>
          </div>

          {/* Button section */}
          <div className="bg-gray-50 border-t p-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-5 text-gray-800 hover:bg-gray-100"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="px-6 py-5 bg-primary hover:bg-primary/80"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
