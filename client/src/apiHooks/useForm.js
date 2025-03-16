import { useState } from "react";

export function useForm(initialValues, submitCallback) {
  const [formValues, setFormValues] = useState(initialValues);

  const changeHander = (e) => {
    setFormValues((formValues) => ({
      ...formValues,
      [e.target.name]: e.target.value,
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
    changeHander,
    sumbitHandler,
    roleChangeHandler,
    resetForm
  };
}
