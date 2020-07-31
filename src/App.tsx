import React from "react";
import CalendarView from "./components/CalendarView";
import jsonObject from "./data/2020.json";
import { DayViewEntry } from "./components/DayView";

const calendarContent: DayViewEntry[] = [];
jsonObject.forEach((entry) => calendarContent.push(entry));

function App() {
  return (
    <div className="App">
      <CalendarView data={calendarContent} />
    </div>
  );
}

export default App;
