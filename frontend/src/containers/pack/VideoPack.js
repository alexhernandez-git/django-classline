import React, { useEffect } from "react";
import Video from "src/components/ui/VideoList";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import VideoPlayer from "src/components/ui/VideoPlayer";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { fetchVideo } from "src/redux/actions/video";

import { Link } from "react-router-dom";
const video = () => {
  const dispatch = useDispatch();

  const router = useParams();
  const { program } = router;
  const { id } = router;
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (id && !programReducer.isLoading) {
      const dispatchFetchVideo = (id) => dispatch(fetchVideo(id));
      dispatchFetchVideo(id);
    }
  }, [id, programReducer.isLoading]);
  const recomendedVideosReducer = useSelector(
    (state) => state.recomendedVideosReducer
  );
  const videoReducer = useSelector((state) => state.videoReducer);

  return (
    <Main padding>
      <div className="row">
        <div className="col-md-10 offset-md-1 col-xl-8 offset-xl-2">
          {videoReducer.video && !videoReducer.isLoading && (
            <VideoPlayer video={videoReducer.video} />
          )}
          {videoReducer.isLoading && <span>Cargando...</span>}
        </div>
      
      </div>
    </Main>
  );
};

export default video;
