import React from "react";
import styled from "@emotion/styled";
import MonthView, { MonthInterface } from "./MonthView";

export interface CalendarInterface {
  data: MonthInterface[];
}

const CalendarView = (props: CalendarInterface) => {
  const Container = styled.div`
    display: flex;
    flex-flow: row wrap;
  `;

  return (
    <Container>
      {props.data.map((entry) => {
        return (
          <MonthView
            key={entry.month}
            month={entry.month}
            name={entry.name}
            link={entry.link}
            days={entry.days}
          />
        );
      })}
    </Container>
  );
};

export default CalendarView;
