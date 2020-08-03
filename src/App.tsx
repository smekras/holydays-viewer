import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CalendarView from "./components/CalendarView";
import { MonthInterface } from "./components/MonthView";
import DayView, { DayInterface } from "./components/DayView";
import jsonObject from "./data/2020.json";

function App() {
  function createDate(id: number) {
    let dateString = id.toString();

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
          fast: entry.fast,
          moon: entry.moon,
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

  const SidePanel = styled.div`
    flex: auto;
    display: flex;
    flex-flow: column;
    width: min-content;
  `;

  const FormField = styled.form`
    display: flex;
    flex-flow: row;
    padding: 0.5em;
    border-bottom: 1px solid black;
    margin-bottom: 0.5em;
  `;

  const IconBox = styled.div`
    padding: 0.5em;
  `;

  const results: DayInterface[] = [
    reformatData(jsonObject)[0].days[0],
    reformatData(jsonObject)[0].days[1],
    reformatData(jsonObject)[0].days[2],
    reformatData(jsonObject)[0].days[3],
  ];

  // TODO: Fix Peformance issues

  return (
    <AppContainer>
      {console.count("app")}
      <MainPanel>
        <CalendarView data={reformatData(jsonObject)} />
      </MainPanel>
      <SidePanel>
        <FormField>
          <IconBox>
            <FontAwesomeIcon icon={faSearch} />
          </IconBox>
          <input type="text" defaultValue="search..." />
        </FormField>
        <div>Search Results:</div>
        {results.map((entry) => (
          <DayView
            key={entry.id.getDate()}
            id={entry.id}
            rel={entry.rel}
            names={entry.names}
            off={entry.off}
            sec={entry.sec}
            fast={entry.fast}
            moon={entry.moon}
            link={entry.link}
          />
        ))}
      </SidePanel>
    </AppContainer>
  );
}

export default App;
