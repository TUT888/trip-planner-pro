import { Input } from "@/components/ui/input";
import { FormModal } from "@/components/modals/FormModal";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useForm } from "@/hooks/useForm";

export function TripForm({ isOpen, onClose, onSubmit }) {
  const form = useForm({
    defaultData: { name: "", budget: 0 },
    validator: (formData) => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = "Trip name can not be empty.";
      if (formData.budget < 0) newErrors.budget = "Trip budget can not be negative.";
      return newErrors;
    }
  })

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    if (!form.validate()) return;

    onSubmit({
      ...form.data,
      name: form.data.name.trim(),
    });
  };

  const handleChangeEvent = (e) => {
    if (e.target.name === "budget") {
      form.update(e.target.name, Number(e.target.value));
    } else {
      form.update(e.target.name, e.target.value);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitEvent}
      title="Create New Trip"
    >
      <Field data-invalid={form.errors.name ? true : false}>
        <FieldLabel htmlFor="input-name" className="text-gray-500">
          Trip Name
        </FieldLabel>
        <Input
          id="input-name"
          type="text"
          name="name"
          value={form.data.name}
          onChange={handleChangeEvent}
          placeholder="e.g., Summer Vacation 2026"
        />
        {form.errors.name && <FieldError>{form.errors.name}</FieldError>}
      </Field>

      <Field data-invalid={form.errors.budget ? true : false}>
        <FieldLabel htmlFor="input-budget" className="text-gray-500">
          Budget
        </FieldLabel>
        <Input
          id="input-budget"
          type="number"
          min="0"
          name="budget"
          value={form.data.budget}
          onChange={handleChangeEvent}
        />
        {form.errors.budget && <FieldError>{form.errors.budget}</FieldError>}
      </Field>
    </FormModal>
  );
}
