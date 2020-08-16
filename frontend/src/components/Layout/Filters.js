import React from "react";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";
import SearchBar from "../ui/SearchBar";
import { useHistory } from "react-router-dom";

const Filters = (props) => {
  const history = useHistory();
  return (
    <FilterContainer
      className={props.className ? props.className : "border-bottom mb-4"}
    >
      <div className="d-md-flex justify-content-between mb-3 align-items-end">
        {props.title && <Title>{props.title}</Title>}
        {props.back && (
          <>
            <BackButton onClick={() => history.goBack()}>
              <IconContext.Provider
                value={{
                  size: 20,
                  className: "global-class-name mr-2",
                }}
              >
                <FaArrowLeft />
              </IconContext.Provider>
              <>{props.back}</>
            </BackButton>
          </>
        )}
        <div>
          {props.placeholder && (
            <SearchBar
              placeholder={props.placeholder}
              search={props.search}
              onSubmit={props.onSubmit}
            />
          )}
          {props.button && props.button}
        </div>
      </div>
    </FilterContainer>
  );
};
const Title = styled.h3``;
const FilterContainer = styled.div``;
const FilterButton = styled.span`
  cursor: pointer;
`;
const BackButton = styled.span`
  cursor: pointer;
`;
export default Filters;
