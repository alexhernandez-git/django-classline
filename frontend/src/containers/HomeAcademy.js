import React, { useState, useEffect } from "react";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import MainProgramInfo from "src/components/MainPage/MainProgramInfo";
import { textEllipsis } from "src/components/ui/TextEllipsis";

import { useDispatch } from "react-redux";
import { fetchPopularVideos } from "src/redux/actions/popularVideos";
import { fetchPopularPlaylists } from "src/redux/actions/popularPlaylists";
import { fetchPopularPodcasts } from "src/redux/actions/popularPodcasts";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { FaListUl, FaPodcast, FaRegPlayCircle, FaSearch } from "react-icons/fa";
import TopicCard from "../components/AdminAcademy/TopicCard";
import SearchElementCard from "../components/AdminAcademy/SearchElementCard";

export default function Home() {
  const history = useHistory();
  const { program } = useParams();
  const authReducer = useSelector((state) => state.authReducer);
  // useEffect(() => {
  //   console.log("isloading", authReducer.isLoading);
  //   // if (!authReducer.isLoading && !authReducer.isAuthenticated)
  //   // history.push(`/academy/${program}`);
  // }, [authReducer.isLoading]);

  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);


  return (
    !programReducer.isLoading && (
      <>
        <Main className="text-grey">
          <MainProgramContainer>
            <div className="container">
              <div className="mx-auto">
                <MainProgramInfo />
              </div>
            </div>
          </MainProgramContainer>

          
          <ImgContainer>
            <div className="img-content">
              <IconContext.Provider

                value={{
                  className: "position-absolute cursor-pointer",
                  color: "#fff",
                  style: {
                    left: "0",
                    right: "0",
                    top: "0",
                    bottom: "0",
                    margin: "auto",
                    fontSize: "4rem",
                    zIndex: "100",
                  },
                }}
              >
                <div>
                  <FaRegPlayCircle />
                </div>
              </IconContext.Provider>
              <small>Ver video presentación</small>
            </div>
            <img className="img-video" src={programReducer.program && programReducer.program.picture} />
          </ImgContainer>
          <div className="container mt-5">
            <GridElements className="">
             
              <SearchElementCard searchVideos/>  
              <SearchElementCard searchPlaylists/>
              <SearchElementCard searchPodcasts/>

            </GridElements>
          </div>
          <div className="container">
            <div className="border-bottom mb-3 pb-2">
              <span>Temas</span>
            </div>
            <TopicsContainer>
   
                <TopicCard/>
                <TopicCard/>
                {/* <TopicCard/> */}
                <TopicCard/>
            </TopicsContainer>
          </div>

        </Main>
      </>
    )
  );
}


const GridElements = styled.div`  
/* justify-content: space-between; */
margin-bottom: 2rem;
display: flex;
justify-content: center;
@media screen and (max-width: 576px) {
  display: inline;
  }
`;

const MainProgramContainer = styled.div`
  background: var(--darkgray);
  padding: 2rem;
`;


const ImgContainer = styled.div`
    max-width:50rem;
    width: 100%;
    border-radius: 2rem;
    margin: 3rem auto;
    overflow: hidden;
    position: relative;
    small{
    position: absolute;
    left: 50%;

    top: 70%;

    transform: translate(-50%,-50%);

    color: #fff;
    z-index: 1;

    }
    .img-video{
      z-index: 1;
      width: 100%;
      display: block;
      border-radius: 2rem;
      overflow: hidden;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
      border:none;
      filter: brightness(50%);
    }
`;
const BadgesContainer = styled.div`  
  display: flex;
  flex-flow: wrap;
`;
const Badge = styled.div`
  cursor:pointer;
  padding:1rem;
  color: #323840;
  width: max-content;
  border-radius: 2rem;
  overflow: hidden;
  margin: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  &:hover img {
    transform: scale(1.03);
  }
`

const TopicsContainer = styled.div`  
  flex-flow: wrap;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;
