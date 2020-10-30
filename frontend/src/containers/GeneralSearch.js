import React, { useState, useEffect } from "react";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import MainProgramInfo from "src/components/MainPage/MainProgramInfo";
import { textEllipsis } from "src/components/ui/TextEllipsis";

import { useDispatch } from "react-redux";
import { fetchVideos } from "src/redux/actions/videos";
import { fetchPlaylists } from "src/redux/actions/playlistsAdmin";
import { fetchPodcasts } from "src/redux/actions/podcasts";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";

import SearchVideos from "src/components/SearchAcademy/SearchVideos";
import SearchPodcasts from "src/components/SearchAcademy/SearchPodcasts";
import SearchPlaylists from "src/components/SearchAcademy/SearchPlaylists";
export default function GeneralSearch() {
  const history = useHistory();
  const { program } = useParams();
  const {search} = useLocation().state
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

          <MainProgramInfo 
            search={{search: generalSearch, setSearch: setGeneralSearch}}
            handleSearchSubmit={handleSearchSubmit} 
          />

          
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
