import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import CalendarView from "./components/CalendarView";
import { MonthInterface } from "./components/MonthView";
import DayView, { DayInterface } from "./components/DayView";
import jsonObject from "./data/2020.json";

function createDate(id: number | string) {
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

function populateResults(query: Date[]) {
  const results: DayInterface[] = [];

  return results;
}

function renderResults(results: DayInterface[]) {
  console.count("results");

  if (results.length > 0) {
    return results.map((entry: DayInterface) => (
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
    ));
  }
  return (
    <div>
      <br />
      No query or matching entries
    </div>
  );
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

const IconBox = styled.div`
  padding: 0.5em;
`;

const FormField = styled.form`
  display: flex;
  flex-flow: row;
  padding: 0.5em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid gray;
`;

const SidePanel = styled.div`
  flex: auto;
  display: flex;
  flex-flow: column;
  @media (min-width: 1200px) {
    width: 650px;
  }
`;

const Banner = styled.div`
  display: flex;
  flex-flow: row;
  padding: 0.5em;
  border-bottom: 1px solid gray;
`;

const ResultsLabel = styled.label`
  display: flex;
  padding: 0.5em;
`;

function App() {
  const data = reformatData(jsonObject);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState([] as Date[]);
  const [results, setResults] = useState(populateResults(query));

  useEffect(() => {
    console.count("effect");
    console.log("query in useEffect:", query);
    setResults(populateResults(query));
  }, [query]);

  const handleSubmit = (event: any) => {
    if (search) {
      console.count("submit");
      data.map((entry) => {
        entry.month === createDate(search).getMonth() + 1
          ? entry.days.map((day) => {
              day.id.getTime() === createDate(search).getTime()
                ? query.push(day.id)
                : setQuery([]);
            })
          : setQuery([]);
      });
    }
    console.log("query:", query);
    event.preventDefault();
  };

  return (
    <AppContainer>
      {console.count("app")}
      <MainPanel>
        <FormField onSubmit={(e) => handleSubmit(e)}>
          <IconBox>
            <FontAwesomeIcon icon={faSearch} />
          </IconBox>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormField>
        <CalendarView data={data} />
      </MainPanel>
      <SidePanel>
        <Banner>
          <IconBox>
            <FontAwesomeIcon icon={faCalendarDay} />
          </IconBox>
          <ResultsLabel>Search Results</ResultsLabel>
        </Banner>
        {renderResults(results)}
      </SidePanel>
    </AppContainer>
  );
}

export default App;
