//props requirement
/*
1. a function to handle the date change 
2. a  multiple  prop to indicate that we need to select multiple dates 
3. unavailable dates to disable the dates which are not available right now 
*/

/*
Design 
there will be an input bar shown with a calendar icon 
clicking on the calendar icon a component will be shown 
*/
import "./styles.css";
import { Calendar } from "./Calendar";
import React, { useEffect, useState } from "react";
import calendarIco from "./assets/calendarIcon.svg";
import { validate } from "./helpers/validate";
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

  const invalidDateMessage = "Invalid Date";
  return (
    <div className='react-calendar-wrapper'>
      {calendar ? <Calendar /> : null}
      <div className='react-calendar-input'>
        {!props.multiple ? (
          <input
            type='text'
            placeholder='dd/mm/yy'
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
