import { useState } from "react";

export function useNumberInput({
  initialValue,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onChange,
}) {
  const [value, setValue] = useState(initialValue);

  const increment = () => {
    if (value < max) {
      const newValue = value + step;
      setValue(newValue);
      onChange(newValue);
    }
  };

  const decrement = () => {
    if (value > min) {
      const newValue = value - step;
      setValue(newValue);
      onChange(newValue);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (/^-?\d*$/.test(val)) {
      const newValue = Number(val);
      setValue(newValue);
      onChange(newValue);
    }
  };

  return {
    value,
    increment,
    decrement,
    handleChange,
  };
}
