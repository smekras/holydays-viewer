import React from "react";
import data from "../data/2020.json";

const Calendar = () => {
  let json_keys = data.map((entry) => (
    <div key={entry.dayId}>
      Date: {entry.dayId}
      <br />
      Desc: {entry.rel}
      <br />
      <br />
    </div>
  ));

  return <div>{json_keys}</div>;
};

export default Calendar;
