import { DayInterface } from "./DayView";
import React from "react";
import styled from "@emotion/styled";

export interface MonthInterface {
  month: number;
  name: string;
  link: string;
  days: DayInterface[];
  handleResults: any;
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

  const DayBox = styled.button<BoxProps>`
    padding: 0.5em;
    border: 0;
    background: white;
    text-align: center;
    width: 30px;
    color: ${(bprops: BoxProps) =>
      bprops.purpose === "off"
        ? "royalblue"
        : bprops.purpose === "sec"
        ? "brown"
        : "black"};
  `;

  function handleSelection(e: any) {
    e.preventDefault();
    let results: any[] = [];

    props.days.map((entry) => {
      if (e.target.value === "off") {
        if (entry.off) {
          results.push(entry);
        }
      }
      if (e.target.value === "sec") {
        if (entry.sec) {
          results.push(entry);
        }
      }
      if (entry.id.getDate() === Number(e.target.value)) {
        results.push(entry);
      }
    });
    props.handleResults(results);
  }

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
            <Box purpose="off" value="off" onClick={handleSelection}>
              {official}
            </Box>
          ) : (
            ""
          )}
          {secular > 0 ? (
            <Box purpose="sec" value="sec" onClick={handleSelection}>
              {secular}
            </Box>
          ) : (
            ""
          )}
        </TitleBox>
      </Banner>
      <Content>
        {props.days.map((entry) => {
          return (
            <DayBox
              key={entry.id.getDate()}
              purpose={entry.off ? "off" : entry.sec ? "sec" : "day"}
              value={entry.id.getDate()}
              onClick={handleSelection}
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
