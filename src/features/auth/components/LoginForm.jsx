import { useForm } from '@/hooks/useForm';
import { FormModal } from '@/components/modals/FormModal';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const defaultForm = {
  email: "",
  password: ""
};

export function LoginForm({ isOpen, onClose, onSubmit, isSubmitting = false, error }) {
  const form = useForm({
    defaultData: defaultForm,
    validator: (formData) => {
      const newErrors = {};
      if (!formData.email.trim()) newErrors.email = "Email can not be empty.";
      if (!formData.password) newErrors.password = "Password can not be empty.";
      return newErrors;
    }
  })

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (!form.validate()) return;

    onSubmit(form.data);
  }

  const handleChangeEvent = (e) => {
    form.update(e.target.name, e.target.value);
  }

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitEvent}
      title="Login Form"
      submitLabel={isSubmitting ? "Logging in..." : "Login"}
      submitDisabled={isSubmitting}
    >
      {error && (
        <Alert variant="destructive" className="bg-red-50">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Field data-invalid={form.errors.email ? true : false}>
        <FieldLabel htmlFor="input-email" className="text-gray-500">
          Email
        </FieldLabel>
        <Input
          id="input-email"
          type="email"
          name="email"
          value={form.data.email}
          onChange={handleChangeEvent}
          placeholder="Enter your email"
          disabled={isSubmitting}
        />
        {form.errors.email && <FieldError>{form.errors.email}</FieldError>}
      </Field>

      <Field data-invalid={form.errors.password ? true : false}>
        <FieldLabel htmlFor="input-password" className="text-gray-500">
          Password
        </FieldLabel>
        <Input
          id="input-password"
          type="password"
          name="password"
          value={form.data.password}
          onChange={handleChangeEvent}
          placeholder="Enter your password"
          disabled={isSubmitting}
        />
        {form.errors.password && <FieldError>{form.errors.password}</FieldError>}
      </Field>
    </FormModal>
  )
}
