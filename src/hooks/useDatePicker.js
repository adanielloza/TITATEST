import { useState } from "react";

const useDatePicker = (initialValue, minDate, maxDate) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialValue);

  const handleCalendarToggle = () => {
    setIsCalendarVisible((prevState) => !prevState);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return {
    isCalendarVisible,
    selectedDate,
    handleCalendarToggle,
    handleDateChange,
    minDate,
    maxDate,
  };
};

export default useDatePicker;
