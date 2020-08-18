import React from "react";
import styled from "@emotion/styled";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IconContext } from "react-icons";
import moment from "moment";
const VideoCard = (props) => {
  const { id, title, description, picture, created } = props.video;
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
        <TitleDiv className="d-flex flex-column justify-content-between  text-break">
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
        </TitleDiv>
        {/* <div className="d-none d-xl-flex align-items-center justify-content-center flex-column mx-4">
          <span className="h5 m-0 font-weight-normal">{views}</span>
          <small>Visitas</small>
        </div> */}
        <div className="d-flex align-items-center justify-content-center ml-3">
          <IconContext.Provider
            value={{
              size: 23,
              className: "cursor-pointer",
            }}
          >
            <MdEdit onClick={() => props.handleShow(props.video)} />
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              size: 20,
              className: "cursor-pointer ml-3",
            }}
          >
            <FaTrashAlt onClick={() => props.handleVideoDelete(id)} />
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
const TitleDiv = styled.div`
  width: 100%;
`;
export default VideoCard;
