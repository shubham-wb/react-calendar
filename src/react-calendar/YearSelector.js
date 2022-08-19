import React from "react";
export function YearSelector({ LABEL_MONTHS, monthIndex, year }) {
  return <div>{`${LABEL_MONTHS[monthIndex].title}  ${year}`} </div>;
}
