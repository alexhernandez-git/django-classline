import React, { useRef, useState, useEffect } from "react";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import Layout from "src/components/Layout/Layout";
import { FaPlayCircle, FaRegPauseCircle } from "react-icons/fa";
import { textEllipsis } from "src/components/ui/TextEllipsis";
import Filters from "src/components/Layout/Filters";
import Categories from "src/components/Layout/Categories";
import PodcastCard from "src/components/AdminAcademy/PodcastCard";
import Podcast from "src/components/ui/Podcast";
import Mp3Player from "src/components/ui/Mp3Player";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import {
  fetchPodcasts,
  playPodcast,
  stopPodcast,
  fetchPodcastsPagination,
} from "src/redux/actions/podcasts";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import TopicBanner from "../components/ui/TopicBanner";
import { Padding } from "../components/ui/Padding";
import { fetchTopic } from "../redux/actions/topics/topic";
import { fetchPodcastsTopic } from "../redux/actions/topics/podcastsTopic";

const Podcasts = () => {
  const  { pathname, state } = useLocation();
  const {topic } = useParams()
  const main = useRef();
  const podcastsReducer = useSelector((state) => state.podcastsReducer);
  const podcastsTopicReducer = useSelector((state) => state.podcastsTopicReducer);

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
        const dispatchFetchPodcasts = (search) => dispatch(fetchPodcasts(search));
        dispatchFetchPodcasts(state?.search);
      }
    }
  }, [programReducer.isLoading]);
  const [podcastsSearch, setPodcastsSearch] = useState(state?.search);
  useEffect(() => {
    if (!topicReducer.isLoading && topicReducer.topic) {
      const dispatchFetchTopicPodcasts = (search) => dispatch(fetchPodcastsTopic(search));
      dispatchFetchTopicPodcasts(state?.search);
    }
  }, [topicReducer.isLoading]);
  const handlePlay = (podcast) => {
    if (!/\/demo\//.test(pathname)) {
      const dispatchPlayPodcast = (podcast) => dispatch(playPodcast(podcast));
      dispatchPlayPodcast(podcast);
    }
  };
  const handleStop = () => {
    if (!/\/demo\//.test(pathname)) {
      const dispatchStopPodcast = () => dispatch(stopPodcast());
      dispatchStopPodcast();
    }
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if(topic){
      const dispatchFetchTopicPodcasts = (podcastsSearch) => dispatch(fetchPodcastsTopic(podcastsSearch));
      dispatchFetchTopicPodcasts(podcastsSearch);
    }else{
      const dispatchFetchPodcasts = (podcastsSearch) => dispatch(fetchPodcasts(podcastsSearch));
      dispatchFetchPodcasts(podcastsSearch);

    }
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchPodcastsPagination = (url) =>
      dispatch(fetchPodcastsPagination(url));
    dispatchFetchPodcastsPagination(url);
  };
  const handleChangePageTopic = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchPodcastsTopicPagination = (url) =>
      dispatch(fetchPodcastsTopicPagination(url));
    dispatchFetchPodcastsTopicPagination(url);
  };
  return (
    <Main
      className="position-relative"
      style={{ paddingBottom: "100px" }}
      ref={main}
    >
        {topic && 
          <TopicBanner/>
        }
        <Padding>
      <AudioPlayerContainer className="rounded d-flex align-items-center flex-column">
        {podcastsReducer.podcast_playing ? (
          <>
          <div className="d-sm-flex justify-content-between w-100">
            <span className="h3 mb-4 mx-2">
              {podcastsReducer.podcast_playing.title}
            </span>
            <small className="mb-4  mx-2 cursor-pointer" onClick={()=>handleStop(podcastsReducer.podcast_playing.id)}>
              Quitar la reproducción
            </small>
            
          </div>

            <Mp3Player podcast={podcastsReducer.podcast_playing} />
          </>
        ) : (
          <span className="h3 text-white m-0">Selecciona un Podcast</span>
        )}
      </AudioPlayerContainer>
      <Filters
        title="Podcasts"
        placeholder={"Buscar Podcasts"}
        search={{ search: podcastsSearch, setSearch: setPodcastsSearch }}
        onSubmit={handleSubmitSearch}
      />

      <PodcastsContainer className="row">
        <div className="col-12">
          {topic ?
          <>
          {podcastsTopicReducer.podcasts &&
            podcastsTopicReducer.podcasts.results.map((podcast_topic) => {
              const active =
              podcastsTopicReducer.podcast_playing &&
              podcastsTopicReducer.podcast_playing.id == podcast_topic.podcast.id;
              return (
                <Podcast
                handlePlay={handlePlay}
                key={podcast_topic.id}
                podcast={podcast_topic.podcast}
                active={active}
                handleStop={handleStop}
                />
                );
              })}
          {podcastsTopicReducer.isLoading && <span>Cargando...</span>}
          {podcastsTopicReducer.podcasts &&
            (podcastsTopicReducer.podcasts.previous ||
              podcastsTopicReducer.podcasts.next) && (
                <div className="d-flex justify-content-center my-5">
                {podcastsTopicReducer.podcasts.previous ? (
                  <IconContext.Provider
                  value={{
                    size: 50,
                    className: "cursor-pointer",
                  }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePageTopic(podcastsTopicReducer.podcasts.previous)
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
                {podcastsTopicReducer.podcasts.next ? (
                  <IconContext.Provider
                  value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                    >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePageTopic(podcastsTopicReducer.podcasts.next)
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
              {podcastsReducer.podcasts &&
                podcastsReducer.podcasts.results.map((podcast) => {
                  const active =
                  podcastsReducer.podcast_playing &&
                  podcastsReducer.podcast_playing.id == podcast.id;
                  return (
                    <Podcast
                    handlePlay={handlePlay}
                    key={podcast.id}
                    podcast={podcast}
                    active={active}
                    handleStop={handleStop}
                    />
                    );
              })}
          {podcastsReducer.isLoading && <span>Cargando...</span>}
          {podcastsReducer.podcasts &&
            (podcastsReducer.podcasts.previous ||
              podcastsReducer.podcasts.next) && (
                <div className="d-flex justify-content-center my-5">
                {podcastsReducer.podcasts.previous ? (
                  <IconContext.Provider
                  value={{
                    size: 50,
                    className: "cursor-pointer",
                  }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(podcastsReducer.podcasts.previous)
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
                {podcastsReducer.podcasts.next ? (
                  <IconContext.Provider
                  value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                    >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(podcastsReducer.podcasts.next)
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
      </PodcastsContainer>
      </Padding>
    </Main>
  );
};
const AudioPlayerContainer = styled.div`
  /* background: var(--darkgray); */
  z-index: 200;
  position: fixed;
  bottom: 0;
  right: 0;

  width: calc(100% - 90px);
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;
const PodcastsContainer = styled.div`
  max-width: 120rem;
  margin: auto;
  width: 100%;
`;

export default Podcasts;
