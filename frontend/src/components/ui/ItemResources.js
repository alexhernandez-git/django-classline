import styled from "@emotion/styled";
import React, { useRef } from "react";
import { useState } from "react";
import { IconContext } from "react-icons";
import { FaFile, FaFolderOpen } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import { textEllipsis } from "./TextEllipsis";

const ItemResources = ({ item, isDemo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleMaterial = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const resourcesRef = useRef();

  useOutsideClick(resourcesRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });
  const handleDownloadResource = (e, file) => {
    e.preventDefault();
    if (!isDemo) window.open(file);
  };
  const playingCourseReducer = useSelector(
    (state) => state.playingCourseReducer
  );
  return (
    <ItemResourcesDiv color={playingCourseReducer.course.color}>
      <div className="item-resources" onClick={handleToggleMaterial}>
        <IconContext.Provider
          value={{
            size: 14,
            className: "global-class-name mr-2 cursor-pointer",
          }}
        >
          <FaFolderOpen />
        </IconContext.Provider>
        <small>Recursos</small>
        <IconContext.Provider
          value={{
            size: 14,
            className: "global-class-name mx-2 cursor-pointer",
          }}
        >
          {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </IconContext.Provider>
      </div>
      <div ref={resourcesRef}>
        {isOpen && (
          <div className="materials-div">
            {item.item.materials.map((material) => (
              <a onClick={(e) => handleDownloadResource(e, material.file)}>
                <div className="material-item">
                  <IconContext.Provider
                    value={{
                      size: 14,
                      className: "global-class-name mr-2 cursor-pointer",
                    }}
                  >
                    <FaFile />
                  </IconContext.Provider>

                  <small css={textEllipsis}>{material.name}</small>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </ItemResourcesDiv>
  );
};
const ItemResourcesDiv = styled.div`
  position: relative;

  .item-resources {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .materials-div {
    padding: 0.5rem;
    position: absolute;
    background: #fff;
    border: 1px solid ${(props) => (props.color ? props.color : "#ccc")};
    top: 2rem;
    left: -11rem;
    width: 214%;
    border-radius: 0.2rem;
    .material-item {
      display: grid;
      grid-template-columns: 1.8rem 1fr;
      align-items: center;
    }
  }
`;
export default ItemResources;
