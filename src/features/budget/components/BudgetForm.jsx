import { useState } from 'react';
import { BUDGET_CATEGORIES, BUDGET_STATUS } from '../budgetConstants';
import { FormModal } from '@/components/modals/FormModal';
import { Input } from '@/components/ui/input';

const DEFAULT_FORM_DATA = {
  name: '',
  category: BUDGET_CATEGORIES.TRANSPORT,
  estimatedCost: '',
  actualCost: '',
  paymentStatus: BUDGET_STATUS.UNPAID
};

const normalizeInitialValues = (initialValues) => ({
  name: initialValues?.name || '',
  category: initialValues?.category || BUDGET_CATEGORIES.TRANSPORT,
  estimatedCost: initialValues?.estimatedCost ?? '',
  actualCost: initialValues?.actualCost ?? '',
  paymentStatus: initialValues?.paymentStatus || BUDGET_STATUS.UNPAID
});

export function BudgetForm({ isOpen, initialValues, remainingBudget, onSubmit, onClose }) {
  const isEditMode = Boolean(initialValues);
  const [formData, setFormData] = useState(
    initialValues ? normalizeInitialValues(initialValues) : DEFAULT_FORM_DATA
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const nextState = { ...prev, [name]: value };

      if (name === 'actualCost') {
        const numericActual = Number(value);
        const isPaid = value !== '' && !isNaN(numericActual) && numericActual > 0;
        nextState.paymentStatus = isPaid ? BUDGET_STATUS.PAID : BUDGET_STATUS.UNPAID;
      }

      return nextState;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Item name is required';

    if (formData.estimatedCost === '' || isNaN(formData.estimatedCost)) {
      newErrors.estimatedCost = 'Estimated cost is required';
    } else if (Number(formData.estimatedCost) <= 0) {
      newErrors.estimatedCost = 'Estimated cost must be greater than 0';
    }

    if (formData.actualCost !== '' && isNaN(formData.actualCost)) {
      newErrors.actualCost = 'Actual cost must be a number';
    }

    const estimated = Number(formData.estimatedCost);
    if (!isEditMode && !isNaN(estimated) && estimated > remainingBudget) {
      newErrors.estimatedCost = `Estimated cost must be less than remaining budget ($${remainingBudget.toFixed(2)}).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const actual = Number(formData.actualCost);
      const isPaid = formData.actualCost !== '' && !isNaN(actual) && actual > 0;
      const payload = {
        name: formData.name.trim(),
        category: formData.category,
        estimatedCost: Number(formData.estimatedCost),
        actualCost: isPaid ? actual : '',
        paymentStatus: isPaid ? BUDGET_STATUS.PAID : BUDGET_STATUS.UNPAID
      };

      onSubmit(payload);
      onClose();
    }
  };

  const handleNumberInvalid = (e) => {
    e.target.setCustomValidity('Please enter a valid number.');
  };

  const clearNumberValidity = (e) => {
    e.target.setCustomValidity('');
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={isEditMode ? 'Edit Budget Item' : 'Add Budget Item'}
      submitLabel={isEditMode ? 'Update' : 'Save'}
    >
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">Item Name</label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Paris Airfare"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            {Object.values(BUDGET_CATEGORIES).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Estimated Cost ($)</label>
          <Input
            type="number"
            step="0.01"
            name="estimatedCost"
            value={formData.estimatedCost}
            onChange={handleChange}
            onInvalid={handleNumberInvalid}
            onInput={clearNumberValidity}
            className={errors.estimatedCost ? 'border-destructive' : ''}
          />
          {errors.estimatedCost && <p className="text-xs text-destructive">{errors.estimatedCost}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Actual Cost ($)</label>
          <Input
            type="number"
            step="0.01"
            name="actualCost"
            value={formData.actualCost}
            onChange={handleChange}
            onInvalid={handleNumberInvalid}
            onInput={clearNumberValidity}
            className={errors.actualCost ? 'border-destructive' : ''}
          />
          {errors.actualCost && <p className="text-xs text-destructive">{errors.actualCost}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <Input type="text" value={formData.paymentStatus} disabled className="uppercase" />
        </div>
      </div>
    </FormModal>
  );
}
