import { Link, useParams, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { textEllipsis } from "./TextEllipsis";
import moment from "moment";
const Video = (props) => {
  const { pathname } = useLocation();
  const { program, pack } = useParams();
  const { id, title, picture, duration } = props.video;
  function msToHMS(seconds) {
    if (isNaN(seconds)) {
      return "00:00";
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  }
  return (
    <Link
      to={
        pack ? `/pack/${program}/${pack}/video/${id}` : 
        !/\/demo\//.test(pathname)
          ? `/academy/${program}/video/${id}`
          : pathname
      }
    >
      <VideoContent className="cursor-pointer">
        <div className="video-content">
          <img
            className="rounded"
            src={
              picture ? picture : "../../../../static/assets/img/no-foto.png"
            }
            alt="video"
          />
          <div className="d-flex justify-content-between video-text">
            <span css={textEllipsis}>{title}</span>
            <small
              css={textEllipsis}
              style={{
                minWidth: "40px",
                textAlign: "right",
              }}
            >
              {msToHMS(duration)}
            </small>
          </div>
        </div>
      </VideoContent>
    </Link>
  );
};

export const VideoContent = styled.span`
  width: 100%;
  display: block;
  overflow: hidden;

  img {
    transition: 0.5s ease;
    width: 100%;
  }
  .video-content:hover img {
    transform: scale(1.03);
  }
  .video-content {
    position: relative;
  }
  .video-text {
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #fff;
    padding: 1rem;
    height: 20%;
    background: rgba(0, 0, 0, 0.6);
  }
`;

export default Video;
