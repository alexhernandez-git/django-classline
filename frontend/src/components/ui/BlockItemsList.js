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

function BlockItemsList({
  track,
  index_block,
  itemPlaying,
  items,
  isAcademy,
  isDemo,
}) {
  const programReducer = useSelector((state) => state.programReducer);
  const playingCourseReducer = useSelector(
    (state) => state.playingCourseReducer
  );
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const handleToggleItems = () => {
    setIsItemsOpen(!isItemsOpen);
  };
  useEffect(() => {
    const result = track.block.items.some((item) => item.id == itemPlaying?.id);
    if (result) {
      setIsItemsOpen(true);
    }
  }, [itemPlaying]);
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
      <div
        className={
          "d-flex justify-content-between align-items-center cursor-pointer px-3 py-4 border-top"
        }
        style={{ background: "#f7f8fa" }}
        onClick={handleToggleItems}
        // ref={index_block == trackCode ? courseVideoRef : null}
      >
        <span className="mr-4">
          Bloque {index_block + 1}: {track.block.name}
        </span>
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
        {/* <CourseList video={track.video} /> */}
      </div>
      <div>
        <ul className="m-0">
          {isItemsOpen &&
            track.block.items.map((item, index) => (
              <li>
                <Link
                  to={{
                    pathname: isAcademy
                      ? `/academy/${programReducer.program.code}/course/${playingCourseReducer.course.code}/${item.item.code}/`
                      : isDemo
                      ? `/academy/${programReducer.program.code}/course-demo-playing/${playingCourseReducer.course.code}/${item.item.code}/`
                      : `/academy/${programReducer.program.code}/course-playing/${playingCourseReducer.course.code}/${item.item.code}/`,
                    query: { item: item.id },
                  }}
                  params={{ item: item.id }}
                  key={item.id}
                >
                  <PlaylistItem
                    className={
                      item.id == itemPlaying?.id
                        ? "active cursor-pointer"
                        : "cursor-pointer"
                    }
                    // ref={index == trackCode ? courseVideoRef : null}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <small>
                        Lectura {items.indexOf(item) + 1}: {item.item.name}
                      </small>
                      <div>
                        {item.item.item_viewed &&
                        item.item.item_viewed.is_completed ? (
                          <IconContext.Provider
                            value={{
                              size: 14,
                              className:
                                "global-class-name mx-2 cursor-pointer",
                            }}
                          >
                            <GrCheckboxSelected />
                          </IconContext.Provider>
                        ) : (
                          <IconContext.Provider
                            value={{
                              size: 14,
                              className:
                                "global-class-name mx-2 cursor-pointer",
                            }}
                          >
                            <GrCheckbox />
                          </IconContext.Provider>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
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
                            <small>{msToHMS(item.item.content.duration)}</small>
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
                      {item.item.materials.length > 0 && (
                        <ItemResources item={item} isDemo={isDemo} />
                      )}
                    </div>
                    {isDemo && (
                      <div className="is_free_text">
                        {item.item.is_free ? (
                          <small className="is_item_free">Gratis</small>
                        ) : (
                          <small className="is_item_premium">Premium</small>
                        )}
                      </div>
                    )}
                  </PlaylistItem>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

const PlaylistItem = styled.div`
  padding: 1rem;
  background: #fff;
  &:hover {
    background: #ececec;
  }
  &.active {
    background: #ececec;
  }
  .is_free_text {
    margin-top: 0.5rem;
    display: flex;
    justify-content: flex-end;
    small {
      color: #fff;

      padding: 0.5rem 1rem;
      border-radius: 2rem;
    }
    .is_item_free {
      background: #000;
    }
    .is_item_premium {
      background: #e5c07b;
    }
  }
`;
export default BlockItemsList;
