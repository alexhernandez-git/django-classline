import { Link, useParams, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { textEllipsis } from "./TextEllipsis";
import { MdPlaylistPlay } from "react-icons/md";
import { IconContext } from "react-icons";
const Playlist = (props) => {
  const { pathname } = useLocation();

  const { program } = useParams();
  const { id, name, picture, tracks } = props.playlist;
  return (
    <Link
      to={
        !/\/demo\//.test(pathname)
          ? `/academy/${program}/playlist/${id}`
          : pathname
      }
    >
      <VideoContent>
        <div className="playlist-content">
          <img
            className="rounded"
            src={
              picture ? picture : "../../../../static/assets/img/no-foto.png"
            }
            alt="video"
          />
          <IconContext.Provider
            value={{
              size: 40,
              className: "playlist-icon",
              color: "#fff",
            }}
          >
            <MdPlaylistPlay />
          </IconContext.Provider>
          <div className="d-flex justify-content-between playlist-text">
            <span css={textEllipsis}>{name}</span>
            <small css={textEllipsis}>{tracks.length} Videos</small>
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
  .playlist-content:hover img {
    transform: scale(1.03);
  }
  .playlist-content {
    position: relative;
  }
  .playlist-text {
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #fff;
    padding: 1rem;
    height: 20%;
    background: rgba(0, 0, 0, 0.6);
  }
  .playlist-icon {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    text-align: center;
    background: rgba(0, 0, 0, 0.6);
    padding: 0.2rem;
    height: 15%;
  }
`;

export default Playlist;
