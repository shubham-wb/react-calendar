import React from "react";
import { YearSelector } from "./YearSelector";
export function Calendar() {
  return (
    <div className='calendar-body'>
      <div className='calendar-header'>
        <div className='year-selector'>
          <YearSelector />
        </div>
        <div className='month-selector'>
          <svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'>
            <path d='M28 34 18 24l10-10Z' />
          </svg>
          <svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'>
            <path d='M20 34V14l10 10Z' />
          </svg>
        </div>
      </div>
    </div>
  );
}
