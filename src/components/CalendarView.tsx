import React from "react";
import styled from "@emotion/styled";
import { calendarData, holydayEntry } from "../interfaces";

const CalendarView = (props: calendarData) => {
  const Container = styled.div`
    display: flex;
    flex-flow: row wrap;
    margin: 1em;
  `;
  /* border: ${props.official ? "1px solid blue" : "1px solid gray"} */

  const Side = styled.div`
    display: flex;
    flex-flow: column;
    max-width: 20%;
    margin-right: 1em;
  `;

  const Icons = styled.div`
    display: flex;
    flex-flow: row;
    align-content: space-between;
  `;

  const Main = styled.div`
    display: flex;
    flex-flow: column;
    max-width: 80%;
  `;

  const Religious = styled.div`
    display: flex;
    flex-flow: column;
    margin-bottom: 1em;
    padding: 0.5em;
    border: 1px solid purple;
    border-radius: 10px;
  `;

  const Secular = styled.div`
    display: flex;
    flex-flow: column;
    padding: 0.5em;
    border: 1px solid blue;
    border-radius: 10px;
  `;

  function createDate(id: Date) {
    const dateString = id
      .toString()
      .replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3");
    const date = new Date(dateString);
    return date;
  }

  return (
    <div>
      {Array.from(props.data).map((entry: holydayEntry) => (
        <Container key={Number(entry.id)}>
          <Side>
            <div>
              <a href={entry.link}>
                {Number.isNaN(createDate(entry.id).getDate())
                  ? entry.rel
                  : createDate(entry.id).getDate()}
              </a>
            </div>
            <Icons>
              <div>{entry.moon}</div>
              <div>{entry.fast}</div>
            </Icons>
          </Side>
          <Main>
            {entry.names ? (
              <Religious>
                <div>
                  {!Number.isNaN(createDate(entry.id).getDate())
                    ? entry.rel
                    : ""}
                </div>
                <div>{entry.names}</div>
              </Religious>
            ) : (
              ""
            )}
            {entry.off || entry.sec ? (
              <Secular>
                <div>{entry.off}</div>
                <div>{entry.sec}</div>
              </Secular>
            ) : (
              ""
            )}
          </Main>
        </Container>
      ))}
    </div>
  );
};

export default CalendarView;
