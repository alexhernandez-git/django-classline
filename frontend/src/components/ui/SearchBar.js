import React from "react";
import styled from "@emotion/styled";
import { FaBars, FaSearch, FaUpload, FaTh, FaBell } from "react-icons/fa";
import { IconContext } from "react-icons";

const SearchBar = (props) => {
  return (
    <SearchBarComponent
      onSubmit={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        console.log(e.keyCode);
        if (e.keyCode == 13 || e.keyCode == "Enter") {
          return props.onSubmit(e);
        }
      }}
    >
      <input
        type="text"
        placeholder={props.placeholder}
        value={props.search.search}
        onChange={(e) => props.search.setSearch(e.target.value)}
      />
      <button type="button" onClick={props.onSubmit}>
        <IconContext.Provider value={{ className: "global-class-name" }}>
          <FaSearch />
        </IconContext.Provider>
      </button>
    </SearchBarComponent>
  );
};
const SearchBarComponent = styled.form`
  grid-area: search;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  input {
    min-width: 60%;
    padding: 0 1.5rem;
    height: 3.5rem;
    line-height: 3.5rem;
    border: 0.1rem solid #ccc;
    font-size: 1.6rem;
    font-family: "Open Sans", sans-serif;
    flex: 1;
  }
  button {
    height: 3.5rem;
    border: 0.1rem solid #ccc;
    border-left: none;
    color: #545454;
    background: #f8f8f8;
    padding: 0 2.5rem;
    cursor: pointer;
  }
  button:hover {
    background: #f5f5f5;
  }
  @media screen and (max-width: 1200px) {
    input {
      width: 70%;
    }
  }
  @media screen and (max-width: 768px) {
    input {
      min-width: auto;
      width: 100%;
    }
  }
`;
export default SearchBar;
