import { useForm } from '@/hooks/useForm';
import { FormModal } from '@/components/modals/FormModal';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const defaultForm = {
  name: "",
  email: "",
  password: ""
};

export function RegisterForm({ isOpen, onClose, onSubmit }) {
  const form = useForm({
    defaultData: defaultForm,
    validator: (formData) => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = "Name can not be empty.";
      if (!formData.email.trim()) newErrors.email = "Email can not be empty.";
      if (!formData.password) newErrors.password = "Password can not be empty.";
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
  }

  const handleChangeEvent = (e) => {
    form.update(e.target.name, e.target.value);
  }

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitEvent}
      title="Register Form"
      submitLabel="Register"
    >
      <Field data-invalid={form.errors.name ? true : false}>
        <FieldLabel htmlFor="input-name" className="text-gray-500">
          Name
        </FieldLabel>
        <Input
          id="input-name"
          type="text"
          name="name"
          value={form.data.name}
          onChange={handleChangeEvent}
          placeholder="Enter your name"
        />
        {form.errors.name && <FieldError>{form.errors.name}</FieldError>}
      </Field>

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
        />
        {form.errors.password && <FieldError>{form.errors.password}</FieldError>}
      </Field>
    </FormModal>
  )
}
