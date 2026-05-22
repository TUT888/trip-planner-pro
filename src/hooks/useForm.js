import { useState } from "react";

const createEmptyErrors = (values) => {
  if (!values) return {};

  return Object.keys(values).reduce((errors, key) => {
    errors[key] = "";
    return errors;
  }, {})
}

export function useForm({ defaultData, validator }) {
  const [data, setData] = useState(defaultData);
  const [errors, setErrors] = useState(createEmptyErrors(defaultData));  

  // Update specific key with value, and reset its error message
  const update = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const reset = (nextData = defaultData) => {
    setData(nextData);
    setErrors(createEmptyErrors(nextData));
  };

  const validate = () => {
    // No validator -> no need validation
    if (!validator) return true;

    // Assign new errors
    const newErrors = validator(data);
    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return false;
    }
    setErrors(createEmptyErrors(data));
    return true;
  };

  return {
    data,
    errors,
    update,
    reset,
    validate
  };
}