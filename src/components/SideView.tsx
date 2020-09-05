import DayView, { DayInterface } from "./DayView";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

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

const IconBox = styled.div`
  padding: 0.5em;
`;

const ResultsLabel = styled.label`
  display: flex;
  padding: 0.5em;
`;

function renderResults(results: DayInterface[]) {
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
  } else {
    return (
      <div>
        <br />
        No query or matching entries
      </div>
    );
  }
}

const SideView = (props: { results: DayInterface[] }) => {
  const [output, setOutput] = useState(renderResults(props.results));

  useEffect(() => {
    setOutput(renderResults(props.results));
  }, [props.results]);

  return (
    <SidePanel>
      <Banner>
        <IconBox>
          <FontAwesomeIcon icon={faCalendarDay} />
        </IconBox>
        <ResultsLabel>Search Results</ResultsLabel>
      </Banner>
      {output}
    </SidePanel>
  );
};

export default SideView;
