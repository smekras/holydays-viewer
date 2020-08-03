import React from "react";
import styled from "@emotion/styled";
import { DayInterface } from "./DayView";

export interface MonthInterface {
  month: number;
  name: string;
  link: string;
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
    width: 230px;
  `;

  const Banner = styled.div`
    display: flex;
    flex-flow: row;
    border-bottom: 1px solid gray;
    justify-content: space-between;
  `;

  const TitleBox = styled.div`
    display: flex;
    flex-flow: row nowrap;
  `;

  const NumberPlate = styled.div`
    color: ${official > 0 ? "royalblue" : "brown"};
    padding: 0.5em;
    min-width: 18px;
    font-weight: bolder;
  `;

  const MonthLabel = styled.div`
    padding: 0.5em;
    font-weight: bold;
    vertical-align: middle;
  `;

  interface BoxProps {
    purpose: string;
  }

  const Box = styled.button<BoxProps>`
    padding: 0.5em;
    border: 1px solid
      ${(bprops: BoxProps) =>
        bprops.purpose === "off" ? "royalblue" : "brown"};
    border-radius: 12px;
    margin-bottom: 0.5em;
    margin-left: 0.5em;
    color: white;
    min-width: 36px;
    text-align: center;
    background: ${(bprops: BoxProps) =>
      bprops.purpose === "off" ? "royalblue" : "brown"};
  `;

  const Content = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    :after {
      content: "";
      flex: auto;
    }
  `;

  const DayBox = styled.div<BoxProps>`
    padding: 0.5em;
    text-align: center;
    width: 15px;
    color: ${(bprops: BoxProps) =>
      bprops.purpose === "off"
        ? "royalblue"
        : bprops.purpose === "sec"
        ? "brown"
        : "black"};
  `;

  return (
    <Container>
      <Banner>
        <TitleBox>
          <NumberPlate>{props.month}</NumberPlate>
          <MonthLabel>
            <a href={props.link}>{props.name}</a>
          </MonthLabel>
        </TitleBox>
        <TitleBox>
          {official > 0 ? (
            <Box purpose="off" onClick={(e) => console.log("Clicked")}>
              {official}
            </Box>
          ) : (
            ""
          )}
          {secular > 0 ? <Box purpose="sec">{secular}</Box> : ""}
        </TitleBox>
      </Banner>
      <Content>
        {props.days.map((entry) => {
          return (
            <DayBox
              key={entry.id.getDate()}
              purpose={entry.off ? "off" : entry.sec ? "sec" : ""}
            >
              {entry.id.getDate()}
            </DayBox>
          );
        })}
      </Content>
    </Container>
  );
};

export default MonthView;
