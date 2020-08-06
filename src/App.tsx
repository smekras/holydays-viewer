import React from "react";
import styled from "@emotion/styled";
import CalendarView from "./components/CalendarView";
import { MonthInterface } from "./components/MonthView";
import { DayInterface } from "./components/DayView";
import SideView from "./components/SideView";
import jsonObject from "./data/2020.json";
import SearchForm from "./components/SearchForm";

export function createDate(id: number | string) {
  let dateString = typeof id === "number" ? id.toString() : id;

  dateString =
    dateString.substring(0, 4) +
    "-" +
    dateString.substring(4, 6) +
    "-" +
    dateString.substring(6);

  const date = new Date(dateString);

  return date;
}

function findMonthDays(month: number) {
  const monthContent: DayInterface[] = [];

  jsonObject.map((entry) => {
    if (
      Number(entry.id.toString().substring(4, 6)) === month &&
      Number(entry.id.toString().substring(6)) !== 0
    ) {
      monthContent.push({
        id: createDate(entry.id),
        rel: entry.rel,
        names: entry.names,
        off: entry.off,
        sec: entry.sec,
        fast: entry.fast as number,
        moon: entry.moon as number,
        link: entry.link,
      });
    }
  });
  return monthContent;
}

function reformatData(source: any[]) {
  const calendarContent: MonthInterface[] = [];

  source.map((entry) => {
    const dateString = entry.id.toString();
    let monthEntry: MonthInterface = {
      month: 0,
      name: "",
      link: "",
      days: [],
    };

    if (dateString.substring(6) === "00") {
      monthEntry.month = Number(dateString.substring(4, 6));
      monthEntry.name = entry.rel;
      monthEntry.link = entry.link;
      monthEntry.days = findMonthDays(monthEntry.month);
      calendarContent.push(monthEntry);
    }
  });
  return calendarContent;
}

const AppContainer = styled.div`
  display: flex;
  flex-flow: row;
  @media (max-width: 570px) {
    flex-flow: column;
  }
  justify-content: left;
`;

const MainPanel = styled.div`
  min-width: min-content;
  ${() => {
    const breakpoints = [768, 1024];
    const rules: string[] = [];
    breakpoints.map((entry) =>
      rules.push(
        `@media screen and (max-width: ${entry}px) {width: ${entry - 550}px}`
      )
    );
    return rules.join(" ");
  }}
`;

function App() {
  const data = reformatData(jsonObject);
  let results: DayInterface[] = [];

  return (
    <AppContainer>
      {console.count("app")}
      <MainPanel>
        <SearchForm data={jsonObject} results={results} />
        <CalendarView data={data} />
      </MainPanel>
      <SideView results={results} />
    </AppContainer>
  );
}

export default App;
