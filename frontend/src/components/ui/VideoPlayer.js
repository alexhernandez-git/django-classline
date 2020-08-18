import React from "react";
import styled from "@emotion/styled";
import moment from "moment";

const VideoPlayer = (props) => {
  const {
    id,
    title,
    description,
    video,
    picture,
    views,
    created,
  } = props.video;

  return (
    <>
      <video
        config={{ file: { attributes: { controlsList: "nodownload" } } }}
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload"
        controls
        autoPlay
        poster={picture}
        src={video}
        style={{ width: "100%" }}
      />
      <div className="d-flex justify-content-between mt-4">
        <div>
          <span className="d-block">{title}</span>
          <small>
            {/* {views} visualizaciones · {moment(created).format("DD-MM-YYYY")} */}
            {moment(created).format("DD-MM-YYYY")}
          </small>
        </div>
      </div>
      <div className="mt-2">{description}</div>
    </>
  );
};
const VideoButtons = styled.div``;

export default VideoPlayer;
