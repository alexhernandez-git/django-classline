import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import VideoPlayer from "src/components/ui/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";

import {
  useParams,
  Link,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import CourseSwitch from "src/components/ui/CourseSwitch";
import { fetchPlayingCourse } from "src/redux/actions/courses/playingCourse";

import { ButtonCustomInitial } from "src/components/ui/ButtonCustom";
import BlockItemsList from "src/components/ui/BlockItemsList";
import {
  createItemViewed,
  updateItemViewed,
} from "src/redux/actions/courses/itemsViewed";
import { FiAlertCircle } from "react-icons/fi";
import { Global, css } from "@emotion/core";
import { IconContext } from "react-icons/lib";
const CourseLayout = (props) => {
  const playingCourseReducer = useSelector(
    (state) => state.playingCourseReducer
  );
  const { isAcademy } = props;
  const isDemo = props.isDemo ? props.isDemo : false;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const router = useParams();
  const programReducer = useSelector((state) => state.programReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const courseId = router.id;
  const programId = router.program;
  const trackCode = router.track ? router.track : null;

  useEffect(() => {
    if (courseId && !programReducer.isLoading) {
      const dispatchFetchPlayingCourse = (id) =>{
          

          dispatch(fetchPlayingCourse(id,isDemo));
      }
      dispatchFetchPlayingCourse(courseId);
    }
  }, [courseId, programReducer.isLoading]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!playingCourseReducer.isLoading && !playingCourseReducer.error) {
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
    try {
      const result = items.indexOf(
        items.find(
          (item) =>
            item.item.code == (trackCode ? trackCode : items[0].item.code)
        )
      );
      const next_item = items[result + 1];

      history.push({
        pathname: isAcademy
          ? `/academy/${programReducer.program.code}/course/${playingCourseReducer.course.code}/${next_item.item.code}`
          : isDemo
          ? `/academy/${programReducer.program.code}/course-demo-playing/${playingCourseReducer.course.code}/${next_item.item.code}`
          : `/academy/${programReducer.program.code}/course-playing/${playingCourseReducer.course.code}/${next_item.item.code}`,
      });
    } catch (error) {}
  };
  const goPrevious = () => {
    try {
      const result = items.indexOf(
        items.find((item) => item.item.code == trackCode)
      );

      const previous_item = items[result - 1];

      history.push({
        pathname: isAcademy
          ? `/academy/${programReducer.program.code}/course/${playingCourseReducer.course.code}/${previous_item.item.code}`
          : isDemo
          ? `/academy/${programReducer.program.code}/course-demo-playing/${playingCourseReducer.course.code}/${previous_item.item.code}`
          : `/academy/${programReducer.program.code}/course-playing/${playingCourseReducer.course.code}/${previous_item.item.code}`,
      });
    } catch (error) {}
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
    if (
      !playingCourseReducer.isLoading &&
      !playingCourseReducer.error &&
      items
    ) {
      if (trackCode) {
        const result = items.find((item) => item.item.code == trackCode);
        setItemPlaying(result);
      } else {
        if (playingCourseReducer.course.blocks.length > 0) {
          if (playingCourseReducer.course.current_item_watching) {
            console.log(
              "current_item_watching",
              playingCourseReducer.course.current_item_watching
            );

            const result = items.find(
              (item) =>
                item.item.id ==
                playingCourseReducer.course.current_item_watching
            );
            console.log(result);
            setItemPlaying(result);
          } else {
            setItemPlaying(
              playingCourseReducer.course.blocks[0].block.items[0]
            );
          }
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
  useEffect(() => {
    if (itemPlaying) {
      if (!itemPlaying.item.item_viewed) {
        dispatch(createItemViewed(itemPlaying.item.code));
      } else {
        dispatch(updateItemViewed(itemPlaying.item, {}));
      }
    }
  }, [itemPlaying]);
  const isStudent = () =>{
    if (isDemo) {
      return true
      
    }
    return playingCourseReducer.course.students.some(studentId=> studentId == authReducer.user.id)
  }
  return playingCourseReducer.isLoading && authReducer.isLoading ? (
    <span>Cargando...</span>
  ) : playingCourseReducer.error || (authReducer.isAuthenticated && !isStudent()) ? (
    <Redirect
      to={`/academy/${programReducer.program.code}/course-info/${courseId}/`}
    />
  ) : (
    <>
      <CourseContent isAcademy={isAcademy}>
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
                        {(isDemo && itemPlaying.item.is_free) || !isDemo ? (
                          <>
                            {itemPlaying.item?.type_choices == "LE" &&
                              itemPlaying.item?.content?.type_choices ==
                                "VI" && (
                                <VideoPlayer
                                  video={itemPlaying.item.content}
                                  itemPlaying={itemPlaying}
                                  isCourse
                                  goNext={goNext}
                                  color={playingCourseReducer.course.color}
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
                              itemPlaying.item?.content?.type_choices ==
                                "TX" && (
                                <>
                                  <div
                                    className="p-4 bg-white"
                                    dangerouslySetInnerHTML={{
                                      __html: itemPlaying.item.content.text,
                                    }}
                                  />
                                </>
                              )}
                          </>
                        ) : (
                          <PremiumContent>
                            <IconContext.Provider
                              value={{
                                size: 25,
                                className:
                                  "global-class-name mr-2 cursor-pointer",
                              }}
                            >
                              <FiAlertCircle />
                            </IconContext.Provider>
                            Contenido premium, accede a el adquiriendo el curso
                          </PremiumContent>
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
                    <CourseSwitch itemPlaying={itemPlaying} isDemo={isDemo} />
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
                height: isAcademy
                  ? "calc(100vh - 19rem)"
                  : "calc(100vh - 18rem)",
              }}
            >
              {playingCourseReducer.course &&
                playingCourseReducer.course.blocks.map((track, index_block) => (
                  <BlockItemsList
                    track={track}
                    isAcademy={isAcademy}
                    isDemo={isDemo}
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
    </>
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
  }
  .course-content {
    background: #fff;
    padding: 1rem;
    grid-area: course-content;
    height: ${(props) =>
      props.isAcademy ? "calc(100vh - 13.5rem)" : "calc(100vh - 12.6rem)"};
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    .background-item-container {
      background: #14171c;
    }
    .item-container {
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      @media screen and (min-width: 992px) {
        width: 90%;
      }

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
const PremiumContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 15rem 2rem;
`;
export default CourseLayout;
