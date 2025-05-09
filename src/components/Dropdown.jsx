import React from "react";
import "../styles/Dropdown.css";

function Dropdown({
  label,
  name,
  value,
  options = [],
  onChange,
  required = false,
  disabled = false,
  error = false,
  errorMessage = "",
  placeholder = "Seleccione una opción",
}) {
  const formattedOptions = options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option
  );

  return (
    <div className={`dropdown ${error ? "dropdown--error" : ""}`}>
      {label && (
        <label htmlFor={name} className="dropdown__label">
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="dropdown__field"
        aria-invalid={error}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {formattedOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && errorMessage && (
        <span className="dropdown__error">{errorMessage}</span>
      )}
    </div>
  );
}

export default Dropdown;
