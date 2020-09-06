import MonthView, { MonthInterface } from "./MonthView";

import { DayInterface } from "./DayView";
import React from "react";
import styled from "@emotion/styled";

export interface CalendarInterface {
  data: MonthInterface[];
  handleResults: any;
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
            handleResults={props.handleResults}
          />
        );
      })}
    </Container>
  );
};

export default CalendarView;
