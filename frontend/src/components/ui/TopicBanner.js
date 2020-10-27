import React from "react";
import { useSelector } from "react-redux";

import styled from "@emotion/styled";

import SearchBar from "./SearchBar";

const TopicBanner = (props) => {
  const {searchBar, search, handleSearchSubmit} = props
  const topicReducer = useSelector(
    (state) => state.topicReducer
  );
  const programObject = useSelector((state) => state.programReducer.program);

  return (
    <>
        <TopicBannerContainer style={{background:topicReducer.topic.color ? topicReducer.topic.color : "#323840"}}>
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



const TopicBannerContainer = styled.div`
  padding: 2rem;
`;
export default TopicBanner;
