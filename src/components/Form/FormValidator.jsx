import React from "react";

const FormValidator = ({ validate, children }) => {
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = validate();
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
  };

  return children({ validateForm, clearErrors, errors });
};

export default FormValidator;
