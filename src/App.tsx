import React from "react";
import CalendarView from "./components/CalendarView";

function App() {
  const calendars = ["./data/2015.json", "./data/2020.json"];
  let data: string;

  calendars.map((year) => (data = require(year)));

  return (
    <div className="App">
      {calendars.map((year, index) => (
        <div key={index}>
          <CalendarView year={year} />
        </div>
      ))}
    </div>
  );
}

export default App;
