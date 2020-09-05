import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

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

const InputBox = styled.input`
  min-width: 400px;
  max-width: 600px;
`;
// TODO: fix search bar width

const SearchForm = ({ handleSearch }: any) => {
  let searchTerms = [""];
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchTerms = [...searchTerm.split(",")];
    handleSearch(searchTerms);
    setSearchTerm("");
  };

  return (
    <FormField onSubmit={handleSubmit}>
      <IconBox>
        <FontAwesomeIcon icon={faSearch} />
      </IconBox>
      <InputBox
        type="text"
        placeholder="Search for dates (YYYYMMDD). Separate values by comma."
        value={searchTerm}
        onChange={handleChange}
      />
    </FormField>
  );
};

export default SearchForm;
