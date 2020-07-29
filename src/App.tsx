import React from "react";
import CalendarView from "./components/CalendarView";
import data from "./data/2020.json";

interface holydayEntry {
  id: Date;
  rel: string;
  names: string;
  off: string;
  sec: string;
  fast: number;
  moon: number;
  link: string;
}

let calendarData: holydayEntry[];

function App() {
  return (
    <div className="App">
      <CalendarView />
    </div>
  );
}

export default App;
