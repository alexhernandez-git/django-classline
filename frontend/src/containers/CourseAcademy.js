import React, { useEffect, useRef } from "react";
import Video from "src/components/ui/VideoList";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import VideoPlayer from "src/components/ui/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";

import { useParams, Link, useHistory } from "react-router-dom";
import { fetchPlaylist } from "src/redux/actions/playlistAdmin";
import CourseList from "../components/ui/CourseList";
import CourseSwitch from "../components/ui/CourseSwitch";
const CourseAcademy = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const router = useParams();
  const programReducer = useSelector((state) => state.programReducer);
  const videoId = router.id;
  const trackId = router.track ? router.track : 0;

  useEffect(() => {
    if (videoId && !programReducer.isLoading) {
      const dispatchFetchVideo = (id) => dispatch(fetchPlaylist(id));
      dispatchFetchVideo(videoId);
    }
  }, [videoId, programReducer.isLoading]);
  const playlistAdminReducer = useSelector(
    (state) => state.playlistAdminReducer
  );
  const goNext = () => {
    const newTrackId = Number(trackId) + 1;
    const maxPlaylistTrack = playlistAdminReducer.playlist.tracks.length;
    if (newTrackId < maxPlaylistTrack) {
      history.push({
        pathname: `/academy/${programReducer.program.code}/playlist/${playlistAdminReducer.playlist.id}/${newTrackId}`,
      });
    }
  };
  const goPrevious = () => {
    const newTrackId = Number(trackId) - 1;
    if (newTrackId >= 0) {
      history.push({
        pathname: `/academy/${programReducer.program.code}/playlist/${playlistAdminReducer.playlist.id}/${newTrackId}`,
      });
    }
  };
  // const playlistVideoRef = useRef(null)
  // useEffect(() => {
  //   console.log(playlistVideoRef);
  //   if (playlistVideoRef.current) {
  //     playlistVideoRef.current.scrollIntoView();
  //   }
  // }, [trackId])
  return (
    <Main style={{ padding: "1rem" }}>
      <CourseHeader>
        {playlistAdminReducer.playlist && playlistAdminReducer.playlist.name}
      </CourseHeader>
      <div className="row">
        <div className="col-md-6 col-lg-8">
          {playlistAdminReducer.playlist &&
            !playlistAdminReducer.isLoading &&
            playlistAdminReducer.playlist.tracks.length > 0 && (
              <>
                <VideoPlayer
                  video={playlistAdminReducer.playlist.tracks[trackId].video}
                  goNext={goNext}
                  goPrevious={goPrevious}
                  isPlaylist={true}
                />
                <CourseSwitch />
              </>
            )}
          {playlistAdminReducer.isLoading && <span>Cargando...</span>}
          {playlistAdminReducer.playlist.tracks.length == 0 && (
            <span>No hay videos en esta lista</span>
          )}
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="d-block d-md-none m-5"></div>

          <div className="d-flex justify-content-center p-4 h2 mb-0 shadow rounded">
            <span className="font-weight-bold">Contenido del curso</span>
          </div>
          <PlaylistScroll>
            <div className="p-3">
              {playlistAdminReducer.playlist &&
                playlistAdminReducer.playlist.tracks.map((track, index) => (
                  <Link
                    to={{
                      pathname: `/academy/${programReducer.program.code}/playlist/${playlistAdminReducer.playlist.id}/${index}`,
                      query: { track: track.id },
                    }}
                    params={{ track: track.id }}
                    key={track.id}
                  >
                    <PlaylistVideo
                      className={
                        index == trackId
                          ? "active d-flex justify-content-between align-items-center cursor-pointer"
                          : "d-flex justify-content-between align-items-center cursor-pointer"
                      }
                      // ref={index == trackId ? playlistVideoRef : null}
                    >
                      <span className="mr-4">{index + 1}</span>
                      <CourseList video={track.video} />
                    </PlaylistVideo>
                  </Link>
                ))}
              {playlistAdminReducer.isLoading && <span>Cargando...</span>}
            </div>
          </PlaylistScroll>
        </div>
      </div>
    </Main>
  );
};
const CourseHeader = styled.div`
  padding: 1.5rem;
  font-size: 2.4rem;
  margin-bottom: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  border-radius: 0.25rem !important;
`;
const PlaylistScroll = styled.div`
  background: #fff;
  max-height: calc(100vh - 21rem);
  overflow: auto;
  box-shadow: inset 0 0 20px 0px #ccc;
`;
const PlaylistVideo = styled.div`
  padding: 1rem;
  &:hover {
    background: #ececec;
  }
  &.active {
    background: #ececec;
  }
`;
export default CourseAcademy;
