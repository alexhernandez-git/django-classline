import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useState } from "react";
import { IconContext } from "react-icons";
import { FaFile, FaFolderOpen } from "react-icons/fa";
import {
  GrCheckbox,
  GrCheckboxSelected,
  GrCirclePlay,
  GrDocumentText,
} from "react-icons/gr";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemResources from "./ItemResources";
import { textEllipsis } from "./TextEllipsis";

function BlockItemsListContent({ track, index_block, showBlockInformation }) {
  const programReducer = useSelector((state) => state.programReducer);
  const playingCourseReducer = useSelector(
    (state) => state.playingCourseReducer
  );
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const handleToggleItems = () => {
    setIsItemsOpen(!isItemsOpen);
  };
  useEffect(() => {
    setIsItemsOpen(showBlockInformation);
  }, [showBlockInformation]);
  const [showInfoBlock, setshowInfoBlock] = useState(false);
  useEffect(() => {
    if (!isItemsOpen) {
      setshowInfoBlock(false);
    }
  }, [isItemsOpen]);
  const handleToggleInfoBlock = () => {
    setshowInfoBlock(!showInfoBlock);
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
  function msToHMSBlock(seconds) {
    if (isNaN(seconds)) {
      return "00:00";
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh} h ${mm.toString().padStart(2, "0")} min`;
    }
    return `${mm} min`;
  }

  const calcTotalItemsDuration = () => {
    var total = 0;

    for (var i = 0; i < track.block.items.length; i++) {
      total += track.block.items[i].item?.content?.duration;
    }
    return total;
  };
  return (
    <>
      <BlockCard
        className={""}
        onClick={handleToggleItems}
        // ref={index_block == trackCode ? courseVideoRef : null}
      >
        <div className="d-flex justify-content-between align-items-center px-3 py-4">
          <div>
            {isItemsOpen ? (
              <IconContext.Provider
                value={{
                  size: 14,
                  className: "global-class-name mx-2 cursor-pointer",
                }}
              >
                <MdKeyboardArrowUp />
              </IconContext.Provider>
            ) : (
              <IconContext.Provider
                value={{
                  size: 14,
                  className: "global-class-name mx-2 cursor-pointer",
                }}
              >
                <MdKeyboardArrowDown />
              </IconContext.Provider>
            )}
            <span className="mr-4">{track.block.name}</span>
          </div>
          <div>
            <small>{track.block.items.length} clases</small>

            {/* <CourseList video={track.video} /> */}
          </div>
        </div>
        {showInfoBlock && (
          <>
            <hr className="mt-0 mx-4" />
            <div className="more-block-info px-4 pb-4">
              <div className="mbi-img-div">
                <img src={track.block.picture} alt="" />
              </div>
              <div className="mbi-info">
                <small
                  className="d-none d-sm-block"
                  dangerouslySetInnerHTML={{
                    __html: track.block.description,
                  }}
                />
                <small>{msToHMSBlock(calcTotalItemsDuration())}</small>
              </div>
            </div>
          </>
        )}
      </BlockCard>
      <PlaylistUlItems isItemsOpen={isItemsOpen}>
        {isItemsOpen && (
          <div className="d-flex justify-content-start py-2 px-3 ">
            <small
              className="cursor-pointer text-grey"
              onClick={handleToggleInfoBlock}
            >
              {showInfoBlock ? (
                <u>ver menos</u>
              ) : (
                <u>ver mas sobre la sección</u>
              )}
            </small>
          </div>
        )}
        <ul className="m-0">
          {isItemsOpen && (
            <>
              {track.block.items.map((item, index) => (
                <li key={index}>
                  <PlaylistItem
                  // ref={index == trackCode ? courseVideoRef : null}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-baseline">
                        {item.item.type_choices == "LE" &&
                          item.item?.content?.type_choices == "VI" && (
                            <div>
                              <IconContext.Provider
                                value={{
                                  size: 14,
                                  className:
                                    "global-class-name mr-2 cursor-pointer",
                                }}
                              >
                                <GrCirclePlay />
                              </IconContext.Provider>
                            </div>
                          )}
                        {item.item.type_choices == "LE" &&
                          item.item?.content?.type_choices == "TX" && (
                            <IconContext.Provider
                              value={{
                                size: 14,
                                className:
                                  "global-class-name mr-2 cursor-pointer",
                              }}
                            >
                              <GrDocumentText />
                            </IconContext.Provider>
                          )}
                        <small>{item.item.name}</small>
                      </div>
                      {item.item.type_choices == "LE" &&
                        item.item?.content?.type_choices == "VI" && (
                          <small>{msToHMS(item.item.content.duration)}</small>
                        )}
                    </div>
                    <div className="d-flex align-items-center justify-content-end mt-1">
                      {item.item.materials.length > 0 && (
                        <>
                          <IconContext.Provider
                            value={{
                              size: 14,
                              className:
                                "global-class-name mr-2 cursor-pointer",
                            }}
                          >
                            <FaFolderOpen />
                          </IconContext.Provider>
                          <small>Recursos disponibles</small>
                        </>
                      )}
                    </div>
                  </PlaylistItem>
                </li>
              ))}
            </>
          )}
        </ul>
      </PlaylistUlItems>
    </>
  );
}

const BlockCard = styled.div`
  background-color: #fbfbf8;
  cursor: pointer;
  border: 1px solid #dcdacb;
  border-radius: 0.4rem;
  .more-block-info {
    height: 9rem;
    display: flex;
    .mbi-img-div {
      height: 100%;
      img {
        height: 100%;
        border-radius: 0.4rem;
      }
    }
    .mbi-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-left: 2rem;
      small {
        word-break: break-all;

        display: block;
      }
      small:last-child {
        text-align: right;
        min-width: 6rem;
        @media screen and (max-width: 768px) {
          text-align: left;
        }
      }
    }
  }
`;
const PlaylistUlItems = styled.div`
  margin: 0 auto;
  width: 99%;
  ${(props) =>
    props.isItemsOpen &&
    `border-left: 1px solid #dcdacb;
    border-right: 1px solid #dcdacb;
    border-bottom: 1px solid #dcdacb;
   `}

  ul {
    list-style: none;
  }
`;

const PlaylistItem = styled.div`
  padding: 1rem;
  background: #fff;

  &:hover {
    background: #ececec;
  }
  &.active {
    background: #ececec;
  }
`;
export default BlockItemsListContent;
