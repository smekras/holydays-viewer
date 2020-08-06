import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DayInterface } from "./DayView";
import { createDate } from "../App";

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

const SearchForm = (props: any) => {
  let searchTerms = [""];
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: any) => setSearchTerm(e.target.value);

  const handleSubmit = (e: any) => {
    searchTerms = [...searchTerms, ...searchTerm.split(",")];
    setSearchTerm("");
  };

  useEffect(() => {
    const searchResults = props.data.filter(
      (entry: { id: string | number }) => {
        searchTerms.forEach((term) => {
          console.log(entry.id);
          if (createDate(term).getTime() === createDate(entry.id).getTime()) {
            searchResults.push(entry);
          }
        });
      }
    );
    props.results = searchResults;
    console.log("search results:", props.results);
  }, [props.data, searchTerms]);

  return (
    <FormField onSubmit={handleSubmit}>
      <IconBox>
        <FontAwesomeIcon icon={faSearch} />
      </IconBox>
      <input
        type="text"
        placeholder="Search for dates (YYYYMMDD). Separate values by comma."
        value={searchTerm}
        onChange={handleChange}
      />
    </FormField>
  );
};

export default SearchForm;
