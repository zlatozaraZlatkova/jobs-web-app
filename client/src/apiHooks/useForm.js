import { useState } from "react";

export function useForm(initialValues, submitCallback) {
  const [formValues, setFormValues] = useState(initialValues);

  const changeHander = (e) => {
    const { name, type, checked, value } = e.target;

    setFormValues((formValues) => ({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const roleChangeHandler = (e) => {
    setFormValues((formValues) => ({
      ...formValues,
      role: e.target.value,
    }));
  };

  const sumbitHandler = (e) => {
    e.preventDefault();

    submitCallback(formValues);
  };

  const resetForm = () => {
    setFormValues(initialValues);
  };

  return {
    formValues,
    setFormValues,
    changeHander,
    sumbitHandler,
    roleChangeHandler,
    resetForm
  };
}
