import { Link, useParams, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { textEllipsis } from "./TextEllipsis";
import moment from "moment";
const Video = (props) => {
  const { pathname } = useLocation();
  const { program } = useParams();
  const { id, title, picture, duration } = props.video;
  function msToHMS(secconds) {
    // 1- Convert to seconds:
    var seconds = secconds / 1000;
    // 2- Extract hours:
    var hours = parseInt(secconds / 3600); // 3,600 seconds in 1 hour
    secconds = secconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt(secconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    secconds = secconds % 60;
    let hms;
    console.log(hours);
    if (hours !== 0) {
      console.log("entra");
      hms = hours + ":" + minutes + ":" + Math.floor(secconds);
    } else {
      hms = minutes + ":" + Math.floor(secconds);
    }
    return hms;
  }
  return (
    <Link
      to={
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
            <small css={textEllipsis}>{msToHMS(duration)}</small>
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
