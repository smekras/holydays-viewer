import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

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

const SearchForm = (data: any, handleSearch: any) => {
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
