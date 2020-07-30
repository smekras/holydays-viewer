import React from "react";
import CalendarView from "./components/CalendarView";
import { holydayEntry } from "./interfaces";
import data from "./data/2020.json";

// const data: any[] = JSON.parse("./data/2020.json");

let holyData: holydayEntry[];

function populateData(rawData: JSON) {
  rawData = rawData.parse(rawData);
  if (holyData === undefined) {
    console.log("undefined data");
  } else {
    rawData.map((entry, index) => (holyData[index] = entry));
  }
}

function App() {
  console.log(typeof data);
  console.log(holyData);
  populateData(data);
  console.log(holyData);

  return (
    <div className="App">
      <CalendarView data={holyData} />
    </div>
  );
}

export default App;
