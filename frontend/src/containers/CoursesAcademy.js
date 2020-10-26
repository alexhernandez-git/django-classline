import React, { useRef, useEffect, useState } from "react";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import Layout from "src/components/Layout/Layout";
import Filters from "src/components/Layout/Filters";
import Course from "src/components/ui/Course";
import {
  fetchPlaylists,
  fetchPlaylistsPagination,
} from "src/redux/actions/courses";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import { useLocation, useParams } from "react-router-dom";
import { Padding } from "../components/ui/Padding";
import TopicBanner from "../components/ui/TopicBanner";
import { fetchPlaylistsTopic, fetchPlaylistsTopicPagination } from "../redux/actions/topics/playlistsTopic";
import { fetchTopic } from "../redux/actions/topics/topic";
const playlists = () => {
  const main = useRef();
  const coursesReducer = useSelector((state) => state.coursesReducer);
  const playlistsTopicReducer = useSelector((state) => state.playlistsTopicReducer);

  const programReducer = useSelector((state) => state.programReducer);
  const topicReducer = useSelector((state) => state.topicReducer);
  const {topic } = useParams()
  const location = useLocation()

  const dispatch = useDispatch();

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program && topic) {
      const dispatchFetchTopic = () => dispatch(fetchTopic(topic));
      dispatchFetchTopic();
    }
  }, [programReducer.isLoading,topic]);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      if(!topic){
        const dispatchFetchPlaylists = (search) => dispatch(fetchPlaylists(search));
        dispatchFetchPlaylists(location?.state?.search);
      }
    }
  }, [programReducer.isLoading]);

  useEffect(() => {
    if (!topicReducer.isLoading && topicReducer.topic) {
      const dispatchFetchTopicPlaylists = (search) => dispatch(fetchPlaylistsTopic(search));
      dispatchFetchTopicPlaylists(location?.state?.search);
    }
  }, [topicReducer.isLoading]);

  const [coursesSearch, setCoursesSearch] = useState(location?.state?.search);
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (topic) {
      const dispatchFetchTopicPlaylists = (coursesSearch) => dispatch(fetchPlaylistsTopic(coursesSearch));
      dispatchFetchTopicPlaylists(coursesSearch);
    }else{
      const dispatchFetchPlaylists = (coursesSearch) => dispatch(fetchPlaylists(coursesSearch));
      dispatchFetchPlaylists(coursesSearch);
    }
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchPlaylistsPagination = (url) =>
      dispatch(fetchPlaylistsPagination(url));
    dispatchFetchPlaylistsPagination(url);
  };
  const handleChangePageTopic = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchPlaylistsTopicPagination = (url) =>
      dispatch(fetchPlaylistsTopicPagination(url));
    dispatchFetchPlaylistsTopicPagination(url);
  };
  return (
    <Main ref={main}>
        {topic && 
          <TopicBanner/>
        }
        <Padding>


      <Filters
        title="Playlists"
        placeholder={"Buscar playlists"}
        search={{ search: coursesSearch, setSearch: setCoursesSearch }}
        onSubmit={handleSubmitSearch}
      />

      <div className="row">
        <div className="col-12">
          <GridVideos>
            {topic ? 
            <>
              {playlistsTopicReducer.playlists &&
                playlistsTopicReducer.playlists.results.map((playlist_topic) => (
                  <div className="cursor-pointer" key={playlist_topic.key}>
                    <Course playlist={playlist_topic.playlist} />
                  </div>
                ))}
            </>
            :
            <>
                {coursesReducer.playlists &&
                  coursesReducer.playlists.results.map((playlist) => (
                    <div className="cursor-pointer" key={playlist.key}>
                      <Course playlist={playlist} />
                    </div>
                  ))}
            </>
            }
      
          </GridVideos>
          {topic ? 
            <>
            {playlistsTopicReducer.isLoading && <span>Cargando...</span>}
          {playlistsTopicReducer.playlists &&
            (playlistsTopicReducer.playlists.previous ||
              playlistsTopicReducer.playlists.next) && (
              <div className="d-flex justify-content-center my-5">
                {playlistsTopicReducer.playlists.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePageTopic(playlistsTopicReducer.playlists.previous)
                      }
                    />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      color: "#a1a1a1",
                    }}
                  >
                    <IoIosArrowDropleft />
                  </IconContext.Provider>
                )}
                {playlistsTopicReducer.playlists.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(playlistsTopicReducer.playlists.next)
                      }
                    />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      color: "#a1a1a1",
                    }}
                  >
                    <IoIosArrowDropright />
                  </IconContext.Provider>
                )}
              </div>
            )}
            </>
            :
            <>
            {coursesReducer.isLoading && <span>Cargando...</span>}
          {coursesReducer.playlists &&
            (coursesReducer.playlists.previous ||
              coursesReducer.playlists.next) && (
              <div className="d-flex justify-content-center my-5">
                {coursesReducer.playlists.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(coursesReducer.playlists.previous)
                      }
                    />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      color: "#a1a1a1",
                    }}
                  >
                    <IoIosArrowDropleft />
                  </IconContext.Provider>
                )}
                {coursesReducer.playlists.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(coursesReducer.playlists.next)
                      }
                    />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      color: "#a1a1a1",
                    }}
                  >
                    <IoIosArrowDropright />
                  </IconContext.Provider>
                )}
              </div>
            )}
            </>  
          }
          
        </div>
      </div>
      </Padding>

    </Main>
  );
};
export const GridVideos = styled.div`
  display: grid;
  grid-gap: 4rem 2rem;
  grid-template-columns: repeat(4, 1fr);
  max-width: 120rem;
  margin: auto;
  width: 100%;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default playlists;
