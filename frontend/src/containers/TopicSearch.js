import React, { useState, useEffect } from "react";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import MainProgramInfo from "src/components/MainPage/MainProgramInfo";
import { textEllipsis } from "src/components/ui/TextEllipsis";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import SearchVideos from "src/components/SearchAcademyTopic/SearchVideos";
import SearchPodcasts from "src/components/SearchAcademyTopic/SearchPodcasts";
import SearchPlaylists from "src/components/SearchAcademyTopic/SearchPlaylists";
import TopicBanner from "../components/ui/TopicBanner";
import { fetchVideosTopic } from "../redux/actions/topics/videosTopic";
import { fetchPlaylistsTopic } from "../redux/actions/topics/playlistsTopic";
import { fetchPodcastsTopic } from "../redux/actions/topics/podcastsTopic";
import { fetchTopic } from "../redux/actions/topics/topic";
export default function ThemeSearch() {
  const history = useHistory();
  const { program,topic } = useParams();
  const {state} = useLocation()

  const authReducer = useSelector((state) => state.authReducer);
  // useEffect(() => {
  //   console.log("isloading", authReducer.isLoading);
  //   // if (!authReducer.isLoading && !authReducer.isAuthenticated)
  //   // history.push(`/academy/${program}`);
  // }, [authReducer.isLoading]);
  const [topicSearch, setTopicSearch] = useState(state?.search)
  const handleSearchSubmit = (e) =>{
    e.preventDefault()
      const dispatchFetchVideos = (topicSearch) => dispatch(fetchVideosTopic(topicSearch));
      dispatchFetchVideos(topicSearch);
      const dispatchFetchPlaylists = (topicSearch) =>
        dispatch(fetchPlaylistsTopic(topicSearch));
      dispatchFetchPlaylists(topicSearch);
      const dispatchFetchPopularPodcasts = (topicSearch) =>
        dispatch(fetchPodcastsTopic(topicSearch));
      dispatchFetchPopularPodcasts(topicSearch);

  }
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  const topicReducer = useSelector((state) => state.topicReducer);
  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchTopic = () => dispatch(fetchTopic(topic));
      dispatchFetchTopic();
    }
  }, [programReducer.isLoading]);

  useEffect(() => {
    if (!topicReducer.isLoading && topicReducer.topic) {
      const dispatchFetchVideos = (search) => dispatch(fetchVideosTopic(search));
      dispatchFetchVideos(state?.search);
      const dispatchFetchPlaylists = (search) =>
        dispatch(fetchPlaylistsTopic(search));
      dispatchFetchPlaylists(state?.search);
      const dispatchFetchPopularPodcasts = (search) =>
        dispatch(fetchPodcastsTopic(search));
      dispatchFetchPopularPodcasts(state?.search);
    }
  }, [topicReducer.isLoading]);

  return (
    !topicReducer.isLoading && (
      <>
        <Main className="text-grey">
          
          <TopicBanner searchBar                 
              search={{search: topicSearch, setSearch: setTopicSearch}}
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
                <hr />
              </>
            )}
            {/* {programReducer.program.are_meetups && <ThisWeekMeetups />} */}
          </div>
        </Main>
      </>
    )
  );
}

