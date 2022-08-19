import React, { useState } from "react";
import { ReactCalendar } from "./react-calendar";
function App() {
  //date to be selected
  let [date, setDate] = useState([]);
  let [multiple, setMultiple] = useState(false);
  //the date which are unavailable will be fetched from the server
  let unavailableDates;
  //it will handle the date state change
  const handleDate = (selecteddate) => {
    setDate(selecteddate);
  };

  return (
    <div className='app' style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <label for='multiple'>Select Multiple Items</label>
        <input
          name='multiple'
          type='checkbox'
          value={multiple}
          onChange={() => setMultiple((prev) => !prev)}
        />
      </div>
      <ReactCalendar
        multiple={multiple}
        date={date}
        handleDate={handleDate}
        unavailableDates={unavailableDates}
      />
    </div>
  );
}

export default App;
