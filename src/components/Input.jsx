import React from "react";
import "../styles/Input.css";
import useInputValidation from "../hooks/useInputValidation";

function Input({
  label,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  onlyNumbers = false,
  onlyLetters = false,
  maxLength,
  type = "text",
  error = false,
  errorMessage = "",
}) {
  const handleChange = useInputValidation({
    onlyNumbers,
    onlyLetters,
    onChange,
  });

  return (
    <div className={`input ${error ? "input--error" : ""}`}>
      {label && (
        <label htmlFor={name} className="input__label">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        className={`input__field ${error ? "input__field--error" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        aria-invalid={error}
      />
      {error && errorMessage && (
        <span className="input__error">{errorMessage}</span>
      )}
    </div>
  );
}

export default Input;
