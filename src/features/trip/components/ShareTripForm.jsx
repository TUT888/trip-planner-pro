import { FormModal } from "@/components/modals/FormModal";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/useForm";

export function ShareTripForm({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  error,
}) {
  const form = useForm({
    defaultData: { email: "" },
    validator: (formData) => {
      const newErrors = {};
      if (!formData.email.trim()) newErrors.email = "Email can not be empty.";
      return newErrors;
    },
  });

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    if (!form.validate()) return;

    onSubmit({
      email: form.data.email.trim(),
    });
  };

  const handleChangeEvent = (e) => {
    form.update(e.target.name, e.target.value);
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitEvent}
      title="Share Trip"
      description="Add a registered user to this trip by email."
      submitLabel="Share"
      submitDisabled={isSubmitting}
    >
      <Field data-invalid={form.errors.email ? true : false}>
        <FieldLabel htmlFor="input-share-email" className="text-gray-500">
          User Email
        </FieldLabel>
        <Input
          id="input-share-email"
          type="email"
          name="email"
          value={form.data.email}
          onChange={handleChangeEvent}
          placeholder="Enter user email"
        />
        {form.errors.email && <FieldError>{form.errors.email}</FieldError>}
      </Field>

      {error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </FormModal>
  );
}
