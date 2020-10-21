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
} from "src/redux/actions/podcastsPack";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Podcasts = () => {
  const { pathname } = useLocation();

  const main = useRef();
  const podcastsPackReducer = useSelector((state) => state.podcastsPackReducer);

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
        {podcastsPackReducer.podcast_playing ? (
          <>
            <span className="h3 mb-4">
              {podcastsPackReducer.podcast_playing.title}
            </span>

            <Mp3Player podcast={podcastsPackReducer.podcast_playing} />
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
          {podcastsPackReducer.podcasts &&
            podcastsPackReducer.podcasts.results.map((podcast_pack) => {
              const active =
                podcastsPackReducer.podcast_playing &&
                podcastsPackReducer.podcast_playing.id == podcast_pack.podcast.id;
              return (
                <Podcast
                  handlePlay={handlePlay}
                  key={podcast_pack.podcast.id}
                  podcast={podcast_pack.podcast}
                  active={active}
                  handleStop={handleStop}
                />
              );
            })}
          {podcastsPackReducer.isLoading && <span>Cargando...</span>}
          {podcastsPackReducer.podcasts &&
            (podcastsPackReducer.podcasts.previous ||
              podcastsPackReducer.podcasts.next) && (
              <div className="d-flex justify-content-center my-5">
                {podcastsPackReducer.podcasts.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(podcastsPackReducer.podcasts.previous)
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
                {podcastsPackReducer.podcasts.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(podcastsPackReducer.podcasts.next)
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
