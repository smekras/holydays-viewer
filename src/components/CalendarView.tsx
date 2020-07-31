import React from "react";
import styled from "@emotion/styled";
import DayView, { DayViewEntry } from "./DayView";

export interface CalendarViewEntry {
  data: DayViewEntry[];
}

const CalendarView = (props: CalendarViewEntry) => {
  const Container = styled.div`
    display: flex;
    flex-flow: row wrap;
  `;

  let MonthView: DayViewEntry[];

  function createDate(id: number) {
    const dateString = id
      .toString()
      .replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3");
    const date = new Date(dateString);
    return date;
  }

  return (
    <Container>
      {props.data.map((entry) => (
        <div key={entry.id}>
          {console.log(entry.id)}
          <DayView {...entry} />
        </div>
      ))}
    </Container>
  );
};

export default CalendarView;
