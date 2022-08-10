import React, { useState } from "react";
import { ReactCalendar } from "./react-calendar";
function App() {
  //date to be selected
  let [date, setDate] = useState([]);
  //the date which are unavailable will be fetched from the server
  let unavailableDates;
  //it will handlethe date state change
  const handleDate = (selecteddate) => {
    setDate(selecteddate);
  };

  return (
    <div className='app'>
      <ReactCalendar
        handleDate={handleDate}
        unavailableDates={unavailableDates}
      />
    </div>
  );
}

export default App;
