import React from "react";
import styled from "@emotion/styled";
import { DayInterface } from "./DayView";
import MonthView, { MonthInterface } from "./MonthView";

export interface CalendarInterface {
  data: DayInterface[];
}

const CalendarView = (props: CalendarInterface) => {
  const Container = styled.div`
    display: flex;
    flex-flow: row wrap;
  `;

  return (
    <Container>
      {/* {props.data.map((entry, index) => (
        <div key={entry.id}>
          {console.log(entry.id)}
          <DayView {...entry} />
        </div>
      ))} */}
    </Container>
  );
};

export default CalendarView;
