import React, { useState, useEffect } from "react";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import MainProgramInfo from "src/components/MainPage/MainProgramInfo";
import ProgramDescription from "src/components/MainPage/ProgramDescription";
import ProgramBenefits from "src/components/MainPage/ProgramBenefits";
import FavouriteVideos from "src/components/MainPage/FavouriteVideos";
import FavouritePodcasts from "src/components/MainPage/FavouritePodcasts";
import MainPlaylists from "src/components/MainPage/MainPlaylists";
import ThisWeekMeetups from "src/components/MainPage/ThisWeekMeetups";
import { useDispatch } from "react-redux";
import { fetchPopularVideos } from "src/redux/actions/popularVideos";
import { fetchPopularPlaylists } from "src/redux/actions/popularPlaylists";
import { fetchPopularPodcasts } from "src/redux/actions/popularPodcasts";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

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
        <Main>
          <MainProgramContainer>
            <div className="container">
              <div className="row mx-auto">
                <MainProgramInfo />
              </div>
            </div>
          </MainProgramContainer>

          <div className="container my-5">
            {programReducer.program.are_videos && (
              <>
                <div className="mb-4">
                  <FavouriteVideos />
                </div>
                <hr />
              </>
            )}
            {programReducer.program.are_playlists && (
              <>
                <div className="mb-4">
                  <MainPlaylists />
                </div>
                <hr />
              </>
            )}
            {programReducer.program.are_podcasts && (
              <>
                <div className="mb-4">
                  <FavouritePodcasts />
                </div>
                <hr />
              </>
            )}
            {programReducer.program.are_meetups && <ThisWeekMeetups />}
          </div>
        </Main>
      </>
    )
  );
}

export const MainProgramContainer = styled.div`
  background: var(--darkgray);
  padding-top: 2rem;
`;

export const Title = styled.div`
  font-size: 2.8rem;
`;
