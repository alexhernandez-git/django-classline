import React, { useRef, useState, useEffect } from "react";

import Layout from "src/components/Layout/Layout";
import Filters from "src/components/Layout/Filters";
import Video from "src/components/ui/Video";
import styled from "@emotion/styled";
import { Main } from "src/components/ui/Main";
import { Padding } from "src/components/ui/Padding";

import { fetchVideos, fetchVideosPagination } from "src/redux/actions/videos";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useParams } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import ContainerWrapper from "src/components/ui/Container";
import TopicBanner from "../components/ui/TopicBanner";
import { fetchTopic } from "../redux/actions/topics/topic";
import { fetchVideosTopic, fetchVideosTopicPagination } from "../redux/actions/topics/videosTopic";

export default function Videos() {
  const main = useRef();
  const videosReducer = useSelector((state) => state.videosReducer);
  const videosTopicReducer = useSelector((state) => state.videosTopicReducer);
  const { topic } = useParams()
  const location = useLocation()

  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  const topicReducer = useSelector((state) => state.topicReducer);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program && topic) {
      const dispatchFetchTopic = () => dispatch(fetchTopic(topic));
      dispatchFetchTopic();
    }
  }, [programReducer.isLoading,topic]);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      if (!topic) {
        const dispatchFetchVideos = (search) => dispatch(fetchVideos(search));
        dispatchFetchVideos(location?.state?.search);

      }
    }
  }, [programReducer.isLoading]);

  useEffect(() => {
    if (!topicReducer.isLoading && topicReducer.topic) {
      const dispatchFetchTopicVideos = (search) => dispatch(fetchVideosTopic(search));
      dispatchFetchTopicVideos(location?.state?.search);
    }
  }, [topicReducer.isLoading]);

  const [videosSearch, setVideosSearch] = useState(location?.state?.search);


  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (topic) {
      const dispatchFetchTopicVideos = (videosSearch) => dispatch(fetchVideosTopic(videosSearch));
      dispatchFetchTopicVideos(videosSearch);
    }else{
      const dispatchFetchVideos = (videosSearch) => dispatch(fetchVideos(videosSearch));
      dispatchFetchVideos(videosSearch);

    }
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchVideosPagination = (url) =>
      dispatch(fetchVideosPagination(url));
    dispatchFetchVideosPagination(url);
  };
  const handleChangePageTopic = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchVideosTopicPagination = (url) =>
      dispatch(fetchVideosTopicPagination(url));
    dispatchFetchVideosTopicPagination(url);
  };
  return (
    <>
      <Main ref={main}>
        {topic && 
          <TopicBanner/>
        }
        <Padding>

        <Filters
          title="Videos"
          placeholder={"Buscar Videos"}
          search={{ search: videosSearch, setSearch: setVideosSearch }}
          onSubmit={handleSubmitSearch}
        />
        <ContainerWrapper>
          <div className="row">
            <div className="col-12">
              <GridVideos>
                {topic ?
                  <>
                  {videosTopicReducer.videos &&
                    videosTopicReducer.videos.results.map((video_topic) => (
                      <div key={video_topic.video.id}>
                      <Video video={video_topic.video} />
                      </div>
                      ))}
                  </>
                  :
                  <>
                  {videosReducer.videos &&
                    videosReducer.videos.results.map((video) => (
                      <div key={video.id}>
                      <Video video={video} />
                      </div>
                      ))}
                    </>
                  }
              </GridVideos>
              {topic ? 
              <>
              {videosTopicReducer.isLoading && <span>Cargando...</span>}
              {videosTopicReducer.videos &&
                (videosTopicReducer.videos.previous ||
                  videosTopicReducer.videos.next) && (
                  <div className="d-flex justify-content-center my-5">
                    {videosTopicReducer.videos.previous ? (
                      <IconContext.Provider
                        value={{
                          size: 50,
                          className: "cursor-pointer",
                        }}
                      >
                        <IoIosArrowDropleft
                          onClick={() =>
                            handleChangePageTopic(videosTopicReducer.videos.previous)
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
                    {videosTopicReducer.videos.next ? (
                      <IconContext.Provider
                        value={{
                          size: 50,
                          className: "cursor-pointer",
                        }}
                      >
                        <IoIosArrowDropright
                          onClick={() =>
                            handleChangePageTopic(videosTopicReducer.videos.next)
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
              {videosReducer.isLoading && <span>Cargando...</span>}
              {videosReducer.videos &&
                (videosReducer.videos.previous ||
                  videosReducer.videos.next) && (
                  <div className="d-flex justify-content-center my-5">
                    {videosReducer.videos.previous ? (
                      <IconContext.Provider
                        value={{
                          size: 50,
                          className: "cursor-pointer",
                        }}
                      >
                        <IoIosArrowDropleft
                          onClick={() =>
                            handleChangePage(videosReducer.videos.previous)
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
                    {videosReducer.videos.next ? (
                      <IconContext.Provider
                        value={{
                          size: 50,
                          className: "cursor-pointer",
                        }}
                      >
                        <IoIosArrowDropright
                          onClick={() =>
                            handleChangePage(videosReducer.videos.next)
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
        </ContainerWrapper>
        </Padding>

      </Main>
    </>
  );
}

const ButtonSearchUsers = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  padding: 7px 12px;
  border-radius: 100px;
  color: #828282;

  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background: #e7e7e7;
  }
`;
const GridVideos = styled.div`
  display: grid;
  grid-gap: 4rem 2rem;
  grid-template-columns: repeat(4, 1fr);

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
