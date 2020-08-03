import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

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
  const months = [
    "Ιανουαρίου",
    "Φεβρουαρίου",
    "Μαρτίου",
    "Απριλίου",
    "Μαΐου",
    "Ιουνίου",
    "Ιουλίου",
    "Αυγούστου",
    "Σεπτεμβρίου",
    "Οκτωβρίου",
    "Νοεμβρίου",
    "Δεκεμβρίου",
  ];

  const Container = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    margin: 1em;
    padding: 0.5em;
    padding-bottom: 0;
    border: 1px solid ${props.off ? "royalblue" : "gray"};
    border-radius: 10px;
    @media (min-width: 1200px) {
      width: 650px;
    }
  `;

  const Side = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    max-width: 20%;
  `;

  const DateBox = styled.div`
    border: 0px;
    background: white;
    color: ${props.off ? "royalblue" : props.sec ? "brown" : "gray"};
    font-weight: bold;
    font-size: 5em;
    text-align: center;
    width: 100%;
    height: 100px;
  `;

  const MonthBox = styled.div`
    text-align: center;
    padding-bottom: 0.5em;
  `;

  const Icons = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  `;

  const Wiki = styled.button`
    border: white;
    background: white;
    cursor: pointer;
  `;

  const SideBox = styled.div<BoxProps>`
    display: flex;
    flex-flow: column;
    padding: 0.5em;
    border: 1px
      ${(bprops: BoxProps) =>
        bprops.type === "off" ? "solid royalblue" : "hidden white"};
    border-radius: 10px;
    margin-bottom: 0.5em;
    background: ${(bprops: BoxProps) =>
      bprops.type === "off" ? "royalblue" : "white"};
    color: white;
  `;

  const Main = styled.div`
    display: flex;
    flex-flow: column;
    max-width: 80%;
    padding-left: 0.5em;
  `;

  interface BoxProps {
    type: string;
  }

  const Box = styled.div<BoxProps>`
    display: flex;
    flex-flow: column;
    padding: 0.5em;
    border: 1px
      ${(bprops: BoxProps) =>
        bprops.type === "rel"
          ? "solid purple"
          : bprops.type === "off"
          ? "solid royalblue"
          : bprops.type === "sec"
          ? "dashed brown"
          : bprops.type === "none"
          ? "hidden white"
          : "dotted gray"};
    border-radius: 10px;
    margin-bottom: 0.5em;
    background: white;
  `;

  return (
    <div>
      <Container>
        <Side>
          <div>
            <div>
              <DateBox>{props.id.getDate()}</DateBox>
              <MonthBox className="month">
                {months[props.id.getMonth()]}
              </MonthBox>
            </div>
            <Icons>
              <Wiki>
                <FontAwesomeIcon icon={faGlobe} href={props.link} />
              </Wiki>
              <div>{props.moon}</div>
              <div>{props.fast}</div>
            </Icons>
          </div>
          {props.off ? (
            <SideBox type="off">
              <div>{props.off}</div>
            </SideBox>
          ) : (
            <SideBox type="none">No official holiday.</SideBox>
          )}
        </Side>
        <Main>
          {props.names ? (
            <div>
              <Box type="rel">
                <div>{props.rel}</div>
              </Box>
              <Box type="names">
                <div>{props.names}</div>
              </Box>
            </div>
          ) : (
            ""
          )}
          {props.sec ? (
            <Box type="sec">
              <div>{props.sec}</div>
            </Box>
          ) : (
            ""
          )}
        </Main>
      </Container>
    </div>
  );
};

export default DayView;
