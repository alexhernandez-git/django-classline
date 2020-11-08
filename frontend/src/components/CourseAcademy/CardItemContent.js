import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useDrag, useDrop } from "react-dnd";
import { IconContext } from "react-icons";
import { ItemTypes } from "../ItemTypes/ItemTypes";
import {
  FaEdit,
  FaFileAlt,
  FaFileVideo,
  FaGripLines,
  FaPlus,
  FaTimes,
  FaTrash,
  FaVideo,
} from "react-icons/fa";
import {
  MdAdd,
  MdEdit,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdModeEdit,
} from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { GrCirclePlay, GrDocumentText, GrFormAdd } from "react-icons/gr";
import { ButtonCustom } from "../ui/ButtonCustom";
import { AdminForm } from "../ui/AdminForm";
import { useDispatch } from "react-redux";
import { uploadItemFile } from "../../redux/actions/courses/items";

// import VideoList from "./VideoList";
const CardItemContent = ({
  moveCard,
  id,
  index,
  item,
  addContent,
  setAddContent,
  itemCards,
}) => {
  const dispatch = useDispatch();
  const handleAddVideo = (e) => {
    e.preventDefault();

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();

    // reader.onload = () => {
    //   setVideoSrc(reader.result);
    // };

    if (files[0].size > 500000000) {
      alert("El tamaño del video es muy grande");
    } else if (files[0].type != "video/mp4") {
      alert("El htmlFormato tiene que ser .mp4");
    } else {
      reader.readAsDataURL(files[0]);
      const content = {
        video: files[0],
        type_choices: "VI",
      };
      const dispatchUploadVideo = (content) =>
        dispatch(uploadItemFile(content, item.code));
      dispatchUploadVideo(content);
      setAddContent(false);
    }
  };
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
    <>
      <hr />
      {addContent ? (
        <>
          <div className="d-flex justify-content-around mt-4">
            <label htmlFor="video_content_upload">
              <div className="d-flex flex-column align-items-center justify-content-center cursor-pointer">
                <IconContext.Provider
                  value={{
                    size: 50,
                    className: "global-class-name",
                  }}
                >
                  <FaFileVideo />
                </IconContext.Provider>
                <span>Añadir video</span>
              </div>
            </label>

            <input
              type="file"
              id="video_content_upload"
              className="d-none"
              onChange={handleAddVideo}
            />
          </div>
        </>
      ) : (
        <>
          <div className="item-content">
            {console.log("newItem", item)}
            {(item?.content?.type_choices == "VI" ||
              item?.content?.type_choices == "TE") && (
              <>
                <div className="d-flex justify-content-center align-items-center">
                  {item.type_choices == "LE" &&
                    item?.content?.type_choices == "VI" && (
                      <IconContext.Provider
                        value={{
                          size: 50,
                          className: "global-class-name",
                        }}
                      >
                        <FaFileVideo />
                      </IconContext.Provider>
                    )}
                  {item.type_choices == "LE" &&
                    item?.content?.type_choices == "TE" && (
                      <IconContext.Provider
                        value={{
                          size: 50,
                          className: "global-class-name",
                        }}
                      >
                        <FaFileAlt />
                      </IconContext.Provider>
                    )}
                </div>
                <div>
                  {item.type_choices == "LE" &&
                    item?.content?.type_choices == "VI" && (
                      <>
                        <div>{item?.content?.name}</div>

                        <div>
                          {item?.content?.duration &&
                            msToHMS(item?.content?.duration)}
                        </div>
                        <div className="d-flex align-items-center cursor-pointer">
                          <IconContext.Provider
                            value={{
                              size: 14,
                              className:
                                "global-class-name mr-2 cursor-pointer",
                            }}
                          >
                            {" "}
                            <FaEdit />
                          </IconContext.Provider>
                          Cambiar video
                        </div>
                      </>
                    )}
                </div>
                <hr />
              </>
            )}
          </div>
          <div>
            <div className="mb-3">
              <ButtonCustom>
                <IconContext.Provider
                  value={{
                    size: 22,
                    className: "global-class-name mr-2 cursor-pointer",
                    color: "#fff",
                  }}
                >
                  {" "}
                  <MdAdd style={{ color: "#fff" }} />
                </IconContext.Provider>
                Descripción
              </ButtonCustom>
            </div>
            <div>
              <ButtonCustom>
                <IconContext.Provider
                  value={{
                    size: 22,
                    className: "global-class-name mr-2 cursor-pointer",
                    color: "#fff",
                  }}
                >
                  {" "}
                  <MdAdd style={{ color: "#fff" }} />
                </IconContext.Provider>
                Recursos
              </ButtonCustom>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const PlaylistVideo = styled.div`
  padding: 1rem;
  background: #fff;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  .item-actions {
    display: none;
  }
  .item-content {
    display: grid;
    grid-template-columns: 100px 1fr;
  }
  &:hover {
    .item-actions {
      display: flex;
    }
  }
  .new-element-div {
    display: flex;
    align-items: center;
    label {
      min-width: 140px;
      margin-bottom: 0;
    }
  }
`;
export default CardItemContent;
