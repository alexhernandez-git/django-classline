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
import { ButtonCustomInitial } from "../components/ui/ButtonCustom";
import BlockItemsList from "../components/ui/BlockItemsList";
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
      items.find(
        (item) => item.item.code == (trackCode ? trackCode : items[0].item.code)
      )
    );
    const next_item = items[result + 1];

    history.push({
      pathname: `/academy/${programReducer.program.code}/course/${playingCourseReducer.course.code}/${next_item.item.code}`,
    });
  };
  const goPrevious = () => {
    const result = items.indexOf(
      items.find((item) => item.item.code == trackCode)
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
        if (playingCourseReducer.course.blocks.length > 0) {
          setItemPlaying(playingCourseReducer.course.blocks[0].block.items[0]);
        }
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
        <div
          className="course-header"
          style={{
            background: playingCourseReducer.course.color
              ? playingCourseReducer.course.color
              : "#14171c",
          }}
        >
          {playingCourseReducer.course && playingCourseReducer.course.title}
        </div>
        <div className="course-content">
          <div>
            {items && items.length > 0 && (
              <>
                {itemPlaying && (
                  <>
                    <div className="background-item-container">
                      <div className="item-container">
                        {itemPlaying.item?.type_choices == "LE" &&
                          itemPlaying.item?.content?.type_choices == "VI" && (
                            <VideoPlayer
                              video={itemPlaying.item.content}
                              isCourse
                              goNext={goNext}
                            />
                          )}
                        {/* {itemPlaying.item?.type_choices == "LE" &&
                          itemPlaying.item?.content?.type_choices == "FI" && (
                            <>
                              <div className="py-5 bg-white">
                                <MaterialCourse
                                  item={itemPlaying.item}
                                  key={itemPlaying.item.id}
                                />
                              </div>
                            </>
                          )} */}
                        {itemPlaying.item?.type_choices == "LE" &&
                          itemPlaying.item?.content?.type_choices == "TX" && (
                            <>
                              <div
                                className="p-4 bg-white"
                                dangerouslySetInnerHTML={{
                                  __html: itemPlaying.item.content.text,
                                }}
                              />
                            </>
                          )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between px-2 mt-3">
                      <ButtonCustomInitial
                        onClick={goPrevious}
                        style={{
                          background: playingCourseReducer.course.color
                            ? playingCourseReducer.course.color
                            : "#14171c",
                        }}
                      >
                        Anterior
                      </ButtonCustomInitial>
                      <div className="d-block m-2"></div>
                      <ButtonCustomInitial
                        onClick={goNext}
                        style={{
                          background: playingCourseReducer.course.color
                            ? playingCourseReducer.course.color
                            : "#14171c",
                        }}
                      >
                        Siguente
                      </ButtonCustomInitial>
                    </div>
                    {itemPlaying.item?.content?.description && (
                      <>
                        <hr />
                        <div className="mt-3">
                          <span
                            className="new-line text-break"
                            style={{ color: "initial" }}
                            dangerouslySetInnerHTML={{
                              __html: itemPlaying.item?.content?.description,
                            }}
                          />
                        </div>
                      </>
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

          <div
            className="d-flex justify-content-center p-4 h2 mb-0 rounded"
            style={{
              background: playingCourseReducer.course.color
                ? playingCourseReducer.course.color
                : "#14171c",
              color: "#fff",
            }}
          >
            <span className="font-weight-bold">Contenido del curso</span>
          </div>
          <div className="playlist-scroll">
            <div
              className=""
              style={{
                height: "80.5vh",
              }}
            >
              {playingCourseReducer.course &&
                playingCourseReducer.course.blocks.map((track, index_block) => (
                  <BlockItemsList
                    track={track}
                    index_block={index_block}
                    itemPlaying={itemPlaying}
                    items={items}
                  />
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

    color: #fff;
    padding: 1.5rem;
    font-size: 2.4rem;
    margin-bottom: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    border-radius: 0.25rem !important;
  }
  .course-content {
    background: #fff;
    padding: 1rem;
    grid-area: course-content;
    height: calc(100vh - 13.5rem);
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    .background-item-container {
      background: #14171c;
    }
    .item-container {
      max-width: 100rem;
      margin: auto;
    }
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

export default CourseAcademy;
