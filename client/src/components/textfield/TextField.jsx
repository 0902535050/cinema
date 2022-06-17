import React from "react";
import { ErrorMessage, useField } from "formik";
export const TextField = ({ label, disabled, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label style={{ fontWeight: "bold" }} htmlFor={field.name}>
        {label}
      </label>
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        disabled={disabled}
        autoComplete="off"
      />
      <ErrorMessage
        name={field.name}
        component="div"
        className="errorTextField"
      />
    </div>
  );
};
