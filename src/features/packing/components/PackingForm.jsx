import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  PACKING_CATEGORY,
  PACKING_PRIORITY,
  PACKING_STATUS,
} from "../packingConstants";
import { FormModal } from "@/components/modals/FormModal";
import { packingListStyle } from "../packingStyles";
import { useForm } from "@/hooks/useForm";

// Default values
const defaultForm = {
  name: "",
  category: PACKING_CATEGORY.OTHER,
  quantity: 1,
  requiredStatus: PACKING_PRIORITY.REQUIRED,
  packedStatus: PACKING_STATUS.NOT_PACKED,
};

// Main components
export function PackingForm({
  isOpen,
  onClose,
  onSubmit,
  itemToEdit
}) {
  const form = useForm({
    defaultData: itemToEdit || defaultForm,
    validator: (formData) => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = "Item name can not be empty.";
      if (formData.quantity < 1)
        newErrors.quantity = "Quantity can not be lower than 1.";
      if (!Object.values(PACKING_CATEGORY).includes(formData.category))
        newErrors.category = "Input category is invalid.";
      if (!Object.values(PACKING_PRIORITY).includes(formData.requiredStatus))
        newErrors.requiredStatus = "Input required status is invalid.";
      if (!Object.values(PACKING_STATUS).includes(formData.packedStatus))
        newErrors.packedStatus = "Input packing status is invalid.";

      return newErrors;
    }
  });

  const handleClose = () => {
    onClose();
    form.reset();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.validate()) return;

    onSubmit({
      ...form.data,
      name: form.data.name.trim(),
    });
    form.reset();
  };

  const handleChangeEvent = (e) => {
    if (e.target.name === "quantity") {
      form.update(e.target.name, Number(e.target.value));
    } else {
      form.update(e.target.name, e.target.value);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title={itemToEdit ? "Edit Packing Item" : "Add Packing Item"}
    >
      <Field data-invalid={form.errors.name ? true : false}>
        <FieldLabel htmlFor="input-name" className="text-gray-500">
          Item Name
        </FieldLabel>
        <Input
          id="input-name"
          type="text"
          name="name"
          value={form.data.name}
          onChange={handleChangeEvent}
          placeholder="e.g. Passport"
        />
        {form.errors.name && <FieldError>{form.errors.name}</FieldError>}
      </Field>

      <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field data-invalid={form.errors.category ? true : false}>
          <FieldLabel htmlFor="input-category" className="text-gray-500">
            Category
          </FieldLabel>
          <Select
            id="input-category"
            name="category"
            value={form.data.category}
            onValueChange={(value) => form.update("category", value)}
          >
            <SelectTrigger
              className={packingListStyle.category[form.data.category]}
            >
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(PACKING_CATEGORY).map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {form.errors.category && <FieldError>{form.errors.category}</FieldError>}
        </Field>

        <Field data-invalid={form.errors.quantity ? true : false}>
          <FieldLabel htmlFor="input-quantity" className="text-gray-500">
            Quantity
          </FieldLabel>
          <Input
            id="input-quantity"
            type="number"
            min="1"
            name="quantity"
            value={form.data.quantity}
            onChange={handleChangeEvent}
          />
          {form.errors.quantity && <FieldError>{form.errors.quantity}</FieldError>}
        </Field>
      </FieldGroup>

      <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field data-invalid={form.errors.requiredStatus ? true : false}>
          <FieldLabel id="input-required-status" className="text-gray-500">
            Required Status
          </FieldLabel>
          <Select
            id="input-required-status"
            name="requiredStatus"
            value={form.data.requiredStatus}
            onValueChange={(value) =>
              form.update("requiredStatus", value)
            }
          >
            <SelectTrigger
              className={packingListStyle.priority[form.data.requiredStatus]}
            >
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(PACKING_PRIORITY).map((reqStatus, index) => (
                  <SelectItem key={index} value={reqStatus}>
                    {reqStatus}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {form.errors.requiredStatus && (
            <FieldError>{form.errors.requiredStatus}</FieldError>
          )}
        </Field>

        <Field data-invalid={form.errors.packedStatus ? true : false}>
          <FieldLabel htmlFor="input-packed-status" className="text-gray-500">
            Packed Status
          </FieldLabel>
          <Select
            id="input-packed-status"
            name="packedStatus"
            value={form.data.packedStatus}
            onValueChange={(value) => form.update("packedStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(PACKING_STATUS).map((packStatus, index) => (
                  <SelectItem key={index} value={packStatus}>
                    {packStatus}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {form.errors.packedStatus && (
            <FieldError>{form.errors.packedStatus}</FieldError>
          )}
        </Field>
      </FieldGroup>
    </FormModal>
  );
}
