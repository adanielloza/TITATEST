import React from "react";
import { useNumberInput } from "../hooks/useNumberInput";
import "../styles/Spinner.css";

function Spinner({
  label,
  name,
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  disabled = false,
  required = false,
  error = false,
  errorMessage = "",
  type = "text",
  pattern = "[-+]?d*",
}) {
  const {
    value: numberValue,
    increment,
    decrement,
    handleChange,
  } = useNumberInput({
    initialValue: value,
    min,
    max,
    step,
    onChange,
  });

  return (
    <div className={`number-input ${error ? "number-input--error" : ""}`}>
      {label && (
        <label htmlFor={name} className="number-input__label">
          {label}
        </label>
      )}

      <div className="number-input__wrapper">
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || numberValue <= min}
          className="number-input__button decrement"
          aria-label="Decrement value"
        >
          −
        </button>

        <input
          type={type}
          id={name}
          name={name}
          className="number-input__field"
          value={numberValue}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          inputMode="numeric"
          pattern={pattern}
          aria-invalid={error}
          aria-describedby={errorMessage && `${name}-error`}
        />

        <button
          type="button"
          onClick={increment}
          disabled={disabled || (max !== undefined && numberValue >= max)}
          className="number-input__button increment"
          aria-label="Increment value"
        >
          +
        </button>
      </div>

      {error && errorMessage && (
        <span id={`${name}-error`} className="number-input__error">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default Spinner;
