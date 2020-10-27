import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import SearchBar from "./SearchBar";

const TopicBanner = (props) => {
  const {searchBar, search, handleSearchSubmit} = props
  const topicReducer = useSelector(
    (state) => state.topicReducer
  );
  const programObject = useSelector((state) => state.programReducer.program);

  return (
    <>
        <TopicBannerContainer style={{background:topicReducer.topic.color ? topicReducer.topic.color : "#757575"}}>
            <div className="container">
              <div className="mx-auto">

              <div className="p-4">
                <div className="w-100 text-white d-sm-flex justify-content-between align-items-center">
                  <MainInfo className="d-flex flex-column justify-content-center">
                    <h2 className="text-break">{topicReducer.topic && topicReducer.topic.name}</h2>
                    {/* <span>{program && program.subtitle}</span> */}
                  </MainInfo>
        
                      {(programObject.are_videos || programObject.are_admin_playlists || programObject.are_podcasts) && 
                    <>
                          <div className="d-block d-sm-none m-3"></div>
                          {searchBar &&
                            <SearchBar
                            placeholder={"Busqueda"}
                            search={search}
                            onSubmit={handleSearchSubmit}
                            />
                          }
                    </>
                    }
                </div>
              </div>
              </div>
            </div>
          </TopicBannerContainer>
    </>
  );
};
export const ProfileImgDiv = styled.div`
  height: 100px;
  width: 100px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 20px 20px 0;
`;
export const MainInfo = styled.div`
  h2 {
    font-size: 3.5rem;
  }
`;
export const CardContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  height: 0;
`;
const Search = styled.div`
margin: 3rem;
  display: flex;
  justify-content: center;
  input{
    padding:1rem 1rem 1rem 2rem;

    max-width:30rem;
    width: 100%;
    display: block;
    border-radius: 2rem 0 0 2rem;

    overflow: hidden;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    border:none;
  }
  button{
    padding:1rem;
    max-width:5rem;
    width: 100%;
    display: block;
    border-radius: 0 2rem  2rem 0;
    overflow: hidden;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    border:none;
  }
  button:hover{
    opacity: 0.7;
  }

`

const TopicBannerContainer = styled.div`
  padding: 2rem;
`;
export default TopicBanner;
