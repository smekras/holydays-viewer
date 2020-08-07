import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { createDate } from "../App";

const FormField = styled.form`
  display: flex;
  flex-flow: row;
  padding: 0.5em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid gray;
  width: fit-content;
`;

const IconBox = styled.div`
  padding: 0.5em;
`;

const SearchForm = (props: { data: any[]; handleSearch: any }) => {
  let searchTerms = [""];
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchTerms = [...searchTerms, ...searchTerm.split(",")];
    setSearchTerm("");
  };

  useEffect(() => {
    const searchResults = props.data.filter(
      (entry: { id: string | number }) => {
        searchTerms.forEach((term) => {
          if (createDate(term).getTime() === createDate(entry.id).getTime()) {
            searchResults.push(entry);
          }
        });
      }
    );
    props.handleSearch(searchResults);
  }, [searchTerms]);

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
