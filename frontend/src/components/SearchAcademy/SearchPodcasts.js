import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Video from "src/components/ui/Video";
import styled from "@emotion/styled";
import { useHistory, Link, useParams, useLocation } from "react-router-dom";
import Podcast from "src/components/ui/Podcast";
import { useDispatch, useSelector } from "react-redux";
import { playPodcast } from "src/redux/actions/podcasts";
import { SlickSlider } from "../ui/SlickSlider";

const SearchPodcasts = () => {
  const { pathname } = useLocation();

  const { program } = useParams();
  const dispatch = useDispatch();
  const router = useHistory();
  const handlePlay = (podcast) => {
    if (!/\/demo\//.test(pathname)) {
      const dispatchPlayPodcast = (podcast) => dispatch(playPodcast(podcast));
      dispatchPlayPodcast(podcast);
      router.push(`/academy/${program}/podcasts`);
    }
  };
  const podcastsReducer = useSelector(
    (state) => state.podcastsReducer
  );
  let settings = null;
  if (!podcastsReducer.isLoading) {
    settings = {
      infinite: podcastsReducer.podcasts.results.length > 2,
      slidesToShow:
        podcastsReducer.podcasts.results.length < 2
          ? podcastsReducer.podcasts.results.length
          : 2,
      slidesToScroll:
        podcastsReducer.podcasts.results.length < 2
          ? podcastsReducer.podcasts.results.length
          : 2,
      draggable: true,
      vertical: true,
      verticalSwiping: true,
    };
  }
  return podcastsReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <SlickSlider>
        <div className="">
          <span>Podcasts</span>
        </div>
        <Slider {...settings}>
          {podcastsReducer.podcasts.results &&
            podcastsReducer.podcasts.results.map((podcast) => (
              <div className="p-2" key={podcast.id}>
                <Podcast podcast={podcast} handlePlay={handlePlay} />
              </div>
            ))}
          {podcastsReducer.isLoading && <span>Cargando...</span>}
        </Slider>
        {podcastsReducer.podcasts.results.length == 0 && (
          <span className="text-grey">No hay podcasts</span>
        )}
      </SlickSlider>
    </>
  );
};

export default SearchPodcasts;
