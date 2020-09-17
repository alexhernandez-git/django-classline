import React from "react";
import styled from "@emotion/styled";
import { FaTrashAlt, FaPlayCircle, FaRegStopCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IconContext } from "react-icons";
import moment from "moment";
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
const Podcast = (props) => {
  const {
    id,
    title,
    description,
    picture,
    views,
    duration,
    created,
  } = props.podcast;
  const active = props.active;
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
        src={
          picture !== "" ? picture : "../../../../static/assets/img/no-foto.png"
        }
      />

      <div className="my-course d-flex justify-content-between w-100 p-4">
        <div className="d-flex flex-column justify-content-between  text-break w-100">
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
              {title}
            </span>
            <small
              className="text-break"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {description}
            </small>
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
            {moment(created).format("DD-MM-YYYY")}
          </small>
        </div>
        <div className="d-none d-xl-flex align-items-center justify-content-center flex-column mx-4">
          <span className="h5 m-0 font-weight-normal">{msToHMS(duration)}</span>
          <small>Minutos</small>
        </div>
        {/* <div className="d-none d-xl-flex align-items-center justify-content-center flex-column mx-4">
          <span className="h5 m-0 font-weight-normal">{views}</span>
          <small>Visitas</small>
        </div> */}
        <div className="d-flex align-items-center justify-content-center ml-3">
          {!active ? (
            <IconContext.Provider
              value={{
                style: {
                  cursor: "pointer",
                },
                size: 30,
                className: "global-class-name",
              }}
            >
              <FaPlayCircle onClick={() => props.handlePlay(props.podcast)} />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{
                style: {
                  cursor: "pointer",
                },
                size: 30,
                className: "global-class-name",
              }}
            >
              <FaRegStopCircle onClick={props.handleStop} />
            </IconContext.Provider>
          )}
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
export default Podcast;
