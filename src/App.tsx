import React from "react";
import { MonthInterface } from "./components/MonthView";
import { DayInterface } from "./components/DayView";
import jsonObject from "./data/2020.json";

function App() {
  function createDate(id: number) {
    let dateString = id.toString();

    dateString =
      dateString.substring(0, 4) +
      "-" +
      dateString.substring(4, 6) +
      "-" +
      dateString.substring(6);

    const date = new Date(dateString);

    return date;
  }

  function findMonthDays(month: number) {
    const monthContent: DayInterface[] = [];

    jsonObject.map((entry) => {
      if (
        Number(entry.id.toString().substring(4, 6)) === month &&
        Number(entry.id.toString().substring(6)) !== 0
      ) {
        monthContent.push({
          id: createDate(entry.id),
          rel: entry.rel,
          names: entry.names,
          off: entry.off,
          sec: entry.sec,
          fast: entry.fast,
          moon: entry.moon,
          link: entry.link,
        });
      }
    });
    return monthContent;
  }

  function reformatData() {
    const calendarContent: MonthInterface[] = [];

    jsonObject.map((entry) => {
      const dateString = entry.id.toString();
      let monthEntry: MonthInterface = { month: 0, name: "", days: [] };

      if (dateString.substring(6) === "00") {
        monthEntry.month = Number(dateString.substring(4, 6));
        monthEntry.name = entry.rel;
        monthEntry.days = findMonthDays(monthEntry.month);
        calendarContent.push(monthEntry);
      }
    });
  }

  // TODO: Fix Peformance issues
  reformatData();

  return (
    <div className="App">
      {console.count("app")}
      {/* {calendarContent.map((entry) => (
        <div key={String(entry.id)}>
          {entry.id}
          {console.log("entry")}
        </div>
      ))} */}
      {/* <CalendarView data={calendarContent} /> */}
    </div>
  );
}

export default App;
