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
  const official = countOccurence(props.days, "off");
  const secular = countOccurence(props.days, "sec");

  const Container = styled.div`
    display: flex;
    flex-flow: column;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 1em;
    margin: 0.5em;
  `;

  const Banner = styled.div`
    display: flex;
    flex-flow: row;
    border-bottom: 1px solid gray;
    justify-content: space-between;
    min-width: 200px;
  `;

  const TitleBox = styled.div`
    display: flex;
    flex-flow: row nowrap;
  `;

  const OffBox = styled.div`
    padding: 0.5em;
    border: 1px solid blue;
    border-radius: 15px;
    margin-bottom: 0.5em;
    margin-left: 0.5em;
    background: blue;
    color: white;
    width: 18px;
    text-align: center;
  `;

  const SecBox = styled.div`
    padding: 0.5em;
    border: 1px solid orange;
    border-radius: 15px;
    margin-bottom: 0.5em;
    margin-left: 0.5em;
    background: orange;
    color: white;
    width: 18px;
    text-align: center;
  `;

  const Content = styled.div`
    display: flex;
    flex-flow: row wrap;
  `;

  return (
    <Container>
      <Banner>
        <TitleBox>
          <div>{props.month}</div>
          <div>{props.name}</div>
        </TitleBox>
        <TitleBox>
          {official > 0 ? <OffBox>{official}</OffBox> : ""}
          {secular > 0 ? <SecBox>{secular}</SecBox> : ""}
        </TitleBox>
      </Banner>
      <Content></Content>
    </Container>
  );
};

export default MonthView;
