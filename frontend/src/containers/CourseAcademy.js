import React, { useEffect, useRef, useState } from "react";
import Video from "src/components/ui/VideoList";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import VideoPlayer from "src/components/ui/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import DocsItem from "src/components/ui/DocsItem";

import { useParams, Link, useHistory, useLocation } from "react-router-dom";
import CourseList from "../components/ui/CourseList";
import CourseSwitch from "../components/ui/CourseSwitch";
import { fetchPlayingCourse } from "../redux/actions/courses/playingCourse";
import MaterialCourse from "../components/ui/MaterialCourse";
import { IconContext } from "react-icons";
import { GrCirclePlay, GrDocumentText } from "react-icons/gr";
const CourseAcademy = (props) => {
  const playingCourseReducer = useSelector(
    (state) => state.playingCourseReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const router = useParams();
  const programReducer = useSelector((state) => state.programReducer);
  const courseId = router.id;
  const trackCode = router.track ? router.track : null;
  useEffect(() => {
    if (courseId && !programReducer.isLoading) {
      const dispatchFetchPlayingCourse = (id) =>
        dispatch(fetchPlayingCourse(id));
      dispatchFetchPlayingCourse(courseId);
    }
  }, [courseId, programReducer.isLoading]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!playingCourseReducer.isLoading) {
      let result = [];
      playingCourseReducer.course.blocks.forEach((block_track) => {
        block_track.block.items.forEach((item_track) =>
          result.push(item_track)
        );
      });
      setItems(result);
    }
  }, [playingCourseReducer]);

  const goNext = () => {
    const result = items.indexOf(
      items.find((item) => item.item.code == trackCode)
    );
    const next_item = items[result + 1];

    history.push({
      pathname: `/academy/${programReducer.program.code}/course/${playingCourseReducer.course.code}/${next_item.item.code}`,
    });
  };
  const goPrevious = () => {
    const result = items.indexOf(
      items.find((item) => (item.item.code = trackCode))
    );

    const previous_item = items[result - 1];

    history.push({
      pathname: `/academy/${programReducer.program.code}/course/${playingCourseReducer.course.code}/${previous_item.item.code}`,
    });
  };
  // const courseVideoRef = useRef(null)
  // useEffect(() => {
  //   console.log(courseVideoRef);
  //   if (courseVideoRef.current) {
  //     courseVideoRef.current.scrollIntoView();
  //   }
  // }, [trackCode])
  const [itemPlaying, setItemPlaying] = useState(false);
  useEffect(() => {
    // setItemPlaying(trackCode);
    if (!playingCourseReducer.isLoading && items) {
      if (trackCode) {
        const result = items.find((item) => item.item.code == trackCode);
        setItemPlaying(result);
      } else {
        setItemPlaying(playingCourseReducer.course.blocks[0].block.items[0]);
      }
    }
  }, [trackCode, playingCourseReducer, items]);

  // const getTrackId = (id) => {
  //   console.log(id);
  //   const result = playingCourseReducer.course.items.find(
  //     (track) => track.item.id == id
  //   );
  //   return playingCourseReducer.course.items.indexOf(result);
  // };

  return playingCourseReducer.isLoading ? (
    <span>Cargando...</span>
  ) : (
    <Main style={{ overflow: "hidden" }}>
      <CourseContent>
        <div className="course-header">
          {playingCourseReducer.course && playingCourseReducer.course.title}
        </div>
        <div className="course-content">
          <div>
            {items && items.length > 0 && (
              <>
                {itemPlaying && (
                  <>
                    {itemPlaying.item?.type_choices == "LE" &&
                      itemPlaying.item?.content?.type_choices == "VI" && (
                        <VideoPlayer
                          video={itemPlaying.item.content}
                          goNext={goNext}
                          goPrevious={goPrevious}
                          isPlaylist={true}
                        />
                      )}
                    {itemPlaying.item?.type_choices == "LE" &&
                      itemPlaying.item?.content?.type_choices == "MA" && (
                        <div className="my-5">
                          <MaterialCourse
                            item={itemPlaying.item}
                            key={itemPlaying.item.id}
                          />
                        </div>
                      )}
                    <hr />
                    <CourseSwitch itemPlaying={itemPlaying} />
                  </>
                )}
              </>
            )}

            {playingCourseReducer.course.blocks.length == 0 && (
              <span>No hay bloques en este curso</span>
            )}
          </div>
        </div>
        <div className="course-content-list">
          <div className="d-block d-md-none m-5"></div>

          <div className="d-flex justify-content-center p-4 h2 mb-0 shadow rounded">
            <span className="font-weight-bold">Contenido del curso</span>
          </div>
          <div className="playlist-scroll">
            <div
              className="p-3"
              style={{
                height: "80.5vh",
              }}
            >
              {playingCourseReducer.course &&
                playingCourseReducer.course.blocks.map((track, index_block) => (
                  <>
                    <BlockSeccion
                      className={
                        "d-flex justify-content-between align-items-center cursor-pointer"
                      }
                      // ref={index_block == trackCode ? courseVideoRef : null}
                    >
                      <span className="mr-4">
                        {index_block + 1}: {track.block.name}
                      </span>
                      {/* <CourseList video={track.video} /> */}
                    </BlockSeccion>
                    <div>
                      {track.block.items.map((item, index) => (
                        <>
                          <ul>
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
                                    {item.item.type_choices == "LE" &&
                                      item.item?.content?.type_choices ==
                                        "VI" && (
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
                                      item.item?.content?.type_choices ==
                                        "TE" && (
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
                                      item.item?.content?.type_choices ==
                                        "MA" && (
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
                                    {items.indexOf(item) + 1}: {item.item.name}
                                  </small>
                                </PlaylistItem>
                              </Link>
                            </li>
                          </ul>
                        </>
                      ))}
                    </div>
                  </>
                ))}
              {playingCourseReducer.isLoading && <span>Cargando...</span>}
            </div>
          </div>
        </div>
      </CourseContent>
    </Main>
  );
};
const CourseContent = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-column-gap: 1rem;
  grid-template-rows: auto;
  grid-template-columns: 25% 1fr;
  grid-template-areas:
    "course-header course-header"
    "course-content-list course-content";

  @media screen and (max-width: 992px) {
    display: block;
    .course-content-list {
      grid-area: course-content-list;
      display: none;
    }
  }
  .course-header {
    grid-area: course-header;
    text-align: center;

    padding: 1.5rem;
    font-size: 2.4rem;
    margin-bottom: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    border-radius: 0.25rem !important;
  }
  .course-content {
    grid-area: course-content;
    height: calc(100vh - 13.5rem);
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .course-content-list {
    grid-area: course-content-list;
    .playlist-scroll {
      background: #fff;
      overflow: auto;
      box-shadow: inset 0 0 20px 0px #ccc;
    }
  }
`;

const BlockSeccion = styled.div`
  padding: 1rem 0;
`;

const PlaylistItem = styled.div`
  padding: 1rem;
  &:hover {
    background: #ececec;
  }
  &.active {
    background: #ececec;
  }
`;
export default CourseAcademy;
