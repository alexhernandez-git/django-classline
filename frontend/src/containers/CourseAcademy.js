import React, { useEffect, useRef, useState } from "react";
import Video from "src/components/ui/VideoList";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import VideoPlayer from "src/components/ui/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";

import { useParams, Link, useHistory, useLocation } from "react-router-dom";
import CourseList from "../components/ui/CourseList";
import CourseSwitch from "../components/ui/CourseSwitch";
import { fetchPlayingCourse } from "../redux/actions/courses/playingCourse";
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
  const itemId = location.query?.item ? location.query?.item : 0;
  console.log(location.query);
  useEffect(() => {
    if (courseId && !programReducer.isLoading) {
      const dispatchFetchPlayingCourse = (id) =>
        dispatch(fetchPlayingCourse(id));
      dispatchFetchPlayingCourse(courseId);
    }
  }, [courseId, programReducer.isLoading]);

  const goNext = () => {
    const newTrackId = Number(trackCode) + 1;
    const maxPlaylistTrack = playingCourseReducer.course.tracks.length;
    if (newTrackId < maxPlaylistTrack) {
      history.push({
        pathname: `/academy/${programReducer.program.code}/course/${playingCourseReducer.course.id}/${newTrackId}`,
      });
    }
  };
  const goPrevious = () => {
    const newTrackId = Number(trackCode) - 1;
    if (newTrackId >= 0) {
      history.push({
        pathname: `/academy/${programReducer.program.code}/course/${playingCourseReducer.course.id}/${newTrackId}`,
      });
    }
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
    console.log("entra");
    // setItemPlaying(trackCode);
    if (!playingCourseReducer.isLoading) {
      if (trackCode) {
        const result = playingCourseReducer.course.items.find(
          (track) => track.item.code == trackCode
        );
        setItemPlaying(result);
      } else {
        setItemPlaying(playingCourseReducer.course.blocks[0].block.items[0]);
      }
    }
  }, [trackCode, playingCourseReducer]);

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
    <Main style={{ padding: "1rem" }}>
      <CourseHeader>
        {playingCourseReducer.course && playingCourseReducer.course.title}
      </CourseHeader>
      <div className="row">
        <div className="col-md-6 col-lg-8">
          {playingCourseReducer.course &&
            playingCourseReducer.course.items.length > 0 && (
              <>
                {console.log("itemPlaying", itemPlaying)}
                {itemPlaying && (
                  <>
                    {console.log(itemPlaying)}
                    {itemPlaying.item.type_choices == "LE" &&
                      itemPlaying.item?.content?.type_choices == "VI" && (
                        <VideoPlayer
                          video={itemPlaying.item.content}
                          goNext={goNext}
                          goPrevious={goPrevious}
                          isPlaylist={true}
                        />
                      )}
                  </>
                )}
                <CourseSwitch />
              </>
            )}

          {playingCourseReducer.course.blocks.length == 0 && (
            <span>No hay bloques en este curso</span>
          )}
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="d-block d-md-none m-5"></div>

          <div className="d-flex justify-content-center p-4 h2 mb-0 shadow rounded">
            <span className="font-weight-bold">Contenido del curso</span>
          </div>
          <PlaylistScroll>
            <div className="p-3">
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
                    <ItemList>
                      {track.block.items.map((item, index) => (
                        <>
                          {console.log("index_block", index_block)}
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
                                    item.id == itemId ||
                                    (!itemId && index_block == 0 && index == 0)
                                      ? "active d-flex justify-content-between align-items-center cursor-pointer"
                                      : "d-flex justify-content-between align-items-center cursor-pointer"
                                  }
                                  // ref={index == trackCode ? courseVideoRef : null}
                                >
                                  <small>{item.item.name}</small>
                                </PlaylistItem>
                              </Link>
                            </li>
                          </ul>
                        </>
                      ))}
                    </ItemList>
                  </>
                ))}
              {playingCourseReducer.isLoading && <span>Cargando...</span>}
            </div>
          </PlaylistScroll>
        </div>
      </div>
    </Main>
  );
};
const CourseHeader = styled.div`
  padding: 1.5rem;
  font-size: 2.4rem;
  margin-bottom: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  border-radius: 0.25rem !important;
`;
const PlaylistScroll = styled.div`
  background: #fff;
  max-height: calc(100vh - 21rem);
  overflow: auto;
  box-shadow: inset 0 0 20px 0px #ccc;
`;

const ItemList = styled.div``;
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
