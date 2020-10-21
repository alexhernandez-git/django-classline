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
import { useLocation } from "react-router-dom";

const Podcasts = () => {
  const { pathname } = useLocation();

  const main = useRef();
  const podcastsReducer = useSelector((state) => state.podcastsReducer);

  const dispatch = useDispatch();

  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchPodcasts = () => dispatch(fetchPodcasts());
      dispatchFetchPodcasts();
    }
  }, [programReducer.isLoading]);
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
  const [search, setSearch] = useState("");
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchPodcasts = (search) => dispatch(fetchPodcasts(search));
    dispatchFetchPodcasts(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchPodcastsPagination = (url) =>
      dispatch(fetchPodcastsPagination(url));
    dispatchFetchPodcastsPagination(url);
  };
  return (
    <Main
      padding
      className="position-relative"
      style={{ paddingBottom: "100px" }}
      ref={main}
    >
      <AudioPlayerContainer className="rounded d-flex align-items-center flex-column">
        {podcastsReducer.podcast_playing ? (
          <>
            <span className="h3 mb-4">
              {podcastsReducer.podcast_playing.title}
            </span>

            <Mp3Player podcast={podcastsReducer.podcast_playing} />
          </>
        ) : (
          <span className="h3 text-white m-0">Selecciona un Podcast</span>
        )}
      </AudioPlayerContainer>
      <Filters
        title="Podcasts"
        placeholder={"Buscar Podcasts"}
        search={{ search: search, setSearch: setSearch }}
        onSubmit={handleSubmitSearch}
      />

      <PodcastsContainer className="row">
        <div className="col-12">
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
        </div>
      </PodcastsContainer>
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
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const PodcastsContainer = styled.div`
  max-width: 120rem;
  margin: auto;
  width: 100%;
`;

export default Podcasts;
