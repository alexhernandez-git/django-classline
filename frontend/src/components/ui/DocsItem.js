import { Link, useParams, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { textEllipsis } from "./TextEllipsis";
import moment from "moment";
import { IconContext } from "react-icons";
import { FaFileAlt, FaFolder, FaCog } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { MdCancel, MdShare, MdFileDownload } from "react-icons/md";

const DocsItem = (props) => {
  const { file, admin } = props;
  const { pathname } = useLocation();
  const { program } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("Rutina de pectoral");
  const input = useRef();
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (input.current && !input.current.contains(event.target)) {
        setIsEditing(false);
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
  return (
    <Content>
      {admin && (
        <div className="d-flex justify-content-end">
          <IconContext.Provider
            value={{
              size: 20,
              className: "cursor-pointer text-dark action-icon mr-2",
            }}
          ></IconContext.Provider>
          <IconContext.Provider
            value={{
              size: 20,
              className: "cursor-pointer text-dark action-icon mr-2",
            }}
          >
            <FaCog />
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              size: 20,
              className: "cursor-pointer text-dark action-icon mr-2",
            }}
          >
            <MdShare />
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              size: 20,
              className: "cursor-pointer text-dark action-icon",
            }}
          >
            <MdCancel />
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
            <input
              ref={input}
              className="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
            />
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
        <IconContext.Provider
          value={{
            size: 20,
            className: "cursor-pointer text-dark action-icon mr-2",
          }}
        >
          <MdFileDownload />
        </IconContext.Provider>
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
