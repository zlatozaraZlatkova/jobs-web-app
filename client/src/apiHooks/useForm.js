import { useState } from "react";

export function useForm(initialValues, submitCallback) {
    const [formValues, setFormValues] = useState(initialValues);

    const changeHander = (e) => {
        setFormValues((formValues) => ({
            ...formValues,
            [e.target.name]: e.target.value
        }))

    }

    const sumbitHander = (e) => {
        e.preventDefault();

        submitCallback(formValues);
    }

    return {
        formValues,
        changeHander,
        sumbitHander
    }

}