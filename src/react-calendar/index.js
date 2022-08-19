import React, { useEffect, useState } from "react";
import { Calendar } from "./Calendar";
import { validate } from "./constants";
import calendarIco from "./assets/calendar-icon.svg";
import "./styles.css";
export function ReactCalendar(props) {
  let [displayErr, showErrorMessage] = useState(false);
  let [dateInput, setDateInput] = useState("");
  let [calendar, showCalendar] = useState(true);
  useEffect(() => {
    if (dateInput !== "") {
      showCalendar(false);
      const isValid = validate(dateInput);
      if (!isValid) {
        showErrorMessage(true);
      } else {
        showErrorMessage(false);
      }
    } else {
      showErrorMessage(false);
    }
  }, [dateInput]);
  useEffect(() => {
    if (!props.multiple && props.date[0]) {
      let date =
        props.date[0].substring(0, 2) +
        "/" +
        props.date[0].substring(2, 4) +
        "/" +
        props.date[0].substring(4);

      setDateInput(date);
    }
  }, [props.multiple, props.date]);
  const invalidDateMessage = "Invalid Date";
  return (
    <div className='react-calendar-wrapper'>
      {calendar ? <Calendar data={props} /> : null}
      <div className='react-calendar-input'>
        {!props.multiple ? (
          <input
            type='text'
            placeholder='DD/MM/YYYY'
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          ></input>
        ) : (
          <input type='text' disabled></input>
        )}
        <span
          className='react-calendar-icon'
          onClick={() => {
            showCalendar((prev) => !prev);
          }}
        >
          <img src={calendarIco} alt='calendarIcon' className='calendar-icon' />
        </span>
      </div>
      <div className='error-message'>
        {displayErr ? invalidDateMessage : null}
      </div>
    </div>
  );
}
