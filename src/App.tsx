import React, { useEffect } from "react";
// import CalendarView from "./components/CalendarView";
import DayView, { DayInterface } from "./components/DayView";
import jsonObject from "./data/2020.json";

const calendarContent: DayInterface[] = [];

function App() {
  function createDate(id: number) {
    const dateString = id.toString();
    if (dateString.substring(7, 8) === "00") {
      dateString.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-01T00:00:00.000Z");
    } else {
      dateString.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3");
    }
    const date = new Date(dateString);
    return date;
  }

  useEffect(() => {
    let holydate: DayInterface;

    jsonObject.forEach((entry) => {
      holydate.id = createDate(entry.id);
      holydate.rel = entry.rel;
      holydate.names = entry.names;
      holydate.off = entry.off;
      holydate.sec = entry.sec;
      holydate.fast = entry.fast;
      holydate.moon = entry.moon;
      holydate.link = entry.link;
      calendarContent.push(holydate);
    });
  }, []);

  return (
    <div className="App">
      {console.log("calendar content:" + calendarContent[0])}
      {console.count("app")}
      {calendarContent.map((entry) => (
        <div key={String(entry.id)}>
          {entry.id}
          {console.log("entry")}
        </div>
      ))}
      {/* <CalendarView data={calendarContent} /> */}
    </div>
  );
}

export default App;
