import React, { useState, useEffect } from "react";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import MainProgramInfo from "src/components/MainPage/MainProgramInfo";
import { textEllipsis } from "src/components/ui/TextEllipsis";

import { useDispatch } from "react-redux";
import { fetchVideos } from "src/redux/actions/videos";
import { fetchPlaylists } from "src/redux/actions/courses";
import { fetchPodcasts } from "src/redux/actions/podcasts";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { FaListUl, FaPodcast, FaRegPlayCircle, FaSearch } from "react-icons/fa";
import TopicCard from "../components/AdminAcademy/TopicCard";
import SearchElementCard from "../components/AdminAcademy/SearchElementCard";
import SearchVideos from "src/components/SearchAcademy/SearchVideos";
import SearchPodcasts from "src/components/SearchAcademy/SearchPodcasts";
import SearchPlaylists from "src/components/SearchAcademy/SearchPlaylists";
export default function GeneralSearch() {
  const history = useHistory();
  const { program, search } = useParams();
  const authReducer = useSelector((state) => state.authReducer);
  // useEffect(() => {
  //   console.log("isloading", authReducer.isLoading);
  //   // if (!authReducer.isLoading && !authReducer.isAuthenticated)
  //   // history.push(`/academy/${program}`);
  // }, [authReducer.isLoading]);
  const [generalSearch, setGeneralSearch] = useState(search)
  const handleSearchSubmit = (e) =>{
    e.preventDefault()
    const dispatchFetchVideos = (generalSearch) => dispatch(fetchVideos(generalSearch));
    dispatchFetchVideos(generalSearch);
    const dispatchFetchPlaylists = (generalSearch) =>
      dispatch(fetchPlaylists(generalSearch));
    dispatchFetchPlaylists(generalSearch);
    const dispatchFetchPodcasts = (generalSearch) =>
      dispatch(fetchPodcasts(generalSearch));
    dispatchFetchPodcasts(generalSearch);
    history.push(`/academy/${program}/search/${generalSearch}`)

  }
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchVideos = (search) => dispatch(fetchVideos(search));
      dispatchFetchVideos(search);
      const dispatchFetchPlaylists = (search) =>
        dispatch(fetchPlaylists(search));
      dispatchFetchPlaylists(search);
      const dispatchFetchPodcasts = (search) =>
        dispatch(fetchPodcasts(search));
      dispatchFetchPodcasts(search);
    }
  }, [programReducer.isLoading]);

  return (
    !programReducer.isLoading && (
      <>
        <Main className="text-grey">
          <MainProgramContainer>
            <div className="container">
              <div className="mx-auto">
                <MainProgramInfo 
                  search={{search: generalSearch, setSearch: setGeneralSearch}}
                  handleSearchSubmit={handleSearchSubmit} 
                />
              </div>
            </div>
          </MainProgramContainer>

          
          <div className="container my-5">
            {programReducer.program.are_videos && (
              <>
                <div className="mb-4">
                  <SearchVideos />
                </div>
                <hr />
              </>
            )}
            {programReducer.program.are_admin_playlists && (
              <>
                <div className="mb-4">
                  <SearchPlaylists />
                </div>
                <hr />
              </>
            )}
            {programReducer.program.are_podcasts && (
              <>
                <div className="mb-4">
                  <SearchPodcasts />
                </div>
                {/* <hr /> */}
              </>
            )}
            {/* {programReducer.program.are_meetups && <ThisWeekMeetups />} */}
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
