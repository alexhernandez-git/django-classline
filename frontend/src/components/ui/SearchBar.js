import React from "react";
import styled from "@emotion/styled";
import { FaBars, FaSearch, FaUpload, FaTh, FaBell } from "react-icons/fa";
import { IconContext } from "react-icons";

const SearchBar = (props) => {
  return (
    <Search
      onSubmit={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        console.log(e.keyCode);
        if (e.keyCode == 13 || e.keyCode == "Enter") {
          return props.onSubmit(e);
        }
      }}
    >
      <input
        autoFocus
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
    </Search>
  );
};
const Search = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;
  input {
    padding: 1rem 1rem 1rem 2rem;

    /* max-width:30rem; */
    width: 100%;
    display: block;
    border-radius: 2rem 0 0 2rem;

    overflow: hidden;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    border: none;
  }
  button {
    padding: 1rem;
    max-width: 5rem;
    width: 100%;
    display: block;
    border-radius: 0 2rem 2rem 0;
    overflow: hidden;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    border: none;
  }
  button:hover {
    opacity: 0.7;
  }
`;

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
