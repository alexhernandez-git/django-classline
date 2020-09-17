import React, { useEffect } from "react";
import Video from "src/components/ui/VideoList";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import VideoPlayer from "src/components/ui/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";

import { useParams, Link } from "react-router-dom";
import { fetchPlaylist } from "src/redux/actions/course";
const PlaylistPage = (props) => {
  const dispatch = useDispatch();

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
  const courseReducer = useSelector((state) => state.courseReducer);
  return (
    <Main padding>
      <div className="row">
        <div className="col-md-6 col-lg-8">
          {courseReducer.playlist &&
            !courseReducer.isLoading &&
            courseReducer.playlist.tracks.length > 0 && (
              <VideoPlayer
                video={courseReducer.playlist.tracks[trackId].video}
              />
            )}
          {courseReducer.isLoading && <span>Cargando...</span>}
          {courseReducer.playlist.tracks.length == 0 && (
            <span>No hay videos en esta lista</span>
          )}
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="d-block d-md-none m-5"></div>

          <div className="d-flex justify-content-center bg-dark text-white p-4 h2 mb-0">
            <span>{courseReducer.playlist && courseReducer.playlist.name}</span>
          </div>
          <PlaylistScroll>
            <div className="p-3">
              {courseReducer.playlist &&
                courseReducer.playlist.tracks.map((track, index) => (
                  <Link
                    to={{
                      pathname: `/academy/${programReducer.program.code}/course/${courseReducer.playlist.id}/${index}`,
                      query: { track: track.id },
                    }}
                    params={{ track: track.id }}
                    key={track.id}
                  >
                    <PlaylistVideo
                      className={
                        track.id == trackId
                          ? "active d-flex justify-content-between align-items-center cursor-pointer"
                          : "d-flex justify-content-between align-items-center cursor-pointer"
                      }
                    >
                      <span className="mr-4">{index + 1}</span>
                      <Video video={track.video} />
                    </PlaylistVideo>
                  </Link>
                ))}
              {courseReducer.isLoading && <span>Cargando...</span>}
            </div>
          </PlaylistScroll>
        </div>
      </div>
    </Main>
  );
};
const PlaylistScroll = styled.div`
  background: #fff;
  max-height: 80vh;
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
export default PlaylistPage;
