import React from "react";
import styled from "@emotion/styled";

export interface DayInterface {
  id: Date;
  rel: string;
  names: string;
  off: string;
  sec: string;
  fast: string | number;
  moon: string | number;
  link: string;
}

const DayView = (props: DayInterface) => {
  const Container = styled.div`
    display: flex;
    flex-flow: row wrap;
    margin: 1em;
    padding: 0.5em;
    border: ${props.off ? "1px solid blue" : "1px solid gray"};
    border-radius: 10px;
    justify-content: space-between;
  `;

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
    border: 1px solid orange;
    border-radius: 10px;
  `;

  return (
    <div>
      <Container>
        <Side>
          <div>
            <a href={props.link}>{props.id.getDate()}</a>
          </div>
          <Icons>
            <div>{props.moon}</div>
            <div>{props.fast}</div>
          </Icons>
        </Side>
        <Main>
          {props.names ? (
            <Religious>
              <div>{props.rel}</div>
              <div>{props.names}</div>
            </Religious>
          ) : (
            ""
          )}
          {props.off || props.sec ? (
            <Secular>
              <div>{props.off}</div>
              <div>{props.sec}</div>
            </Secular>
          ) : (
            ""
          )}
        </Main>
      </Container>
    </div>
  );
};

export default DayView;
