import React from "react";
import styled from "@emotion/styled";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IconContext } from "react-icons";
const PodcastCard = (props) => {
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
  const { id, title, description, audio, picture, duration } = props.podcast;
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
        src={picture ? picture : "/static/assets/img/no-foto.png"}
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
            11/08/12
          </small>
        </div>
        <div className="d-none d-xl-flex align-items-center justify-content-center flex-column mx-4">
          <span className="h5 m-0 font-weight-normal">
          {msToHMS(duration)}
          </span>
          <small>Minutos</small>
        </div>

        <div className="d-flex align-items-center justify-content-center ml-3">
          <IconContext.Provider
            value={{
              size: 23,
              className: "cursor-pointer",
            }}
          >
            <MdEdit onClick={() => props.handleShow(props.podcast)} />
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              size: 20,
              className: "cursor-pointer ml-3",
            }}
          >
            <FaTrashAlt onClick={() => props.handleDeletePodcast(id)} />
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
export default PodcastCard;
