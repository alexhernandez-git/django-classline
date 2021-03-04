import React from "react";
import styled from "@emotion/styled";
import SearchBar from "../../components/ui/SearchBar";
import { textEllipsis } from "./TextEllipsis";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";
const SearchUsers = () => {
  return (
    <div className="w-100 border">
      <ProfileLink className="p-3 d-flex align-items-center cursor-pointer">
        <SearchBar placeholder="Buscar Usuarios" />
      </ProfileLink>
      <Link to={`/${Math.random()}/user/${Math.random()}`}>
        <ProfileLink className="p-3 d-flex align-items-center justify-content-between cursor-pointer">
          <div className="d-flex align-items-center">
            <ProfileImageDiv>
              <img
                src={"https://image.flaticon.com/icons/svg/194/194938.svg"}
                alt="Avatar"
              />
            </ProfileImageDiv>
            <small css={textEllipsis} className="ml-2 font-weight-bold">
              Yoga & Yoga
            </small>
          </div>
          <small className="badge badge-pill badge-success">Admin</small>
        </ProfileLink>
      </Link>
      <Link to={`/${Math.random()}/user/${Math.random()}`}>
        <ProfileLink className="p-3 d-flex align-items-center justify-content-between cursor-pointer">
          <div className="d-flex align-items-center">
            <ProfileImageDiv>
              <img
                src={"https://image.flaticon.com/icons/svg/194/194938.svg"}
                alt="Avatar"
              />
            </ProfileImageDiv>
            <small css={textEllipsis} className="ml-2 font-weight-bold">
              Alex Hernandez
            </small>
          </div>
        </ProfileLink>
      </Link>
      <Link to={`/${Math.random()}/user/${Math.random()}`}>
        <ProfileLink className="p-3 d-flex align-items-center justify-content-between cursor-pointer">
          <div className="d-flex align-items-center">
            <ProfileImageDiv>
              <img
                src={"https://image.flaticon.com/icons/svg/194/194938.svg"}
                alt="Avatar"
              />
            </ProfileImageDiv>
            <small css={textEllipsis} className="ml-2 font-weight-bold">
              Gema Prat
            </small>
          </div>
        </ProfileLink>
      </Link>
    </div>
  );
};
const ProfileImageDiv = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  .img {
    width: 35px;
    height: 35px;
  }
`;
const ProfileLink = styled.div`
  border-bottom: 1px solid #e2e2e2;
  &:last-child {
    border: none;
  }
`;

export default SearchUsers;
