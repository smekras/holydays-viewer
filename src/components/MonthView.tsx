import React from "react";
import styled from "@emotion/styled";
import { DayInterface } from "./DayView";

export interface MonthInterface {
  month: number;
  name: string;
  days: DayInterface[];
}

function countOccurence(days: DayInterface[], trait: string) {
  let count = 0;
  days.forEach((entry) => {
    if (entry[trait as keyof DayInterface]) {
      count++;
    }
  });
  return count;
}

const MonthView = (props: MonthInterface) => {
  const Container = styled.div`
    display: flex;
    flex-flow: column;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 1em;
  `;

  const Banner = styled.div`
    display: flex;
    flex-flow: row;
    border-bottom: 1px solid gray;
  `;

  const Content = styled.div`
    display: flex;
    flex-flow: row wrap;
  `;

  const official = countOccurence(props.days, "off");
  const secular = countOccurence(props.days, "sec");

  return (
    <Container>
      <Banner>
        <div>{props.month}</div>
        <div>{props.name}</div>
        <div>{official}</div>
        <div>{secular}</div>
      </Banner>
      <Content></Content>
    </Container>
  );
};

export default MonthView;
