import React from "react";
import styled from "@emotion/styled";
import { FaTrashAlt, FaPlay } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IconContext } from "react-icons";
import { Link, useParams } from "react-router-dom";
const PlaylistCard = (props) => {
  const { program } = useParams();
  const { id, name, picture, tracks } = props.playlist;
  return (
    <VideoItem
      className="my-course d-flex justify-content-between rounded bg-white"
      style={{
        height: "120px",
      }}
    >
      <img
        className="h-100 rounded-left"
        style={{
          width: "100px",
          objectFit: "cover",
        }}
        variant="top"
        src={picture ? picture : "../../../static/assets/img/no-foto.png"}
      />

      <div className="my-course d-flex justify-content-between w-100 p-4">
        <div className="title-div d-flex flex-column justify-content-between  text-break w-100">
          <div className=" text-break">
            <span
              className="font-weight-bold text-break"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </span>
          </div>
          <small
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            11/08/12
          </small>
        </div>
        <div className="d-none d-xl-flex align-items-center justify-content-center flex-column mx-4">
          <span className="h5 m-0 font-weight-normal">{tracks.length}</span>
          <small>Videos</small>
        </div>
        <div className="d-flex align-items-center justify-content-center ml-3">
          <IconContext.Provider
            value={{
              size: 20,
              className: "cursor-pointer",
            }}
          >
            <Link to={`/academy/${program}/playlist/${id}`}>
              <FaPlay />
            </Link>
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              size: 23,
              className: "cursor-pointer ml-3",
            }}
          >
            <Link to={`/academy/${program}/playlist/form`}>
              <MdEdit
                onClick={() => props.handleSetEditPlaylist(props.playlist)}
              />
            </Link>
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              size: 20,
              className: "cursor-pointer ml-3",
            }}
          >
            <FaTrashAlt onClick={() => props.handleDeletePlaylist(id)} />
          </IconContext.Provider>
        </div>
      </div>
    </VideoItem>
  );
};
const VideoItem = styled.div`
  border-bottom: 1px solid #ccc;
  &:last-of-type {
    border: 0;
  }
`;
export default PlaylistCard;
