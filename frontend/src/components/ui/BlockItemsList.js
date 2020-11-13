import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useState } from "react";
import { IconContext } from "react-icons";
import { GrCirclePlay, GrDocumentText } from "react-icons/gr";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BlockItemsList({ track, index_block, itemPlaying, items }) {
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
          {index_block + 1}: {track.block.name}
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
              <>
                <li>
                  <Link
                    to={{
                      pathname: `/academy/${programReducer.program.code}/course/${playingCourseReducer.course.code}/${item.item.code}/`,
                      query: { item: item.id },
                    }}
                    params={{ item: item.id }}
                    key={item.id}
                  >
                    <PlaylistItem
                      className={
                        item.id == itemPlaying?.id
                          ? "active d-flex justify-content-between align-items-center cursor-pointer"
                          : "d-flex justify-content-between align-items-center cursor-pointer"
                      }
                      // ref={index == trackCode ? courseVideoRef : null}
                    >
                      <small>
                        {items.indexOf(item) + 1}: {item.item.name}
                      </small>
                      <div>
                        {item.item.type_choices == "LE" &&
                          item.item?.content?.type_choices == "VI" && (
                            <IconContext.Provider
                              value={{
                                size: 14,
                                className:
                                  "global-class-name mx-2 cursor-pointer",
                              }}
                            >
                              <GrCirclePlay />
                            </IconContext.Provider>
                          )}
                        {item.item.type_choices == "LE" &&
                          item.item?.content?.type_choices == "TE" && (
                            <IconContext.Provider
                              value={{
                                size: 14,
                                className:
                                  "global-class-name mx-2 cursor-pointer",
                              }}
                            >
                              <GrDocumentText />
                            </IconContext.Provider>
                          )}
                        {item.item.type_choices == "LE" &&
                          item.item?.content?.type_choices == "MA" && (
                            <IconContext.Provider
                              value={{
                                size: 14,
                                className:
                                  "global-class-name mx-2 cursor-pointer",
                              }}
                            >
                              <GrDocumentText />
                            </IconContext.Provider>
                          )}
                      </div>
                    </PlaylistItem>
                  </Link>
                </li>
              </>
            ))}
        </ul>
      </div>
    </>
  );
}

const PlaylistItem = styled.div`
  padding: 1rem;
  &:hover {
    background: #ececec;
  }
  &.active {
    background: #ececec;
  }
`;
export default BlockItemsList;
