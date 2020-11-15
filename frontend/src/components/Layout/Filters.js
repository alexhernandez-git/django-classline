import React from "react";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";
import SearchBar from "../ui/SearchBar";
import { useHistory } from "react-router-dom";
import { ButtonCustom } from "../ui/ButtonCustom";

const Filters = (props) => {
  const history = useHistory();
  return (
    <FilterContainer
      className={props.className ? props.className : "border-bottom mb-4"}
    >
      <div
        className={
          props.centered
            ? "d-md-flex justify-content-center mb-3 align-items-end"
            : "d-md-flex justify-content-between mb-3 align-items-end"
        }
      >
        {props.back && (
          <>
            <BackButton
              onClick={
                props.to ? () => history.push(props.to) : () => history.goBack()
              }
            >
              <IconContext.Provider
                value={{
                  size: 16,
                  className: "global-class-name mr-2",
                }}
              >
                <FaArrowLeft />
              </IconContext.Provider>
              <>{props.back}</>
            </BackButton>
          </>
        )}
        {props.title && <Title>{props.title}</Title>}
        {props.saveButton && (
          <ButtonCustom type="submit">{props.saveButton}</ButtonCustom>
        )}
        {(props.placeholder || props.button) && (
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
        )}
      </div>
    </FilterContainer>
  );
};
const Title = styled.h5`
  margin: 0;
`;
const FilterContainer = styled.div`
  max-width: 120rem;
  margin: auto;
  width: 100%;
  padding: 0 1rem;
`;
const FilterButton = styled.span`
  cursor: pointer;
`;
const BackButton = styled.span`
  cursor: pointer;
  align-items: center;
  display: flex;
`;
export default Filters;
