import { useParams, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { textEllipsis } from "./TextEllipsis";
import { IconContext } from "react-icons";
import {
  FaFileAlt,
  FaFolder,
  FaCog,
  FaEdit,
  FaTrashAlt,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileCsv,
  FaFilePowerpoint,
  FaFilePdf,
} from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { Formik, Form as FormFormik } from "formik";
import { CirclePicker } from "react-color";
import {
  MdCancel,
  MdShare,
  MdFileDownload,
  MdEdit,
  MdDelete,
  MdPublic,
  MdLock,
  MdFormatColorFill,
} from "react-icons/md";
import { IoMdUnlock, IoMdLock } from "react-icons/io";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { editFolder, editSharedUsersFolder } from "../../redux/actions/folders";
import { editFile, editSharedUsersFile } from "../../redux/actions/files";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { ButtonCustom } from "./ButtonCustom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ShareForm from "../../components/AdminAcademy/ShareForm";

const FileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El color no el válido")
    .max(50, "El color no el válido")
    .required("Este campo es obligatorio"),
});

const DocsItem = (props) => {
  const MySwal = withReactContent(Swal);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const {
    is_file,
    file,
    folder,
    admin,
    handleDeleteFolder,
    handleDeleteFile,
    hanldeEnterFolder,
  } = props;
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { program } = useParams();
  const [isEditing, setIsEditing] = useState(props.is_editing);
  const [inputValue, setInputValue] = useState(
    is_file ? file.name : folder.name
  );
  const input = useRef();
  const [isPrivate, setIsPrivate] = useState(
    is_file ? file.is_private : folder.is_private
  );
  const [color, setColor] = useState(!is_file && folder.color);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (input.current && !input.current.contains(event.target)) {
        handleUpdateName();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [input]);
  const handleUpdateName = (e = null) => {
    if (e) {
      e.preventDefault();
    }
    if (is_file) {
      if (file.name != inputValue) {
        dispatch(
          editFile({
            id: file.id,
            name: inputValue,
          })
        );
      }
    } else {
      if (folder.name != inputValue) {
        dispatch(
          editFolder({
            id: folder.id,
            name: inputValue,
          })
        );
      }
    }
    setIsEditing(false);
  };
  const handleUpdatePrivacity = (privacity) => {
    if (is_file) {
      if (file.is_private != privacity) {
        MySwal.fire({
          title: "Estas seguro?",
          text: privacity
            ? `Cambiaras de pública a privada`
            : `Cambiaras de privada a pública`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Cambiar",
          cancelButtonText: "Atras",
        }).then((result) => {
          if (result.value) {
            dispatch(
              editFile({
                id: file.id,
                is_private: privacity,
              })
            );
            setIsPrivate(privacity);

            MySwal.fire({
              title: "Privacidad cambiada!",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
        });
      }
    } else {
      if (folder.is_private != privacity) {
        MySwal.fire({
          title: "Estas seguro?",
          text: privacity
            ? `Cambiaras de pública a privada`
            : `Cambiaras de privada a pública`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Cambiar",
          cancelButtonText: "Atras",
        }).then((result) => {
          if (result.value) {
            dispatch(
              editFolder({
                id: folder.id,
                is_private: privacity,
              })
            );
            setIsPrivate(privacity);

            MySwal.fire({
              title: "Privacidad cambiada!",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
        });
      }
    }
    setIsEditing(false);
  };

  const handleUpdateColor = (e) => {
    e.preventDefault();
    if (!is_file) {
      if (folder.color != color) {
        dispatch(
          editFolder({
            id: folder.id,
            color: color,
          })
        );
      }
    }
    handleClose(false);
  };
  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };
  const handleDownloadFile = () => {};

  const [showShare, setShowShare] = useState(false);

  const handleCloseShare = () => {
    setShowShare(false);
  };
  const handleShowShare = () => {
    setShowShare(true);
  };
  const setFileIcon = () => {
    console.log(file.filename.split(".").pop());
    switch (file.filename.split(".").pop()) {
      case "docx":
      case "DOCX":
        return <FaFileWord style={{ color: "#4285f4" }} />;
      case "xlsx":
      case "XLSX":
        return <FaFileExcel style={{ color: "#0f9d58" }} />;
      case "PNG":
      case "png":
      case "JPG":
      case "jpg":
      case "JPEG":
      case "jpeg":
        return <FaFileImage style={{ color: "#777" }} />;
      case "csv":
      case "CSV":
        return <FaFileCsv style={{ color: "#0f9d58" }} />;
      case "PPTX":
      case "pptx":
      case "PPT":
      case "ppt":
        return <FaFilePowerpoint style={{ color: "#fd7541" }} />;
      case "PDF":
      case "pdf":
        return <FaFilePdf style={{ color: "#ea4335" }} />;

      default:
        return <FaFileAlt />;
    }
  };
  return (
    <Content>
      {admin && (
        <div className="d-flex justify-content-between">
          <div></div>
          <div>
            {!is_file && (
              <IconContext.Provider
                value={{
                  size: 20,
                  className: "cursor-pointer text-dark mr-2 action-icon",
                }}
              >
                <OverlayTrigger
                  key={"top"}
                  placement={"top"}
                  overlay={<Tooltip id={`tooltip-p`}>Cambiar color.</Tooltip>}
                >
                  <MdFormatColorFill onClick={handleShow} />
                </OverlayTrigger>
              </IconContext.Provider>
            )}
            {isPrivate ? (
              <IconContext.Provider
                value={{
                  size: 20,
                  className: "cursor-pointer text-dark mr-2 action-icon",
                }}
              >
                <OverlayTrigger
                  key={"top"}
                  placement={"top"}
                  overlay={
                    <Tooltip id={`tooltip-p`}>
                      Clica para cambiar de privado a publico.
                    </Tooltip>
                  }
                >
                  <MdLock onClick={() => handleUpdatePrivacity(false)} />
                </OverlayTrigger>
              </IconContext.Provider>
            ) : (
              <IconContext.Provider
                value={{
                  size: 20,
                  className: "cursor-pointer text-dark mr-2 action-icon",
                }}
              >
                <OverlayTrigger
                  key={"top"}
                  placement={"top"}
                  overlay={
                    <Tooltip id={`tooltip-top`}>
                      Clica para cambiar de publico a privado.
                    </Tooltip>
                  }
                >
                  <MdPublic onClick={() => handleUpdatePrivacity(true)} />
                </OverlayTrigger>
              </IconContext.Provider>
            )}
            <IconContext.Provider
              value={{
                size: 20,
                className: "cursor-pointer text-dark mr-2 action-icon",
              }}
            >
              <OverlayTrigger
                key={"top"}
                placement={"top"}
                overlay={<Tooltip id={`tooltip-p`}>Compartir.</Tooltip>}
              >
                <MdShare onClick={handleShowShare} />
              </OverlayTrigger>
            </IconContext.Provider>

            <IconContext.Provider
              value={{
                size: 20,
                className: "cursor-pointer text-dark mr-2 action-icon",
              }}
            >
              <OverlayTrigger
                key={"top"}
                placement={"top"}
                overlay={<Tooltip id={`tooltip-p`}>Editar.</Tooltip>}
              >
                <MdEdit onClick={() => setIsEditing(true)} />
              </OverlayTrigger>
            </IconContext.Provider>

            <IconContext.Provider
              value={{
                size: 20,
                className: "cursor-pointer text-dark action-icon",
              }}
            >
              <OverlayTrigger
                key={"top"}
                placement={"top"}
                overlay={<Tooltip id={`tooltip-p`}>Eliminar.</Tooltip>}
              >
                <MdDelete
                  onClick={() =>
                    is_file
                      ? handleDeleteFile(file)
                      : handleDeleteFolder(folder)
                  }
                />
              </OverlayTrigger>
            </IconContext.Provider>
          </div>
        </div>
      )}
      <div className="content">
        <IconContext.Provider
          value={{
            size: 100,
            className: "cursor-pointer",
            color: !is_file && folder.color,
          }}
        >
          {is_file ? (
            <a
              href={!/\/demo\//.test(pathname) ? file.file : "#"}
              target={!/\/demo\//.test(pathname) ? "_blank" : "_self"}
            >
              {setFileIcon()}
            </a>
          ) : (
            <FaFolder onClick={() => hanldeEnterFolder(folder)} />
          )}
        </IconContext.Provider>
        <div className="text">
          {console.log(isEditing && admin)}
          {isEditing && admin ? (
            <form onSubmit={(e) => handleUpdateName(e)}>
              <input
                ref={input}
                className="input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                autoFocus
              />
            </form>
          ) : (
            <small
              css={textEllipsis}
              className="text-center"
              onDoubleClick={() => setIsEditing(true)}
            >
              {inputValue}
            </small>
          )}
        </div>
      </div>
      {/* <div className="d-flex justify-content-end">
        {file && (
          <IconContext.Provider
            value={{
              size: 20,
              className: "cursor-pointer text-dark action-icon mr-2",
            }}
          >
            <OverlayTrigger
              key={"bottom"}
              placement={"bottom"}
              overlay={<Tooltip id={`tooltip-p`}>Descargar.</Tooltip>}
            >
              <MdFileDownload />
            </OverlayTrigger>
          </IconContext.Provider>
        )}
      </div> */}
      {console.log(color)}
      <Modal show={show} onHide={handleClose} size="sm" centered>
        <form onSubmit={handleUpdateColor}>
          <Modal.Header closeButton>
            <Modal.Title>Cambiar de color</Modal.Title>
          </Modal.Header>
          <div className="m-3 d-flex justify-content-center align-items-center">
            <CirclePicker
              color={color ? color : ""}
              onChangeComplete={handleChangeComplete}
              colors={[
                "#f44336",
                "#e91e63",
                "#9c27b0",
                "#673ab7",
                "#3f51b5",
                "#2196f3",
                "#03a9f4",
                "#00bcd4",
                "#009688",
                "#4caf50",
                "#8bc34a",
                "#cddc39",
                "#ffeb3b",
                "#ffc107",
                "#ff9800",
                "#ff5722",
                "#795548",
                // "#607d8b",
                "#212529",
              ]}
            />
          </div>
          <Modal.Footer>
            <ButtonCustom type="submit">Guardar</ButtonCustom>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showShare} onHide={handleCloseShare} size="lg">
        <Formik
          enableReinitialize={true}
          initialValues={{
            id: is_file ? file.id : folder.id,
            shared_users: is_file ? file.shared_users : folder.shared_users,
          }}
          onSubmit={(values) => {
            console.log(values);
            if (is_file) {
              dispatch(editSharedUsersFile(values));
            } else {
              dispatch(editSharedUsersFolder(values));
            }
            handleCloseShare();
          }}
        >
          {(props) => {
            return (
              <>
                <FormFormik>
                  <Modal.Header closeButton>
                    <Modal.Title>Compartir con tus alumnos</Modal.Title>
                  </Modal.Header>
                  <ShareForm
                    values={props.values}
                    setFieldValue={props.setFieldValue}
                    errors={props.errors}
                    touched={props.touched}
                  />
                  <Modal.Footer>
                    <ButtonCustom type="submit">Compartir</ButtonCustom>
                  </Modal.Footer>
                </FormFormik>
              </>
            );
          }}
        </Formik>
      </Modal>
    </Content>
  );
};

export const Content = styled.span`
  width: 100%;
  display: block;
  overflow: hidden;
  position: relative;
  img {
    transition: 0.5s ease;
    width: 100%;
  }
  .action-icon {
    opacity: 0;
  }
  &:hover .action-icon {
    opacity: 1;
    transition: 0.2s all ease;
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .text {
    align-items: center;
    bottom: 0;
    width: 100%;
    height: 20%;
    text-align: center;
  }
  .input {
    align-items: center;
    font-size: 12.8px;
  }
`;

export default DocsItem;
