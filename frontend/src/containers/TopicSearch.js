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
import SearchVideos from "src/components/SearchAcademy/SearchVideos";
import SearchPodcasts from "src/components/SearchAcademy/SearchPodcasts";
import SearchPlaylists from "src/components/SearchAcademy/SearchPlaylists";
import TopicBanner from "../components/ui/TopicBanner";
export default function ThemeSearch() {
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
  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchPopularVideos = () => dispatch(fetchPopularVideos());
      dispatchFetchPopularVideos();
      const dispatchFetchPopularPlaylists = () =>
        dispatch(fetchPopularPlaylists());
      dispatchFetchPopularPlaylists();
      const dispatchFetchPopularPodcasts = () =>
        dispatch(fetchPopularPodcasts());
      dispatchFetchPopularPodcasts();
    }
  }, [programReducer.isLoading]);

  return (
    !programReducer.isLoading && (
      <>
        <Main className="text-grey">

          <TopicBanner searchBar />


          
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

