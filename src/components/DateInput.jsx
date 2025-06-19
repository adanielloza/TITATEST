import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/DateInput.css";
import useDatePicker from "../hooks/useDatePicker";

export const formatDate = (date) => {
  if (!date) return "";
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("en-GB", options);
};

function DateInput({
  label,
  value,
  onChange,
  required = false,
  minDate,
  maxDate,
  showMonthYearPicker = false,
}) {
  const {
    isCalendarVisible,
    selectedDate,
    handleCalendarToggle,
    handleDateChange,
  } = useDatePicker(value, minDate, maxDate);

  const handleDateChangeWrapper = (date) => {
    handleDateChange(date);
    if (onChange) {
      onChange(date);
    }
    handleCalendarToggle();
  };

  return (
    <div className="date-input">
      {label && <label className="date-input__label">{label}</label>}
      <div className="date-input__wrapper">
        <input
          type="text"
          className="date-input__field"
          value={selectedDate ? formatDate(selectedDate) : ""}
          onClick={handleCalendarToggle}
          readOnly
          required={required}
        />
        {isCalendarVisible && (
          <div className="date-input__calendar">
            <Calendar
              onChange={handleDateChangeWrapper}
              value={selectedDate}
              minDate={minDate}
              maxDate={maxDate}
              selectRange={false}
              showMonthYearPicker={showMonthYearPicker}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DateInput;
