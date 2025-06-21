function useInputValidation({ onlyNumbers, onlyLetters, onChange }) {
  const handleChange = (e) => {
    const value = e.target.value;

    if (onlyNumbers && !/^\d*$/.test(value)) return;

    if (onlyLetters && !/^[\p{L}\s]*$/u.test(value)) return;

    onChange(e);
  };

  return handleChange;
}

export default useInputValidation;
