import React, { useEffect } from "react";
import Video from "src/components/ui/VideoList";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import VideoPlayer from "src/components/ui/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";

import { useParams, Link } from "react-router-dom";
import { fetchPlaylist } from "src/redux/actions/playlist";
const PlaylistPage = (props) => {
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
  const playlistReducer = useSelector((state) => state.playlistReducer);



  return (
    <Main padding>
      <div className="row">

        <div className="col-md-6 col-lg-8">
          {playlistReducer.playlist &&
            !playlistReducer.isLoading &&
            playlistReducer.playlist.tracks.length > 0 && (
              <VideoPlayer
                video={playlistReducer.playlist.tracks[trackId].video}

              />
            )}
          {playlistReducer.isLoading && <span>Cargando...</span>}
          {playlistReducer.playlist.tracks.length == 0 && (
            <span>No hay videos en esta lista</span>
          )}
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="d-block d-md-none m-5"></div>

          <PlaylistScroll>
            <div className="d-flex justify-content-center h3 mb-3">
              <span>
                {playlistReducer.playlist && playlistReducer.playlist.name}
              </span>
            </div>

            {playlistReducer.playlist &&
              playlistReducer.playlist.tracks.map((track, index) => (
                <Link
                  to={{
                    pathname: `/academy/${programReducer.program.code}/playlist/${playlistReducer.playlist.id}/${index}`,
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
            {playlistReducer.isLoading && <span>Cargando...</span>}
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
  padding: 1rem;
  box-shadow: inset 0 0 20px 0px #ccc;
  @media screen and (max-width: 768px) {
    max-height: inherit;
    box-shadow: none;
  }
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
