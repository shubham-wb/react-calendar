import React, { useState, useEffect } from "react";
import { YearSelector } from "./YearSelector";
import LeftArrow from "./assets/left-arrow.svg";
import RightArrow from "./assets/right-arrow.svg";
import { LABEL_DAYS, LABEL_MONTHS } from "./constants";
export function Calendar({ data }) {
  let [mmyy, setMMYY] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  let [selection, setSelection] = useState([]);
  //populated array of dates
  let [dateArray, setDateArray] = useState([]);

  useEffect(() => {
    if (mmyy.month > 11) {
      setMMYY((prev) => ({ month: 0, year: prev.year + 1 }));
      return;
    }
    if (mmyy.month < 0) {
      setMMYY((prev) => ({ month: 11, year: prev.year - 1 }));
      return;
    }
    let firstDayOfMonth = new Date(mmyy.year, mmyy.month, 1).getDay();
    let array = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      array.push(null);
    }

    for (let i = 1; i <= LABEL_MONTHS[mmyy.month].days_count; i++) {
      array.push(i);
    }

    //check for leap year
    if (LABEL_MONTHS[mmyy.month].title === "February" && mmyy.year % 4 === 0) {
      array.push(29);
    }

    setDateArray(array);
  }, [mmyy]);

  //handle month change
  function handleMonthChange(type) {
    if (type === "next") {
      setMMYY((prev) => ({ month: prev.month + 1, year: prev.year }));
    } else if (type === "prev") {
      setMMYY((prev) => ({ month: prev.month - 1, year: prev.year }));
    } else {
      return;
    }
  }

  useEffect(() => {
    data.handleDate(selection);
  }, [selection]);

  function handleSelectedDate(selected_date) {
    if (selection.indexOf(selected_date) !== -1) {
      let newDate = selection.filter((elem) => elem !== selected_date);
      setSelection([...newDate]);
      return;
    }
    if (data.multiple) {
      setSelection((prev) => [...prev, selected_date]);
      return;
    } else {
      setSelection([selected_date]);
    }
  }
  return (
    <div className='calendar-body'>
      <div className='calendar-header'>
        <div className='year-selector'>
          {mmyy.month < 12 && mmyy.month > -1 ? (
            <YearSelector
              monthIndex={mmyy.month}
              year={mmyy.year}
              LABEL_MONTHS={LABEL_MONTHS}
            />
          ) : null}
        </div>
        <div className='month-selector'>
          <span>
            <img
              src={LeftArrow}
              alt='left-arrow'
              onClick={() => {
                handleMonthChange("prev");
              }}
            />
          </span>
          <span>
            <img
              src={RightArrow}
              alt='right-arrow'
              onClick={() => {
                handleMonthChange("next");
              }}
            />
          </span>
        </div>
      </div>
      <div className='day-label'>
        {LABEL_DAYS.map((day, index) => (
          <span className='day' aria-hidden='true' key={day + index}>
            {day}
          </span>
        ))}
      </div>
      <div className='month-label'>
        {dateArray.map((date, index) => (
          <div
            key={`date-${index}`}
            style={
              selection.indexOf(
                `${date < 10 ? "0" + date : date}${
                  mmyy.month < 9 ? "0" + (mmyy.month + 1) : mmyy.month + 1
                }${mmyy.year}`
              ) !== -1
                ? { backgroundColor: "yellow" }
                : { backgroundColor: "white" }
            }
            onClick={() => {
              handleSelectedDate(
                `${date < 10 ? "0" + date : date}${
                  mmyy.month < 9 ? "0" + (mmyy.month + 1) : mmyy.month + 1
                }${mmyy.year}`
              );
            }}
          >
            {date ? date : null}
          </div>
        ))}
      </div>
    </div>
  );
}
