import { Link, useParams, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { textEllipsis } from "./TextEllipsis";
import moment from "moment";
import { IconContext } from "react-icons";
import { FaFileAlt, FaFolder, FaCog, FaEdit, FaTrashAlt } from "react-icons/fa";
import { ImLock, ImUnlocked } from "react-icons/im";
import { useState, useRef, useEffect } from "react";
import {
  MdCancel,
  MdShare,
  MdFileDownload,
  MdEdit,
  MdDelete,
  MdPublic,
  MdLock,
} from "react-icons/md";
import { IoMdUnlock, IoMdLock } from "react-icons/io";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const DocsItem = (props) => {
  const { file, admin, handleShowShare } = props;
  const { pathname } = useLocation();
  const { program } = useParams();
  const [isEditing, setIsEditing] = useState(props.isEditing);
  const [inputValue, setInputValue] = useState("Rutina de pectoral");
  const input = useRef();
  const [isPrivate, setIsPrivate] = useState(false);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (input.current && !input.current.contains(event.target)) {
        handleUpdateName();
        console.log("entra");
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
    setIsEditing(false);
  };
  return (
    <Content>
      {admin && (
        <div className="d-flex justify-content-end">
          {isPrivate ? (
            <IconContext.Provider
              value={{
                size: 20,
                className: "cursor-pointer text-dark mr-2",
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
                <MdLock onClick={() => setIsPrivate(false)} />
              </OverlayTrigger>
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{
                size: 20,
                className: "cursor-pointer text-dark mr-2",
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
                <MdPublic onClick={() => setIsPrivate(true)} />
              </OverlayTrigger>
            </IconContext.Provider>
          )}
          <IconContext.Provider
            value={{
              size: 20,
              className: "cursor-pointer text-dark mr-2",
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
              className: "cursor-pointer text-dark mr-2",
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
              className: "cursor-pointer text-dark",
            }}
          >
            <OverlayTrigger
              key={"top"}
              placement={"top"}
              overlay={<Tooltip id={`tooltip-p`}>Eliminar.</Tooltip>}
            >
              <MdDelete />
            </OverlayTrigger>
          </IconContext.Provider>
        </div>
      )}
      <div className="content">
        <IconContext.Provider
          value={{
            size: 100,
            className: "cursor-pointer text-dark",
          }}
        >
          {file ? <FaFileAlt /> : <FaFolder />}
        </IconContext.Provider>
        <div className="text">
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
      <div className="d-flex justify-content-end">
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
      </div>
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
