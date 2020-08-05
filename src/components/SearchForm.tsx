import React, { useState } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const FormField = styled.form`
  display: flex;
  flex-flow: row;
  padding: 0.5em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid gray;
`;

const IconBox = styled.div`
  padding: 0.5em;
`;

const SearchForm = (props: { data: any[] }) => {
  const [search, setSearch] = useState("");

  function populateResults(input: Date[]) {
    input.forEach((element) => {
      results.push();
    });
    return results;
  }

  const handleSubmit = (event: any) => {
    if (search) {
      console.count("submit");

      props.data.forEach((entry) => {
        if (entry.month === createDate(search).getMonth() + 1) {
          entry.days.forEach((day) => {
            if (day.id.getTime() === createDate(search).getTime()) {
              inputFilters.push(day.id);
            }
          });
        }

        event.preventDefault();
      });
      console.log(inputFilters, results);
      setResults(populateResults(inputFilters));
      console.log(inputFilters, results);
    }
  };

  return (
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
  );
};

export default SearchForm;
