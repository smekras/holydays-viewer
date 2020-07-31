import React from "react";
import styled from "@emotion/styled";
import { DayViewEntry } from "./DayView";

function countOccurence(entry: DayViewEntry, trait: string) {
  let count = 0;
  if (entry[trait as keyof DayViewEntry]) {
    count++;
  }
  return count;
}

const MonthView = (props: any) => {
  const Container = styled.div``;
  return <Container></Container>;
};

export default MonthView;
