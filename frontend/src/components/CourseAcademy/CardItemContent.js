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
import { textEllipsis } from "src/components/ui/TextEllipsis";

import {
  updateContentDescription,
  updateItemFile,
  uploadItemFile,
} from "../../redux/actions/courses/items";
import EditContentDescription from "../ui/EditContentDescription";

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
  const handleAddVideo = (e, edit) => {
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
      if (edit) {
        const dispatchUpdateVideo = (content) =>
          dispatch(updateItemFile(content, item.code, item.content.id));
        dispatchUpdateVideo(content);
      } else {
        const dispatchUploadVideo = (content) =>
          dispatch(uploadItemFile(content, item.code));
        dispatchUploadVideo(content);
      }

      setAddContent(false);
    }
  };
  const handleUploadFile = (e, edit) => {
    e.preventDefault();

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();

    if (files[0].size > 2000000) {
      alert("El tamaño del archivo es muy grande");
    } else {
      // reader.onload = () => {
      //   setSrcFile(reader.result);
      // };
      reader.readAsDataURL(files[0]);
      // setFieldValue("file", files[0]);
      const content = {
        file: files[0],
        type_choices: "MA",
      };
      if (edit) {
        const dispatchUpdateMaterial = (content) =>
          dispatch(updateItemFile(content, item.code, item.content.id));
        dispatchUpdateMaterial(content);
      } else {
        const dispatchUploadMaterial = (content) =>
          dispatch(uploadItemFile(content, item.code));
        dispatchUploadMaterial(content);
      }
    }
    setAddContent(false);
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
  const [addDescription, setAddDescription] = useState(false);
  const [newDescription, setNewDescription] = useState(
    item?.content?.description
  );
  const handleOpenAddDescription = (e) => {
    e.preventDefault();

    setAddDescription(true);
  };
  const handleCloseAddDescription = (e) => {
    e.preventDefault();

    setAddDescription(false);
  };
  const [editDescription, setEditDescription] = useState(false);
  const handleOpenEditDescription = (e) => {
    e.preventDefault();
    setEditDescription(true);
  };
  const handleCloseEditDescription = (e) => {
    e.preventDefault();

    setEditDescription(false);
  };
  const handleEditDescription = (e, item, content, description, type) => {
    e.preventDefault();
    dispatch(updateContentDescription(description, item, content));
    if (type == "add") {
      handleCloseAddDescription(e);
    } else {
      handleCloseEditDescription(e);
    }
    setNewDescription("");
  };
  useEffect(() => {
    if (item?.content?.description) {
      setNewDescription(item?.content?.description);
    }
  }, [item]);
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
              onChange={(e) => handleAddVideo(e, false)}
            />
            <label htmlFor="file_content_upload">
              <div className="d-flex flex-column align-items-center justify-content-center cursor-pointer">
                <IconContext.Provider
                  value={{
                    size: 50,
                    className: "global-class-name",
                  }}
                >
                  <FaFileAlt />
                </IconContext.Provider>
                <span>Añadir material</span>
              </div>
            </label>

            <input
              type="file"
              id="file_content_upload"
              className="d-none"
              onChange={(e) => handleUploadFile(e, false)}
            />
          </div>
        </>
      ) : (
        <>
          <div className="item-content">
            {(item?.content?.type_choices == "VI" ||
              item?.content?.type_choices == "TE" ||
              item?.content?.type_choices == "MA") && (
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
                  {item.type_choices == "LE" &&
                    item?.content?.type_choices == "MA" && (
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
                        <label htmlFor="update_video_item">
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
                        </label>
                        <input
                          type="file"
                          id="update_video_item"
                          className="d-none"
                          onChange={(e) => handleAddVideo(e, true)}
                        />
                      </>
                    )}
                  {item.type_choices == "LE" &&
                    item?.content?.type_choices == "MA" && (
                      <>
                        <div>{item?.content?.name}</div>

                        <label htmlFor="update_material_item">
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
                            Cambiar material
                          </div>
                        </label>
                        <input
                          type="file"
                          id="update_material_item"
                          className="d-none"
                          onChange={(e) => handleUploadFile(e, true)}
                        />
                      </>
                    )}
                </div>
              </>
            )}
          </div>
          <hr />
          <div>
            {item?.content?.description ? (
              <div className="mb-3">
                {editDescription ? (
                  <EditContentDescription
                    newDescription={newDescription}
                    setNewDescription={setNewDescription}
                    handleEditDescription={handleEditDescription}
                    handleCloseEditDescription={handleCloseEditDescription}
                    type="edit"
                    item={item}
                  />
                ) : (
                  <>
                    <span css={textEllipsis}>{item?.content?.description}</span>
                    <div
                      className="d-flex align-items-center cursor-pointer"
                      onClick={handleOpenEditDescription}
                    >
                      <IconContext.Provider
                        value={{
                          size: 14,
                          className: "global-class-name mr-2 cursor-pointer",
                        }}
                      >
                        {" "}
                        <FaEdit />
                      </IconContext.Provider>
                      Editar descripción
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="mb-3">
                  {addDescription ? (
                    <EditContentDescription
                      newDescription={newDescription}
                      setNewDescription={setNewDescription}
                      handleEditDescription={handleEditDescription}
                      handleCloseAddDescription={handleCloseAddDescription}
                      type="add"
                      item={item}
                    />
                  ) : (
                    <ButtonCustom onClick={handleOpenAddDescription}>
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
                  )}
                </div>
              </>
            )}
            {/* <div>
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
            </div> */}
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
