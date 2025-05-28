import React from "react";
import "../styles/TextArea.css";

function TextArea({
  label,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  error = false,
  errorMessage = "",
  placeholder = "Escribe aquí...",
  rows = 4,
  maxLength,
}) {
  return (
    <div className={`textarea ${error ? "textarea--error" : ""}`}>
      {label && (
        <label htmlFor={name} className="textarea__label">
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        className="textarea__field"
        aria-invalid={error}
        maxLength={maxLength}
      />

      {error && errorMessage && (
        <span className="textarea__error">{errorMessage}</span>
      )}
    </div>
  );
}

export default TextArea;
